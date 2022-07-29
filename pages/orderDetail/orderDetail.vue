<template>
	<view class="order" v-if="order.orderMainInfoDTO">
		<view class="status1" v-if="order.orderMainInfoDTO.orderStatus==1">
			<view class="item">{{orderStatus[0]}}</view>
			<view class="item">剩余{{orderStatus[2]}}</view>
			<view class="btn">
				立即支付
			</view>
		</view>
		<view class="status2" v-else>
			<view class="item">{{orderStatus[0]}}</view>
			<view class="item">原因：{{orderStatus[1]}}</view>
		</view>
		<view class="address">
			{{order.orderConsigneeInfoV2DTO.consignee}}
			<view class="phone">
				<text>{{order.orderConsigneeInfoV2DTO.consigneePhoneAreaCode}}</text>
				<text>{{order.orderConsigneeInfoV2DTO.consigneePhone}}</text>
			</view>
			<view class="add">
				<view class="name">
					{{order.orderConsigneeInfoV2DTO.provinceName}}{{order.orderConsigneeInfoV2DTO.cityName}}{{order.orderConsigneeInfoV2DTO.districtName}}
				</view>
				<view class="detail">{{order.orderConsigneeInfoV2DTO.addressDetail}}</view>
			</view>
		</view>
		<view class="orderdatail" v-for="(item,idx) in order.orderDetailV2DTOList" :key="idx">
			<view class="tit">商品</view>
			<view class="detail">
				<view class="img">
					<image :src="item.skuImageUrl" mode="aspectFill"></image>
				</view>
				<view class="info">
					<view class="name" v-if="item.appSkuName">{{item.appSkuName}}</view>
					<view class="authorList" v-for="info in item.authorList" :key="info.key">
						<view class="author">
							{{`[${info.nationalityShortName}]`+info.authorName}}
						</view>
						<view class="cbs">
							{{item.publisher}}
						</view>
					</view>
					<view class="price">￥{{item.price.toFixed(2)}}</view>
				</view>
				<view class="priceinfo">

					<text :class="`num ${order.orderMainInfoDTO.orderStatus==1?`active`:``}`">x{{item.amount}}</text>
					<text class="status" v-if="order.orderMainInfoDTO.orderStatus==6">{{orderStatus[0]}}</text>
				</view>
			</view>
		</view>
		<view class="fp" v-if="order.orderMainInfoDTO.orderStatus==1">
			发票状态<text>未申请发票</text>
			<view class="btn">申请开票</view>
		</view>
		<view class="fp" v-else>
			发票状态<text>取消开票</text>
		</view>
		<view class="orderList">
			<view class="code">
				<view class="item">订单编号</view>
				<view class="item">{{order.orderMainInfoDTO.orderCode}}</view>
			</view>
			<view class="time">
				<view class="item">下单时间</view>
				<view class="item">{{order.orderMainInfoDTO.createTime}}</view>
			</view>
		</view>
		<view class="price">
			<view class="item"><text>商品原价</text> <text>￥{{order.orderMainInfoDTO.totalAmount.toFixed(2)}}
				</text> </view>
			<view class="item"><text>运费</text> <text>￥{{order.orderMainInfoDTO.actualPayFreight.toFixed(2)}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		tokenGet
	} from "../../common/js/token.js"
	export default {
		data() {
			return {
				order: {},
				orderStatus: [],
				orderCode: ""
			}
		},
		mounted() {
			this.getOrderDetail(this.orderCode)
		},
		methods: {
			async getOrderDetail(orderCode) {
				let result = await tokenGet(
					`/mini-app-mobile-client/app/order/query/v2/queryAppOrderDetail?orderCode=${orderCode}`)
				console.log(result.data)
				var _this = this
				var code = result.data.orderMainInfoDTO.orderStatus
				if (code === 1) {
					function pay() {
						return false;
					}
					this.orderStatus = ["待付款", result.data.orderDetailV2DTOList.price, this.formatMsToDate(result.data
							.orderMainInfoDTO.payRemainingTime),
						"立即支付", pay
					];
				} else if (code === 6) {
					async function orderDelete(orderCode) {
						let result = await tokenPost("/mini-app-mobile-client/app/order/clientDelete", {
							"orderCode": orderCode
						})
						_this.getOrder()
						console.log(orderCode, result)
					};
					this.orderStatus = ["已取消", result.data.orderMainInfoDTO.cancelReason, "删除", orderDelete];

				}
				this.order = result.data;
			},
			formatMsToDate(ms) {
				if (ms) {
					var oDate = new Date(ms),
						oMin = oDate.getMinutes(),
						oSen = oDate.getSeconds();
					if (oSen.toString().length == 1) {
						oSen = "0" + oSen;
					}
					var oTime = oMin + '分' + oSen + '秒';
					return oTime;
				} else {
					return ""
				}
			}
		},
		onLoad(option) {
			this.orderCode = option.orderCode;
		}
	}
</script>

<style lang="less" scoped>
	.order {

		.status1,
		.status2 {
			color: white;
			width: 100%;
			height: 240rpx;
			font-size: 26rpx;
			padding: 60rpx 30rpx;
			margin-bottom: 20rpx;

			:nth-child(1) {
				font-size: 40rpx;
				margin-bottom: 60rpx;
			}
		}

		.status1 {
			background-color: #a12222;

		}

		.status2 {
			background-color: #7e7e7e;
		}

		.address {
			width: 100%;
			background-color: #fff;
			font-weight: 700;
			height: 100rpx;
			padding: 30rpx 30rpx;
			display: inline-block;
			margin-bottom: 20rpx;

			.phone {
				font-weight: normal;
				color: #666;
				display: inline-block;
				padding-bottom: 20rpx;

				text {
					padding-left: 20rpx;
				}
			}

			.add {
				font-weight: normal;
				display: flex;

				.name {
					padding-right: 10rpx;
				}
			}
		}

		.orderdatail {
			background-color: #fff;
			padding: 40rpx 30rpx;
			margin-bottom: 20rpx;

			.tit {
				font-size: 30rpx;
			}

			.detail {
				margin-top: 40rpx;
				display: flex;

				position: relative;



				.img {


					image {
						border-radius: 10rpx;
						width: 180rpx;
						height: 270rpx;
					}
				}

				.info {
					padding: 0 20rpx;

					.name {
						padding: 10rpx 0;
						width: 400rpx;
						position: relative;
						bottom: 12rpx;
						color: #000;
						font-size: 30rpx;
						line-height: 50rpx;
					}

					.authorList {
						color: #666;
						font-size: 26rpx;

						.author {
							padding-bottom: 10rpx;
						}
					}

					.price {
						margin-top: 80rpx;
						color: #bf0000;
						padding: 0;
						font-weight: 500;
					}

				}

				position: relative;

				.priceinfo {
					font-size: 26rpx;
					position: absolute;
					right: 0rpx;
					bottom: 150rpx;
					text-align: end;

					.num {
						position: absolute;
						color: #666;
						top: -240rpx;
						left: 20rpx;

						&.active {
							top: -270rpx;
							left: -20rpx;
						}
					}

					.status {
						position: relative;
						right: 30rpx;
						color: #666;
					}
				}
			}
		}

		.fp {
			width: 100%;
			background-color: #fff;
			height: 120rpx;
			line-height: 120rpx;
			padding: 0 30rpx;
			margin-bottom: 20rpx;
			position: relative;

			text {
				padding: 0 30rpx;
				color: #ccc;
			}

			view.btn {
				position: absolute;
				right: 80rpx;
				top: 0;
			}
		}

		.orderList {
			width: 100%;
			background-color: #fff;
			height: 200rpx;
			display: flex;
			flex-direction: column;
			padding: 0 30rpx;
			margin-bottom: 20rpx;

			.code {
				width: 90%;
				display: flex;
				flex: 1;
				line-height: 100rpx;
				justify-content: space-between;


				.item:nth-child(2) {
					color: #bdbdbd;
					font-size: 28rpx;
				}
			}

			.time {
				width: 90%;
				display: flex;
				flex: 1;
				line-height: 100rpx;
				justify-content: space-between;

				.item:nth-child(2) {
					color: #bdbdbd;
					font-size: 28rpx;
				}
			}
		}

		.price {
			width: 100%;
			background-color: #fff;
			height: 200rpx;
			flex-direction: column;
			padding: 0 30rpx;

			.item {
				width: 90%;
				line-height: 100rpx;
				display: flex;
				justify-content: space-between;

				text:nth-child(2) {

					color: #bdbdbd;
					font-size: 28rpx;
				}
			}
		}
	}
</style>
