<template>
	<view class="container" :style="[headerStyle]">
		<!-- 自定义导航栏 -->
		<view class="navBarBox">
			<!-- 状态栏占位 -->
			<view class="statusBar" :style="[headerStyle]"></view>
			<!-- 真正的导航栏内容 -->
			<navbar :menuopacity="menuopacity" :scrollIdx="scrollIdx" class="navBar"></navbar>
		</view>
		<!-- <view class="tabtop">
			<view :class="{ 'tui-sticky-fixed': isFixed,'isShowNav':isShowNav}">  
				<scroll-view scroll-x="true" style="margin:10px 70px" >
					<view class="tab" >
						<text>商品</text>
						<text>详情</text>
						<text>推荐</text>
					 </view>
				</scroll-view>
		
	</view>
		</view> -->
		<!-- 商品概要信息	 -->
		<view class="summary">
			<view class="head">
				<view class="left">
					<image :src="detail.appImgUrl" mode=""></image>

				</view>
				<view class="mid">
					<view class="spuName">
						{{detail.spuName}}
					</view>
					<view class="brief">
						<view class="pressinfo">
							ISBN:{{detail.pressInfo.isbn}}
						</view>
						<view class="auth">

							作者:[{{detail.author[0].nationalityBrief}}]{{detail.author[0].authorName}}
						</view>
						<view class="publish">
							出版社:{{detail.pressInfo.pressName}}
						</view>
					</view>
					<view class="price">
						￥{{detail.pressInfo.price}}
					</view>
				</view>
				<view class="right">
					<view class="info">

						<!-- 	<uni-section class="sec"> -->
						<view class="example-body">
							<text @click="showDrawer('showLeft')" class="word-btn-white"> 出版信息 ></text>

							<uni-drawer ref="showLeft" mode="left" :width="372" @change="change($event,'showLeft')">
								<view class="close">
									<button @click="closeDrawer('showLeft')"><text>出版信息</text></button>
								</view>

								<uni-table border stripe emptyText="暂无更多数据">

									<uni-tr>
										<uni-td>书名</uni-td>
										<uni-td>{{detail.spuName}}</uni-td>

									</uni-tr>
									<uni-tr>
										<uni-td>ISBN</uni-td>
										<uni-td>{{detail.pressInfo.isbn}}</uni-td>

									</uni-tr>
									<uni-tr>
										<uni-td>定价</uni-td>
										<uni-td>￥{{detail.pressInfo.price}}</uni-td>

									</uni-tr>
									<uni-tr>
										<uni-td>出版社名称</uni-td>
										<uni-td>{{detail.pressInfo.pressName}}</uni-td>

									</uni-tr>
									<uni-tr>
										<uni-td>出版日期</uni-td>
										<uni-td>{{detail.pressInfo.publishDate}}</uni-td>

									</uni-tr>
									<uni-tr>
										<uni-td>作者</uni-td>
										<uni-td>[{{detail.author[0].nationalityBrief}}]{{detail.author[0].authorName}}
										</uni-td>

									</uni-tr>

									<uni-tr>
										<uni-td>正文语种</uni-td>
										<uni-td>{{detail.pressInfo.lingType}}</uni-td>

									</uni-tr>
									<uni-tr>
										<uni-td>用纸</uni-td>
										<uni-td>{{detail.pressInfo.paperType}}</uni-td>

									</uni-tr>
									<uni-tr>
										<uni-td>开本</uni-td>
										<uni-td>{{detail.pressInfo.kaiben}}</uni-td>

									</uni-tr>
									<uni-tr>
										<uni-td>装订形式</uni-td>
										<uni-td>{{detail.pressInfo.bindFormat}}</uni-td>

									</uni-tr>
								</uni-table>
							</uni-drawer>
						</view>
						<!-- </uni-section> -->
					</view>
				</view>
			</view>
		</view>
		<!-- 详情 -->
		<view class="detail">
			<view class="title">
				详情
			</view>
			<view class="edit-title">
				编辑推荐
			</view>
			<view class="edit-content">
				{{detail.properties[0].propertyValue}}
			</view>
			<view class="brief-title">
				内容简介
			</view>
			<view class="brief-content">
				{{detail.properties[1].propertyValue}}
			</view>
		</view>
		<view class="baozhang">
			<text class="bao">保障</text>
			<text class="xi">西西弗发货&售后·七天无理由退货·正品保障</text>
		</view>

		<view class="commend-title">
			相关商品
		</view>

		<view class="lunhua">
			<swiper class="swiper">
				<swiper-item>
					<view class="swiper-item uni-bg-red">
						<view class="list">
							<image :src="commend[0].appImgUrl" mode=""></image>
							<image :src="commend[1].appImgUrl" mode=""></image>
							<!-- {{commend[1].spuName}}
							  {{commend[1].salePrice}} -->
							<image :src="commend[2].appImgUrl" mode=""></image>


						</view>


						<!--    {{commend[2].spuName}}
						{{commend[2].salePrice}} -->
					</view>
				</swiper-item>

				<swiper-item>
					<view class="swiper-item uni-bg-red">
						<view class="list">
							<image :src="commend[3].appImgUrl" mode=""></image>
							<image :src="commend[4].appImgUrl" mode=""></image>
							<image :src="commend[5].appImgUrl" mode=""></image>

						</view>

					</view>
				</swiper-item>





			</swiper>
		</view>
		<view class="bottom">
			<view class="shou">
				<image src="/static/icon/收藏.png" mode=""></image>
				<view class="wenzi">
					收藏
				</view>
			</view>
			<view class="kefu">
				<image src="/static/icon/客服.png" mode=""></image>
				<view class="wenzi">
					客服
				</view>
			</view>
			<view class="cart">
				<image src="/static/icon/_购物车.png" mode=""></image>
				<view class="wenzi">
					购物车
				</view>
			</view>
			<view class="btn1" @click="addgood(this.detail),postneedbook(this.detail)">
				<button>加入购物车</button>
			</view>
			<view class="btn2">
				<button @click="goCreateOrder(spuCode)">立即购买</button>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		requestPost,
		requestGet
	} from "@/common/js/http.js";
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	import {
		tokenPost,
		tokenGet
	} from "@/common/js/token.js";
	export default {

		data() {
			return {
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82,
				menuopacity: 0,
				scrollIdx: 0,
				headerStyle: {
					'--header-height': "0px",
					'--status-height': "0px"
				},
				isShowNav: false,
				isFixed: false,
				detail: {},
				commend: [],
				showLeft: false,
				isbn: '',
				spuCode: ""

			}
		},
		created() {
			//获取手机状态栏高度
			this.headerStyle['--status-height'] = uni.getSystemInfoSync()['statusBarHeight'] * 2 + 'rpx';
			this.headerStyle['--header-height'] = uni.getSystemInfoSync()['statusBarHeight'] * 2 + this.navBarHeight +
				'rpx';
		},
		methods: {
			...mapMutations("goods", ["addtocarts"]),
			async getBooksBySpuCode(spuCode) {
				let result = await requestPost("/goods/h5Detail/", {
					spuCode: spuCode
				})
				result.code == 200 ? this.detail = result.data : ""
				console.log(this.detail)
			},
			async getcommendBySpuCode(spuCode) {
				let result = await requestGet(`/goods/spurelatedrecommend?spuCode=${spuCode}`)
				result.code == 200 ? this.commend = result.data : ""
				console.log(this.commend)
			},
			confirm() {},
			// 打开窗口
			showDrawer(e) {
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close()
			},
			// 抽屉状态发生变化触发
			change(e, type) {
				console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				this[type] = e
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
				console.log(result, "sssssss")
				// result.code == 200 ? this.pricetop = [...this.pricetop, ...result.data.list] : ""
				// console.log(this.getlist);
			},
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
					quantity: 1,
					spuId: payload.spuCode,
					skuId: `${payload.spuCode}001`,
					authorName: payload.author[0].authorName,
					appShowName: payload.appShowName,
					maxSalePrice: payload.maxSalePrice,
					appImgUrl: payload.appImgUrl,
					pressName: payload.pressInfo.pressName,
					chooseStatus: 1,
				};
				this.addtocarts(goodbook);
			},
			goCreateOrder(spuCode) {
				uni.navigateTo({
					url: `/pages/createOrder/createOrder?spuCode=${spuCode}`
				})
			}
			// 
		},
		computed: {
			// ...mapState({
			// 	city: "city"
			// }),
			...mapState("goods", {
				city: "city",
				carts: "carts"
			}),
			...mapGetters("goods", {

			})
		},
		onPageScroll(res) {
			// if(e.scrollTop>50){
			// 	this.isFixed = true
			// 	this.isShowNav = true
			// 	console.log("111111111111111111111111111111")
			// }else{
			// 	this.isFixed = false
			// 	this.isShowNav = false
			// }
			//获取距离顶部距离
			const scrollTop = res.scrollTop;
			if (scrollTop >= 0) {
				// 导航条颜色透明渐变
				if (scrollTop <= 20) {
					this.menuopacity = 0
					this.scrollIdx = 0
				} else if (20 < scrollTop && scrollTop <= 200) {
					this.menuopacity = scrollTop / 200
					this.scrollIdx = 0
				} else if (scrollTop > 200) {
					this.menuopacity = 1;
					this.scrollIdx = 1;
				}
			}

		},
		onLoad(options) {
			// console.log(options.spuCode,"5555555555555555555555555555555555555555555555555555555555")
			this.spuCode = options.spuCode
			this.getBooksBySpuCode(options.spuCode),
				this.getcommendBySpuCode(options.spuCode)

		},
		onNavigationBarButtonTap(e) {
			if (this.showLeft) {
				this.$refs.showLeft.close()
			} else {
				this.$refs.showLeft.open()
			}
		},
		// app端拦截返回事件 ，仅app端生效
		onBackPress() {
			if (this.showRight || this.showLeft) {
				this.$refs.showLeft.close()
				this.$refs.showRight.close()
				return true
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		// .tabtop{
		// 	display: flex;
		// 	text:{
		// 		margin: auto 20px;
		// 		border-bottom:2px solid green;
		// 		display:inline-block;

		// 	}
		// }
		// .tui-sticky-fixed{
		// 	width: 100%;
		// 	background-color: #FFFFFF;
		// 	position: fixed;
		// 	top: 0;
		// 	z-index: 99;
		// 		}
		padding-top: var(--header-height);

		// background-color: white;
		.navBarBox {
			position: fixed;
			width: 100%;
			top: 0px;
			overflow: hidden;

			.statusBar {
				height: var(--status-height);
				background-color: white;
				// background-color: #F5FFFA;
			}

			.navBar {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				height: 82rpx;
				line-height: 82rpx;
			}

		}

		.summary {
			.head {
				background-color: #F5FFFA;
				display: flex;
				width: 100%;
				height: 220px;

				.left {
					flex: 1;
					margin: auto 10px;

					image {
						width: 120px;
						height: 160px;
						// margin: auto 10px;
					}
				}

				.mid {
					flex: 2;

					.spuName {
						font-size: 18px;
						font-weight: 800;
						width: 200px;
						margin-top: 10px;
					}

					.brief {
						color: darkgrey;
						margin-top: 20px;
						font-size: 14px;

						.pressinfo {
							margin-bottom: 5px;
						}

						.publish {
							margin-top: 5px;
							font-size: 14px;
						}
					}

					.price {
						color: #FF0000;
						font-size: 18px;
						font-weight: 800;
						margin-top: 20px;
					}
				}

				.right {
					flex: 1;
					margin-top: 150px;

					// margin-right: 10px;
					.info {
						width: 80px;
						position: relative;
						right: 60px;
						font-size: 14px;
						font-weight: 500;


						.example-body {
							/deep/ .uni-drawer__content {
								// position: relative;
								// top:100px;
								width: 372px;
								height: 300px;
								margin-top: 160px;
								// margin-left: 20px;
								// background-color: aqua;
								border-radius: 10px;
								// background-color: #F5FFFA;
								// text{
								// 	color:red;
								// 	font-size: 14px;
								// 	font-weight: 500;
								// }

							}

							// /deep/ .uni-table-scroll{


							// }
						}



					}
				}
			}
		}

		.detail {
			.title {
				border-bottom: 2px solid green;
				padding-bottom: 6px;
				display: inline-block;
				margin-top: 20px;
				margin-left: 10px;
			}

			.edit-title {
				font-size: 18px;
				font-weight: 500;
				margin-top: 30px;
				margin-left: 10px;
			}

			.edit-content {
				margin-left: 10px;
				margin-top: 15px;
				font-size: 12px;
			}

			.brief-title {
				font-size: 18px;
				font-weight: 500;
				margin-top: 30px;
				margin-left: 10px;
			}

			.brief-content {
				margin-left: 10px;
				margin-top: 15px;
				font-size: 12px;
			}
		}

		.baozhang {
			border: 1px solid whitesmoke;

			// opacity:.5;
			margin-top: 20px;
			margin-left: 10px;
			height: 30px;
			line-height: 30px;
			font-weight: 500;

			.bao {
				color: darkgrey;
				font-size: 16px;
				margin-right: 10px;
			}

			.xi {
				// font-weight: 600;
			}
		}

		.commend-title {
			font-size: 18px;
			font-weight: 500;
			margin-top: 20px;
			margin-left: 10px;

		}


		.lunhua {
			padding-bottom: 100px;
			// bottom:30px;
		}

		.swiper {

			// overflow:auto;
			// margin-bottom: 40px;
			swiper-item {
				overflow: auto;
			}

			.list {

				image {
					width: 120px;
					height: 130px;
					margin-right: 5px;
				}
			}

			.list1 {
				.name {
					margin-left: 20px;
					color: lightgrey;
					overflow: hidden;
					word-break: break-all;
					/* break-all(允许在单词内换行。) */
					text-overflow: ellipsis;
					/* 超出部分省略号 */
					display: -webkit-box;
					/** 对象作为伸缩盒子模型显示 **/
					-webkit-box-orient: vertical;
					/** 设置或检索伸缩盒对象的子元素的排列方式 **/
					-webkit-line-clamp: 1;
					/** 显示的行数 **/
				}
			}
		}

		.bottom {
			width: 372px;
			height: 70px;
			padding-top: 28px;
			padding-left: 5px;

			background-color: ghostwhite;
			border: 1px solid #F5FFFA;
			position: fixed;
			bottom: 0;
			display: flex;

			.wenzi {
				font-size: 14px;

			}

			image {
				width: 20px;
				height: 20px;
				margin-left: 6px;
			}

			.shou {
				flex: 1
			}

			.kefu {
				flex: 1
			}

			.cart {
				flex: 1
			}

			.btn1 {
				button {
					background-color: goldenrod;
					color: white;
				}

			}

			.btn2 {
				button {
					background-color: green;
					color: white;
				}
			}

		}
	}
</style>
