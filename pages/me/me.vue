<template>
	<view class="box">
		<view class="module_log">
			<view class="logo">
				<image :src="list.avatarUrl"></image>
				<view class="register">
					<view class="login">{{list.name}}</view>
				</view>
			</view>
		</view>

		<view class="module_one">
			<uni-grid :column="3" :showBorder="false" :square="false">
				<navigator url="/pages/integrals/integrals" hover-class="navigator-hover">
					<uni-grid-item v-for="item in integral" :key="item.id">
						<text class="text">
							{{item.number}}
						</text>
						积分
					</uni-grid-item>
				</navigator>

				<navigator url="/pages/coupons/coupons" hover-class="navigator-hover">
					<uni-grid-item v-for="item in coupon" :key="item.id">
						<text class="text">
							{{item.number}}
						</text>
						优惠券
					</uni-grid-item>
				</navigator>

				<navigator url="/pages/Collect/Collect" hover-class="navigator-hover">
					<uni-grid-item v-for="item in collect" :key="item.id">
						<text class="text">
							{{item.number}}
						</text>
						商品收藏
					</uni-grid-item>
				</navigator>
			</uni-grid>
		</view>

		<view class="module_two">
			<view class="f-position">
				<view class="f-left">我的订单</view>
				<view class="f-right">全部订单</view>
			</view>

			<uni-grid :column="4" :showBorder="false" :square="false">
				<navigator url="/pages/indent/indent?id=1" hover-class="navigator-hover">
					<uni-grid-item>
						<text class="iconfont icon-daifukuan"></text>
						<text class="text" @click="gopage">待付款</text>
					</uni-grid-item>
				</navigator>
				<navigator url="/pages/indent/indent" hover-class="navigator-hover">
					<uni-grid-item>
						<text class="iconfont icon-31daifahuo"></text>
						<text class="text">待发货</text>
					</uni-grid-item>
				</navigator>
				<navigator url="/pages/indent/indent" hover-class="navigator-hover">
					<uni-grid-item>
						<text class="iconfont icon-dengdaishouhuo"></text>
						<text class="text">待收货</text>
					</uni-grid-item>
				</navigator>

				<navigator url="/pages/Aftermarket/Aftermarket" hover-class="navigator-hover">
					<uni-grid-item>
						<text class="iconfont icon-shijuan-xianxing"></text>
						<text class="text">退货/售后</text>
					</uni-grid-item>
				</navigator>
			</uni-grid>

		</view>

		<view class="module_three">
			<view class="f-position">
				<view class="f-left2">工具</view>
			</view>
			<uni-grid :column="4" :showBorder="false" :square="false">
				<navigator url="/pages/address/address" hover-class="navigator-hover">
					<uni-grid-item>
						<text class="iconfont icon-dizhiguanli"></text>
						<text class="text">地址管理</text>
					</uni-grid-item>
				</navigator>
				<navigator url="/pages/agreement/agreement" hover-class="navigator-hover">
					<uni-grid-item>
						<text class="iconfont icon-dakaiyoujian"></text>
						<text class="text">说明与协议</text>
					</uni-grid-item>
				</navigator>
				<uni-grid-item>
					<text class="iconfont icon-kefu"></text>
					<text class="text">我的客服</text>
				</uni-grid-item>
			</uni-grid>
		</view>
			<zdytabbar :current-page="4"></zdytabbar>
	</view>
</template>

<script>
	import {
		tokenPost,
		tokenGet,
	} from '@/common/js/token.js';
	import zdytabbar from '@/components/zdytabbar/zdytabbar.vue'
	export default {
		components: {
			zdytabbar
		},
		data() {
			return {
				integral: [{
					id: "1",
					number: "0.00"
				}],
				coupon: [{
					id: "1",
					number: "0"
				}],
				collect: [{
					id: "1",
					number: "0"
				}],

				list: {},
				// 子页面
				navs: [{
						icons: "shop",
						title: "积分",
						path: "/pages/integrals/integrals"
					},
					{
						icons: "image-filled",
						title: "优惠券",
						path: "/pages/coupons/coupons"
					},
					{
						icons: "phone-filled",
						title: "商品收藏",
						path: "/pages/collects/collects"
					},
				],
			}
		},
		created() {
			this.getList();
		},
		methods: {
			// gopage() {
			// 	console.log('2222')
			// 	uni.navigateTo({
			// 		url: '/pages/indent/indent?id=0',
			// 		success() {
			// 			console.log('跳转成功')
			// 		}
			// 	})
			// }
			async getList() {
				// https://miniprogram.api.sisyphe.cn/gateway-api/mini-app-mobile-client/app/user/miniProgram/BaseInfo
				let result = await tokenGet("/mini-app-mobile-client/app/user/miniProgram/BaseInfo")
				// console.log(result)
				this.list = result.data

				console.log(this.list);
			},
		}
	}
</script>

<style lang="less" scoped>
	@import url(@/static/wss/iconfont.css);

	.logo {
		width: 100vw;
		height: 200rpx;
		display: flex;
		flex-direction: row;
		align-items: flex-end;

		image {
			margin-left: 50rpx;
			// margin-top: 100rpx;
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			// display: inline-block;
		}

		.register {
			width: 60%;
			height: 100rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			.login {
				flex: 1;
				// display: inline-block;
				padding-left: 50rpx;
			}
		}

	}

	.module_one {
		padding: 30rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
		margin-top: 40rpx;
		background-color: white;
		text-align: center;
		border-radius: 30rpx;
		font-size: 10px;
	}

	.text {
		/* padding: 0 10rpx; */
		margin: 20rpx 0;
	}

	.module_two {
		padding: 30rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
		margin-top: 30rpx;
		background-color: white;
		text-align: center;
		border-radius: 30rpx;
		font-size: 10px;
	}


	.f-position {
		padding-bottom: 50rpx;
	}

	.f-left {
		font-weight: 700;
		float: left;
		display: inline-block;
		/* margin-right: 20rpx; */
	}


	.f-right {
		margin-left: 300rpx;
		display: inline-block;

	}

	.module_three {
		padding: 30rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
		margin-top: 30rpx;
		background-color: white;
		text-align: center;
		border-radius: 30rpx;
		font-size: 10px;
	}

	.f-left2 {
		font-weight: 700;
		margin-right: 520rpx;
		/* font-size: 30rpx; */
	}
</style>
