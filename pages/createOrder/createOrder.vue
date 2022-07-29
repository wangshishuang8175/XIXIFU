<template>
	<view class="order">
		<view class="address">
			{{address.addressee}}
			<view class="phone">
				<text>{{address.areaCode==1&&`+86`}}</text>
				<text>{{address.telephone}}</text>
			</view>
			<view class="add">
				<view class="name">
					{{this.address.provinceName}}{{address.cityName}}{{address.areaName}}
				</view>
				<view class="detail">{{address.address}}</view>
			</view>
		</view>
		<view class="orderdatail">
			<view class="tit">商品</view>
			<view class="detail">
				<view class="img" v-if="bookDetail">
					<image :src="bookDetail.appImgUrl" mode="aspectFill"></image>
				</view>
				<!-- <view class="priceinfo">
					<text :class="num">x{{item.amount}}</text>
				</view> -->
			</view>
		</view>
		<view class="fp">
			发票<text>不需要</text>
		</view>
		<view class="orderList" v-if="newOrder">
			<view class="code">
				<view class="item">商品原价</view>
				<view class="item">￥{{newOrder.totalAmount}}</view>
			</view>
			<view class="time">
				<view class="item">运费</view>
				<view class="item">￥{{newOrder.freightAmount}}</view>
			</view>
		</view>
		<view class="price" v-if="newOrder">
			<view class="item"><text>应付金额</text> <text>￥{{newOrder.tradeAmount}}
				</text></view>
		</view>
	</view>
	<!-- </view> -->
</template>

<script>
	import {
		tokenGet,
		tokenPost
	} from "@/common/js/token.js"
	export default {
		data() {
			return {
				address: {},
				skuCode: "",
				spuCode: "",
				bookDetail: {},
				newOrder: {}
			}
		},
		mounted() {
			this.createNewOrder()
			this.getBookDetail()
		},
		methods: {
			async getAdress() {
				let result = await tokenGet("/mini-app-mobile-client/app/user/address/default");
				this.address = result.data;
			},
			async getBookDetail() {
				let result = await tokenPost("/mini-app-mobile-client/app/anonymous/goods/h5Detail", {
					"spuCode": this.spuCode
				})
				this.bookDetail = result.data
				console.log(this.bookDetail)
			},
			async createNewOrder() {
				await this.getAdress()
				console.log(this.skuCode, this.address)
				let result = await tokenPost("/mini-app-mobile-client/app/order/v2/miniProgram/buyNowCreateOrder", {
					"orderGoodsDetailList": [{
						"quantity": 1,
						"skuCode": this.skuCode,
						"activityInfoCode": ""
					}],
					"orderConsigneeInfo": {
						"consigneePhone": this.address.telephone,
						"cityName": this.address.cityName,
						"provinceCode": this.address.provinceId,
						"cityCode": this.address.cityId,
						"consignee": this.address.addressee,
						"districtCode": this.address.areaId,
						"districtName": this.address.areaName,
						"provinceName": this.address.provinceName,
						"consigneePhoneAreaCode": this.address.areaCode,
						"addressDetail": this.address.address
					}
				})
				this.newOrder = result.data;
				console.log(this.newOrder, "订单创建成功！")

			}
		},
		onLoad(option) {
			this.spuCode = option.spuCode
			this.skuCode = option.spuCode + "001";

		}
	}
</script>

<style lang="less" scoped>
	.order {


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
