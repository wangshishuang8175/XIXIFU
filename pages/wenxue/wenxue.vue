<template>
	<view class="container">

		<view class="head-nav">
			<view class="moren" :class="navIndex==1?'activite':''" @click="checkIndex(1)">默认</view>
			<view class="price" :class="navIndex==2?'activite':''" @click="checkIndex(2)">价格</view>
			<image class="top" src="/static/icon/上三角.png" :class="navIndex==5?'activite':''" @click="checkIndex(5)">
			</image>
			<image class="bottom" src="/static/icon/下三角.png" :class="navIndex==3?'activite':''" @click="checkIndex(3)">
			</image>
			<view class="seller" :class="navIndex==4?'activite':''" @click="checkIndex(4)">销量 </view>
			<text class="tab" @click="changeTab"> 切换分类</text>
		</view>

		<view class="content" v-for="item in category" :key="item.spuName" v-if="navIndex==1">
			<!-- <view class="content" v-for="item in category" :key="item.spuName" v-if="navIndex==1" to="/pages/goods-detail/goods-detail"> -->
			<view class="left" @click="togood(item.spuCode)">
				<image :src="item.appImgUrl" mode=""></image>
			</view>
			<view class="mid" @click="togood(item.spuCode)">
				<view class="spuName">{{item.spuName}}</view>
				<view class="authorName">{{item.authorName}}</view>
				<view class="pressName">{{item.pressName}}</view>
				<view class="salePrice">￥{{item.maxSalePrice}}</view>
			</view>
			<view class="right" @click="addgood(item),postneedbook(item)">
				<image class="cart" src="/static/gouwuche.png" mode=""></image>
			</view>
			<!-- 	</view> -->
		</view>

		<view class="content" v-for="item in price" :key="item.spuName" v-if="navIndex==2">
			<view class="left" @click="togood(item.spuCode)">
				<image :src="item.appImgUrl" mode=""></image>
			</view>
			<view class="mid" @click="togood(item.spuCode)">
				<view class="spuName">{{item.spuName}}</view>
				<view class="authorName">{{item.authorName}}</view>
				<view class="pressName">{{item.pressName}}</view>
				<view class="salePrice">￥{{item.maxSalePrice}}</view>
			</view>
			<view class="right" @click="addgood(item),postneedbook(item)">
				<image class="cart" src="/static/gouwuche.png" mode=""></image>
			</view>
		</view>

		<view class="content" v-for="item in pricetop" :key="item.spuName" v-if="navIndex==5">
			<view class="left" @click="togood(item.spuCode)">
				<image :src="item.appImgUrl" mode=""></image>
			</view>
			<view class="mid" @click="togood(item.spuCode)">
				<view class="spuName">{{item.spuName}}</view>
				<view class="authorName">{{item.authorName}}</view>
				<view class="pressName">{{item.pressName}}</view>
				<view class="salePrice">￥{{item.maxSalePrice}}</view>
			</view>
			<view class="right" @click="addgood(item),postneedbook(item)">
				<image class="cart" src="/static/gouwuche.png" mode=""></image>
			</view>
		</view>

		<view class="content" v-for="item in pricebottom" :key="item.spuName" v-if="navIndex==3">
			<view class="left" @click="togood(item.spuCode)">
				<image :src="item.appImgUrl" mode=""></image>
			</view>
			<view class="mid" @click="togood(item.spuCode)">
				<view class="spuName">{{item.spuName}}</view>
				<view class="authorName">{{item.authorName}}</view>
				<view class="pressName">{{item.pressName}}</view>
				<view class="salePrice">￥{{item.maxSalePrice}}</view>
			</view>
			<view class="right" @click="addgood(item),postneedbook(item)">
				<image class="cart" src="/static/gouwuche.png" mode=""></image>
			</view>
		</view>


		<view class="content" v-for="item in seller" :key="item.spuName" v-if="navIndex==4">
			<view class="left" @click="togood(item.spuCode)">
				<image :src="item.appImgUrl" mode=""></image>
			</view>
			<view class="mid" @click="togood(item.spuCode)">
				<view class="spuName">{{item.spuName}}</view>
				<view class="authorName">{{item.authorName}}</view>
				<view class="pressName">{{item.pressName}}</view>
				<view class="salePrice">￥{{item.maxSalePrice}}</view>
			</view>
			<view class="right" @click="addgood(item),postneedbook(item)">
				<image class="cart" src="/static/gouwuche.png" mode=""></image>
			</view>
		</view>
		<uni-load-more v-if="hasMore" status="loading"></uni-load-more>
		<uni-load-more v-else status="noMore"></uni-load-more>
	</view>

</template>

<script>
	import {
		requestPost
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
				category: [],
				price: [],
				seller: [],
				pricebottom: [],
				pricetop: [],
				navIndex: 1,
				pageNum: 1,
				hasMore: true,
				tocode: "",
				titlename: '',
			}
		},
		onLoad(options) {
		 console.log(options.obj, "onshhoboobobobbobobob");
			this.tocode = options.obj;
			console.log([this.tocode], "cocococoocococccoco");
			this.titlename = options.thename;
			uni.setNavigationBarTitle({
				title: this.titlename
			})
			console.log(options,"oooooooooooooooooooooooooooo");
			console.log(this.titlename,"nannanannanannanannanannanananan");
		},
		mounted() {
			    this.getCategory(),
				this.getPrice(),
				this.getSeller(),
				this.getPriceBottom(),
				this.getPriceTop(),
				console.log(this.city, "vuex引用数据带上this");
			// console.log(city,"vuex引用数据不带this");不带this会报错，vuex的数据通过map方式引入进来相当于存入data中

		},
		methods: {
			...mapMutations("goods", ["addtocarts"]),
			async getCategory() {
				let result = await requestPost("/goods/listbycategory", {
					"orderDesc": true,
					"orderByPublishTime": true,
					pageNum: this.pageNum,
					"pageSize": 10,
					"frontCategoryCode": [this.tocode]
				})
				if (result.data.list.length < 10) {
					this.hasMore = false
				}
				console.log(result)
				result.code == 200 ? this.category = [...this.category, ...result.data.list] : ""
				// console.log(this.getlist);
			},
			async getPrice() {
				let result = await requestPost("/goods/listbycategory", {
					pageNum: this.pageNum,
					"pageSize": 10,
					"frontCategoryCode": [this.tocode],
					"orderDesc": false,
					"orderByPrice": true
				})
				console.log(result)
				result.code == 200 ? this.price = [...this.price, ...result.data.list] : ""
				// console.log(this.getlist);
			},
			async getSeller() {

				let result = await requestPost("/goods/listbycategory", {
					pageNum: this.pageNum,
					"pageSize": 10,
					"frontCategoryCode": [this.tocode],
					"orderDesc": true,
					"orderBySoldVolume": true
				})
				console.log(result)
				result.code == 200 ? this.seller = [...this.seller, ...result.data.list] : ""
				// console.log(this.getlist);


			},
			async getPriceBottom() {

				let result = await requestPost("/goods/listbycategory", {
					pageNum: this.pageNum,
					"pageSize": 10,
					"frontCategoryCode": [this.tocode],
					"orderDesc": true,
					"orderByPrice": true
				})
				console.log(result)
				result.code == 200 ? this.pricebottom = [...this.pricebottom, ...result.data.list] : ""
				// console.log(this.getlist);


			},
			async getPriceTop() {
				let result = await requestPost("/goods/listbycategory", {
					pageNum: this.pageNum,
					"pageSize": 10,
					"frontCategoryCode": [this.tocode],
					"orderDesc": false,
					"orderByPrice": true
				})
				console.log(result)
				result.code == 200 ? this.pricetop = [...this.pricetop, ...result.data.list] : ""
				// console.log(this.getlist);
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
				console.log(result,"sssssss")
				// result.code == 200 ? this.pricetop = [...this.pricetop, ...result.data.list] : ""
				// console.log(this.getlist);
			},
			postneedbook(e){
				this.postBookTo(e);
				if (e.ifSoldOut==true) {
					uni.showToast({
					 title: `商品已售罄`,
						icon: 'none'
					})
				} else{
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
					authorName: payload.authorName,
					appShowName: payload.appShowName,
					maxSalePrice: payload.maxSalePrice,
					appImgUrl: payload.appImgUrl,
					pressName: payload.pressName,
					chooseStatus:1,
				};
				this.addtocarts(goodbook);
			},
			// 
			checkIndex(index) {
				this.navIndex = index;
			},
			changeTab() {
				uni.switchTab({
					url: '/pages/classfiy/classfiy'
				});
			},
			togood(e) {
				uni.navigateTo({
					url: `/pages/goods-detail/goods-detail?spuCode=${e}`
				})
			},

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
		//上拉加载
		onReachBottom() {
			if (this.hasMore) {
				this.pageNum++;
				this.getCategory();
				this.getPrice(),
					this.getSeller()
				this.getPriceBottom()
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.category = [];
			this.pageNum = 1;
			this.hasMore = true;
			this.getCategory().then(() => {
				uni.stopPullDownRefresh();
			});

		}
	}
</script>

<style lang="less" scoped>
	.container {
		.head-nav {
			margin-left: 20px;
			display: flex;

			.activite {
				color: orange;
			}

			.top {
				width: 10px;
				height: 10px;
				position: relative;
				right: 12px;
				bottom: -2px
			}

			.bottom {
				width: 20px;
				height: 20px;
				position: relative;
				top: 6px;
				right: 27px
			}

			.moren {
				margin: 0 10px;
				// color: orange;
			}

			.price {
				margin: 0 15px;
			}

			.seller {
				margin: 0 15px;
			}

			.tab {
				margin-left: 60px;
			}
		}

		/deep/.content {
			width: 350px;
			height: 180px;
			border: 1px solid lightgray;
			border-radius: 5px;
			margin: 20px 6px 20px 10px;
			display: flex;

			.left {
				flex: 1;

				image {
					margin-left: 8px;
					margin-top: 14px;
					width: 100px;
					height: 150px;
				}
			}

			.mid {
				flex: 3;
				margin-top: 13px;
				margin-left: 4px;

				.salePrice {
					color: red;
					font-weight: 800;
					margin-top: 55px;

				}

				.spuName {
					font-weight: 800;

				}

				.authorName {
					color: lightgrey;
					margin-top: 5px;

				}

				.pressName {
					color: lightgrey;

				}
			}

			.right {
				margin-top: 140px;
				margin-right: 10px;

				.cart {
					flex: 1;
					width: 30px;
					height: 30px;
					padding: 0 0 15px 0;
					margin-bottom: 10px;
				}
			}






		}
	}
</style>
