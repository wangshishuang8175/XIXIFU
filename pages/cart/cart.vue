<template>
	<view class="container">
		<view class="goodment">
			<view class="" v-for="(list,idx) in salebook" :key="list.idx">
				<!-- 			{{list.cartSkuDTOS}} -->
				<view class="hotbox" v-for="(item,idx) in list.cartSkuDTOS" :key="item.spuCode">
					<view class="check">
						<view class="circle" @click="colorful()" :class="[item.chooseStatus==1?'acolor':'']"></view>
					</view>
					<image :src="item.imgUrl" class="bookimg" mode="aspectFill" @click="ohmybook(item.spuCode)"></image>
					<view class="allname">
						<view class="bookname" @click="ohmybook(item.spuCode)">{{item.appShowName}}</view>
						<view class="authorName" @click="ohmybook(item.spuCode)">{{item.authorDTO[0].authorName}}</view>
						<view class="pressName" @click="ohmybook(item.spuCode)">{{item.pressInfo.pressName}}</view>
						<text class="salePrice" @click="ohmybook(item.spuCode)">￥{{item.price}}</text>
						<view class="cartcount">
							<view class="count" @click="nolike(item),cutgood(item)">-</view><text> {{item.quantity}}</text>
							<view class="count" @click="postneedbook(item),addgood(item)">+</view>
						
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="Gabalnara">
			<view class="Gabalnara_one">
				商品满<view class="nine">99</view>元包邮
			</view>

			<view class="select">
				<view class="left">
					<span class="Gabalnara_two" @click="getAgreeShow()" :class="agreeShow ? 'tick' : ' '"></span>
					<view class="check_all">全选</view>
					<view class="money">合计:
						<view class="nine">￥0.00</view>
					</view>
				</view>
				<navigator url="/pages/indent/indent" hover-class="navigator-hover" class="btn">
				  <button >去结算</button>
				</navigator>
			</view>

			<span class="mytick"></span>
			<zdytabbar :current-page="3"></zdytabbar>
		</view>

	</view>
</template>

<script>
	import {
		requestPost,
		requestGet
	} from '@/common/js/http.js';
	import {
		tokenPost,
		tokenGet
	} from "@/common/js/token.js";
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	import zdytabbar from '@/components/zdytabbar/zdytabbar.vue'
	export default {
		components: {
			zdytabbar
		},
		data() {
			return {
				agreeShow: false, // 控制点击
				salebook: [],
				modify:""
			}
		},
		created() {
			this.getList();
		},
		onShow() {
			this.getList();
		},
		methods: {	
				...mapMutations("goods", ["addtocarts","cuttocarts"]),
			// 
			async getList() {
				let result = await tokenGet("/mini-app-mobile-client/app/cart/v2/getCartListNew")
				// console.log(result)
				console.log(result.data, "wfdewewwdatdadtata");
				this.salebook = result.data.cartActivityDTOS
				console.log(this.salebook, "saleasallsasla");
			},
			// 添加购物车请求
			async postBookTo(e) {
				// https://miniprogram.api.sisyphe.cn/gateway-api/mini-app-mobile-client/app/cart/v2/addCart
				let result = await tokenPost("/mini-app-mobile-client/app/cart/v2/addCart", {
					"cartRequest": [{
						"quantity": 1,
						"spuId": e.spuCode,
						"skuId": `${e.spuCode}001`
					}]
				})
					this.getList();
				console.log(result, "sssssss")
				// result.code == 200 ? this.pricetop = [...this.pricetop, ...result.data.list] : ""
				// console.log(this.getlist);
			},
			// 发送购物车请求
			postneedbook(e) {
				this.postBookTo(e);
				if (e.ifSoldOut == true) {
					uni.showToast({
						title: `商品已售罄`,
						icon: 'none'
					})
				} else {
					uni.showToast({
						title: `添加购物车成功`,
						icon: 'none'
					})
				}

			},
			addgood(payload) {
				var goodbook = {
					quantity:1,
					spuId:payload.spuCode,
					skuId:`${payload.spuCode}001`,
					authorName: payload.authorDTO[0].authorName,
					appShowName: payload.appShowName,
					maxSalePrice: payload.price,
					appImgUrl: payload.imgUrl,
					pressName: payload.pressInfo.pressName,
					chooseStatus:payload.chooseStatus,
				};
				this.addtocarts(goodbook);
			},
			cutgood(payload){
				this.cuttocarts(payload);
			},
			// 减少购物车数量请求
			async postModify(e) {
				if (e.quantity==1) {
					uni.showToast({
						title: `数量不能再少啦`,
						icon: 'none'
					})
				} else{
					let result = await tokenPost("/mini-app-mobile-client/app/cart/v2/modifyCart", {
						"quantity": e.quantity-1,
						"id": e.id,
						"skuId": e.skuId,
						"activityCode": "-1"
					})
					this.getList();
					console.log(result.data, "sssssssjianjianjainajanjain")
				}
			
				
				// result.code == 200 ? this.pricetop = [...this.pricetop, ...result.data.list] : ""
				// console.log(this.getlist);
			},
			
			nolike(e){
				this.postModify(e);
				
			},
			// 跳转到详情页
			ohmybook(e) {
				uni.navigateTo({
					url: `/pages/goods-detail/goods-detail?spuCode=${e}`
				})
			},
			// 圆圈变色
			colorful() {

			},
			// 全选颜色
			getAgreeShow() {
				this.agreeShow = !this.agreeShow; // 控制点击
			},

		},
		computed: {
			// ...mapState({
			// 	city: "city"
			// }),
			...mapState("search", {
				city: "city",
				history: "history",
			}),
			...mapGetters("search", {

			}),
			...mapState("goods", {
				citys: "city",
				carts: "carts"
			}),
			...mapGetters("goods", {
			
			})

		},
	}
</script>

<style lang="less">
	.acolor {
		background-color: green;
	}

	.container {
		.goodment {
			padding: 0 30rpx 300rpx 30rpx;

			.hotbox {
				// margin-top: 120rpx;
				display: flex;
				margin-bottom: 40rpx;
				// border: 1px solid gray;
				background-color: #fff;
				border-radius: 12rpx;
				padding: 20rpx;

				.check {
					flex: 1;
					text-align: center;
					padding-top: 120rpx;

					.circle {
						width: 20px;
						height: 20px;
						border-radius: 50%;
						border: 1px solid green;

					}
				}

				.bookimg {
					flex: 2;
					width: 250rpx;
					height: 300rpx;
					border-radius: 8rpx;
				}

				.allname {
					flex: 5;
					padding-left: 20rpx;
					position: relative;

					.bookname {
						font-size: 32rpx;
						margin-bottom: 10rpx;
					}

					.authorName {
						font-size: 24rpx;
						color: gray;
						margin-bottom: 10rpx;
					}

					.pressName {
						font-size: 24rpx;
						color: gray;

					}

					.salePrice {
						font-size: 32rpx;
						color: red;
						position: absolute;
						bottom: 10rpx;
					}

					.cartcount {
						// width: 80rpx;
						height: 80rpx;
						position: absolute;
						bottom: -10rpx;
						right: 10rpx;

						.count {
							display: inline-block;
							width: 40rpx;
							height: 40rpx;
							border: 1px solid green;
							border-radius: 40rpx;
							text-align: center;
							margin: 10rpx;
						}
					}

				}

			}
		}

		// 底部
		.Gabalnara {
			position: fixed;
			width: 100%;
			bottom: 110rpx;

			.Gabalnara_one {
				background-color: MistyRose;
				padding-left: 30rpx;
				font-size: 26rpx;

				.nine {
					padding: 10rpx;
					display: inline-block;
					color: red;
				}
			}


			.select {
				display: flex;
				flex-direction: row;
				align-items: center;
				background-color: white;

				.left {
					flex: 1;
					align-items: center;
					display: flex;
					flex-direction: row;
					align-items: center;

					.Gabalnara_two {
						position: relative;
						width: 20px;
						height: 20px;
						// margin-top: 15rpx;
						border: 1px solid green !important;
						border-radius: 50%;
						margin-left: 30rpx;
						display: inline-block;
					}

					.tick {
						background-color: green;
					}

					.tick::after {
						content: " ";
						position: absolute;
						// display: inline-block;
						width: 12px;
						height: 6px;
						border-width: 0 0 2px 2px;
						overflow: hidden;
						border-color: white;
						border-style: solid;
						-webkit-transform: rotate(-50deg);
						transform: rotate(-50deg);
						left: 3px;
						top: 4px;
					}

					.check_all {
						line-height: 3em;
						display: inline-block;
						font-weight: 800;
						font-size: 35rpx;
						padding-left: 25rpx;
						vertical-align: center;
					}

					.money {
						display: inline-block;
						padding-left: 20rpx;
						font-size: 26rpx;
						vertical-align: center;


						.nine {
							display: inline-block;
							color: red;
						}
					}

				}

				.btn {
					display: flex;
					flex-direction: row;
					justify-content: center;

					button {
						font-size: 35rpx;
						font-weight: 800;
						margin: 30rpx;
						// margin-left: 100rpx;
						display: inline-block;
						border-radius: 16rpx;
						color: white;
						background-color: green;
						// vertical-align: center;
						// align-items: center;
						justify-content: center;
					}

				}
			}
		}
	}
</style>
