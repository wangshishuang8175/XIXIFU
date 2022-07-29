<template>
	<view>
		<!-- 搜索框 -->
		<view class="">
			<uni-section>
				<uni-search-bar placeholder="商品名称订单号" bgColor="#EEEEEE" @confirm="search" />
			</uni-section>
		</view>
		<!-- 导航 -->
		<view>
			<uni-section>
				<view class="uni-padding-wrap uni-common-mt">
					<uni-segmented-control :current="current" :values="items" :style-type="styleType"
						:active-color="activeColor" @clickItem="onClickItem" />
				</view>
				<view class="content">

					<view v-if="current == 0">
						<view class="order" v-for="item in allList.records"
							@click="goOrderDetail(item.orderMainInfoDTO.orderCode)"
							:key="item.orderMainInfoDTO.orderCode">
							<view class="code"><text class="item">订单号：{{item.orderMainInfoDTO.orderCode}}</text>
								<text class="item">{{orderStatus(item.orderMainInfoDTO.orderStatus)[0]}}</text>
							</view>
							<view class="orderdatail">
								<view class="img">
									<image :src="item.orderListInfoV2DTO[0].skuImageUrl" mode="aspectFill"></image>
								</view>
								<view class="info">
									<view class="name">{{item.orderListInfoV2DTO[0].appSkuName}}</view>
									<view class="authorList" v-for="info in item.orderListInfoV2DTO[0].authorList"
										:key="info.key">
										<view class="author">
											{{`[${info.nationalityShortName}]`+info.authorName}}
										</view>
										<view class="cbs">
											{{item.orderListInfoV2DTO[0].publisher}}
										</view>
									</view>
								</view>
								<view class="priceinfo">
									<view class="price">￥{{item.orderMainInfoDTO.totalAmount.toFixed(2)}}</view>
									<text class="num">共{{item.orderListInfoV2DTO[0].amount}}件</text>
								</view>
							</view>
							<view class="btn"
								@click="orderStatus(item.orderMainInfoDTO.orderStatus)[2](item.orderMainInfoDTO.orderCode)">
								{{orderStatus(item.orderMainInfoDTO.orderStatus)[1]}}
							</view>
						</view>
					</view>

					<view v-if="current == 1">
						<view class="order" v-for="item in wPayList" :key="item.orderMainInfoDTO.orderCode">
							<view class="code"><text class="item">订单号：{{item.orderMainInfoDTO.orderCode}}</text>
								<text class="item">{{orderStatus(item.orderMainInfoDTO.orderStatus)[0]}}</text>
							</view>
							<view class="orderdatail">
								<view class="img">
									<image :src="item.orderListInfoV2DTO[0].skuImageUrl" mode="aspectFill"></image>
								</view>
								<view class="info">
									<view class="name">{{item.orderListInfoV2DTO[0].appSkuName}}</view>
									<view class="authorList" v-for="info in item.orderListInfoV2DTO[0].authorList"
										:key="info.key">
										<view class="author">
											{{`[${info.nationalityShortName}]`+info.authorName}}
										</view>
										<view class="cbs">
											{{item.orderListInfoV2DTO[0].publisher}}
										</view>
									</view>
								</view>
								<view class="priceinfo">
									<view class="price">￥{{item.orderMainInfoDTO.totalAmount.toFixed(2)}}</view>
									<text class="num">共{{item.orderListInfoV2DTO[0].amount}}件</text>
								</view>
							</view>
							<view class="btn">{{orderStatus(item.orderMainInfoDTO.orderStatus)[1]}}</view>
						</view>
					</view>

					<view v-if="current == 2"><text class="content-text">待发货</text></view>

					<view v-if="current == 3"><text class="content-text">待收货</text></view>
				</view>
			</uni-section>
		</view>
	</view>
</template>

<script>
	import {
		tokenGet,
		tokenPost
	} from "../../common/js/token.js"
	export default {
		data() {
			return {
				items: ['全部', '待付款', '待发货', '待收货'],
				styles: [{
						value: 'text',
						text: '按钮',
						checked: true
					},
					{
						value: 'text',
						text: '文字'
					}
				],
				current: 0,
				colorIndex: 0,
				styleType: 'text',
				search: "",
				activeColor: "",
				allList: [],
				wPayList: [],
				orderCode: ''
			}
		},
		created() {
			this.getOrder()
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			styleChange(e) {
				if (this.styleType !== e.detail.value) {
					this.styleType = e.detail.value
				}
			},
			colorChange(e) {
				if (this.styleType !== e.detail.value) {
					console.log(e.detail.value);
					this.activeColor = e.detail.value
				}
			},
			async getOrder() {
				let result = await tokenPost("/mini-app-mobile-client/app/order/query/v2/queryAppOrderList", {
					"pageNum": 1,
					"pageSize": 10
				})
				console.log(result, "123456")
				this.allList = result.data;
				result.data.records.forEach(item => {
					if (item.orderMainInfoDTO.orderStatus === 1) {
						this.wPayList.push((item))
					}

				})

				console.log(this.allList, "dsdsdsds", this.wPayList)
			},
			orderStatus(code) {
				var _this = this
				if (code === 1) {
					function pay() {
						return false;
					}
					return ["待付款", "立即支付", pay];
				} else if (code === 6) {
					async function orderDelete(orderCode) {
						let result = await tokenPost("/mini-app-mobile-client/app/order/clientDelete", {
							"orderCode": orderCode
						})
						_this.getOrder()
						console.log(orderCode, result)
					};
					return ["已取消", "删除", orderDelete];

				}
			},
			goOrderDetail(code) {
				console.log(code)
				uni.navigateTo({
					url: `/pages/orderDetail/orderDetail?orderCode=${code}`
				})

			}

		},
		onLoad(options) {
			uni.offAccelerometerChange()
		}

	}
</script>

<style lang="less" scoped>
	// 导航
	// .example-body {
	// 	/* #ifndef APP-NVUE */
	// 	display: flex;
	// 	/* #endif */
	// 	flex-direction: row;
	// 	padding: 0;
	// }

	.uni-padding-wrap {
		background-color: white;
	}

	.content {


		.order {

			padding: 20rpx 40rpx;
			margin: 20rpx 0;
			width: 90%;
			height: 500rpx;
			background-color: #fff;
			color: #999;
			font-size: 24rpx;

			.code {
				display: flex;
				justify-content: space-between;
			}

			.orderdatail {
				display: flex;
				padding: 80rpx 0;
				position: relative;

				&::before {
					position: absolute;
					top: 40rpx;
					left: 0;
					content: "";
					width: 100%;
					height: 2rpx;
					background-color: #ddd
				}

				&::after {
					position: absolute;
					bottom: 50rpx;
					right: 0;
					content: "";
					width: 100%;
					height: 2rpx;
					background-color: #ddd;
				}

				.img {


					image {
						border-radius: 10rpx;
						width: 160rpx;
						height: 240rpx;
					}
				}

				.info {
					padding: 0 20rpx;

					.name {
						width: 450rpx;
						position: relative;
						bottom: 12rpx;
						color: #000;
						font-size: 30rpx;
						line-height: 50rpx;
					}

					.authorList {
						.author {
							padding-bottom: 10rpx;
						}
					}
				}

				position: relative;

				.priceinfo {
					font-size: 28rpx;
					position: absolute;
					right: 0;
					bottom: 80rpx;
					text-align: end;

					.price {
						color: #000;
						position: relative;
						top: -8rpx;
					}

					.num {}
				}
			}

			position: relative;

			.btn {
				width: 180rpx;
				height: 70rpx;
				line-height: 70rpx;
				color: #000;
				border-radius: 10rpx;
				font-size: 30rpx;
				background-color: #fff;
				border: #eeeeee 1rpx solid;
				text-align: center;
				position: absolute;
				bottom: 30rpx;
				right: 30rpx;
				cursor: pointer;
			}
		}
	}

	.segmented-control__item {
		border-bottom: 1px solid green;
		border-bottom-width: 2px;

		.segmented-control__item--text {
			border-bottom-style: none;
			border-bottom-width: 2px;
			padding: 6px 0;
		}
	}
</style>
