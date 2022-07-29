<template>
	<view class="bodybox">
		<view class="allbox" v-for="item in addlist" :key="item.addressId">
			<uni-swipe-action>
				<uni-swipe-action-item :right-options="options2" :show="item.isOpened" :auto-close="false"
					@change="change()" @click="bindClick(item.addressId)">
					<view class="content-box">
						<view class="administration" @click="keepstatus">
							<view class="address">
								<view class="left">
									<view class="left_top">
										<text class="name">{{item.addressee}}</text>
										<text class="nub"> +86 {{item.telephone}}</text>
									</view>

									<view class="let_bottom">
										<text>{{item.provinceName}}{{item.cityName}}{{item.areaName}}</text>&nbsp;&nbsp;

										<text>{{item.address}}</text>
									</view>
								</view>

								<view class="right">
									<text class="iconfont icon-dengdaishouhuo"></text>
								</view>
							</view>
						</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
		<view class="btnbox">
			<button class="btn" @click="goaddress">
				<text>新增地址</text>
			</button>
		</view>
	</view>


</template>

<script>
	import {
		tokenPost,
		tokenGet,
	} from '@/common/js/token.js';
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {

		data() {
			return {
				addlist: [],

				// 样式
				show: false,

				options2: [{
						text: '编辑',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: 'red'
						}
					}
				],

				addressId: "",
			}
		},
		created() {
			// this.keepstatus();
		},
		onShow() {
			this.getaddress();
		},
		methods: {
			...mapMutations("location", ["addlocation"]),
			keepstatus() {
				uni.navigateTo({
					url: '/pages/add_address/add_address',
					success() {
						console.log('跳转成功')
					}
				})
			},
			goaddress() {
				console.log('2222')
				uni.navigateTo({
					url: '/pages/add_address/add_address',
					success() {
						console.log('跳转成功')
					}
				})
			},

			async getaddress() {
				let result = await tokenGet(
					"/mini-app-mobile-client/app/user/address/list/all"
				);

				this.addlist = result.data
			},

			async bindClick(addressId) {
				console.log(addressId);
				// addressId = item.addressId;
				let result = await tokenPost(
					"/mini-app-mobile-client/app/user/address/remove", {
						"addressId": addressId
					}
				);

				console.log(result);
				if (result.code == 200) {
					uni.showToast({
						title: '删除成功',
						duration: 1500
					});
					this.getaddress()
				}
			},

			change(e, item) {
				// this.isOpened = e;
				// console.log('返回：', e,item);
				// item.isOpened = e;
			},
		},
		computed: {

			...mapState("location", {
				city: "city",
				locations: "locations",
			}),
			...mapGetters("search", {

			}),

		},
	}
</script>

<style lang="less" scoped>
	@import url(@/static/wss/iconfont.css);

	.allbox {
		height: 168rpx !important;
	}

	.btn {
		background-color: #1A6840;
		color: white;
		margin: 0 40rpx;
		border-radius: 30rpx;

		text {}
	}

	.bodybox {
		display: flex;
		flex-direction: column;
		height: 100vh;

		.allbox {
			display: flex;
			flex-direction: column;
			height: 100vh;

			.administration {
				width: 100%;

				.address {
					background-color: white;
					border-bottom: 1px solid gainsboro;
					display: flex;

					.left {
						margin-left: 35rpx;
						padding: 40rpx;
						flex: 1;

						.left_top {

							.name {
								font-weight: 700;
							}

							.nub {
								font-size: 26rpx;
								padding-left: 10epx;
							}
						}

						.let_bottom {
							padding-top: 10rpx;
							font-size: 26rpx;
							color: DarkGray;
						}
					}

					.right {
						padding-right: 35rpx;
						padding: 40rpx;
						display: flex;
						align-items: center;
						justify-content: center;

						.iconfont {
							font-size: 45rpx;
						}
					}
				}
			}

		}

		.btnbox {
			display: flex;
			flex: 1;
			align-items: flex-end;
			margin-bottom: 100rpx;

			.btn {
				width: 800rpx;
			}
		}
	}
</style>
