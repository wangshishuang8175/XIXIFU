<template>
	<view class="whitebg">
		<view class="searchs">
			<uni-icons type="search" size="22" class="serchiocn"></uni-icons>
			<input type="text" name="hotinput" id="" class="hotinputs" :value="this.obj" @input="tosearch(this.obj)">
		</view>
	</view>
	<view class="container">
		<!-- 	{{needbooks}} -->
		<!-- <view class="" v-for="item in needbooks" :key="item.spuCode">
     	<image :src="item.appImgUrl" class="bookimg" mode="aspectFill"></image>
     	<view class="allname">
     		<view class="bookname">{{item.frontDisplayName}}</view>
     		<view class="authorName">{{item.authorName}}</view>
     		<view class="pressName">{{item.pressName}}</view>
     		<text class="salePrice">￥{{item.salePrice}}</text>
     	</view>
     </view> -->
		<!-- <uni-section title="实心标签" type="line" >
	 		<view class="uni-padding-wrap uni-common-mt">
	 			<uni-segmented-control :current="current" :values="theitems" :style-type="styleType"
	 				:active-color="activeColor" @clickItem="onClickItem" />
	 		</view> -->
		<!-- 搜索框 -->


		<view class="topwrap">
			<view class="navraw" v-for="(item,index) in theitems" :key="item.index"
				:class="[this.current==index?'active':'']" @click="onClickItem(index)">
				{{item}}
			</view>
		</view>
		<view class="content">
			<!-- 左边的 -->
			<view v-if="current === 0">
				<view class="head-nav">
					<view class="moren" :class="navIndex==1?'activite':''" @click="change(0),checkIndex(1)">默认
					</view>
					<view class="price" :class="navIndex==2?'activite':''" @click="changef(0),checkIndex(2)">价格
					</view>
					<!-- <image class="top" src="/static/icon/上三角.png" :class="navIndex==2?'activite':''"
						@click="changef(0),checkIndex(2)">
					</image>
					<image class="bottom" src="/static/icon/下三角.png" :class="navIndex==2?'activite':''"
						@click="changef(0),checkIndex(2)">
					</image> -->
					<text class="iconfont icon-shangsanjiaoxing" :class="flag?'':'colorful'" ></text>
					<text class="iconfont icon-xiasanjiaoxing" :class="flag?'colorful':''" ></text>
					<view class="seller" :class="navIndex==4?'activite':''" @click="checkIndex(4),changes(0)">销量
					</view>
				</view>
				<view class="rongqi">
					<view class="hotbox" v-for="(list,idx) in needbooks" :key="list.spuCode"
						 v-if="navIndex==1">
						<image :src="list.appImgUrl" class="bookimg" mode="aspectFill" @click="ohmybook(list.spuCode)"></image>
						<view class="allname">
							<view class="bookname" @click="ohmybook(list.spuCode)">{{list.frontDisplayName}}</view>
							<view class="authorName" @click="ohmybook(list.spuCode)">{{list.authorName}}</view>
							<view class="pressName" @click="ohmybook(list.spuCode)">{{list.pressName}}</view>
							<text class="salePrice" @click="ohmybook(list.spuCode)">￥{{list.salePrice}}</text>
							<image class="cart" src="/static/gouwuche.png" mode="" @click="addgood(list),thecarts(list)"></image>
						</view>
					</view>
					<view class="hotbox" v-for="(list,idx) in needbooks" :key="list.spuCode"
						 v-if="navIndex==2">
						<image :src="list.appImgUrl" class="bookimg" mode="aspectFill" @click="ohmybook(list.spuCode)"></image>
						<view class="allname">
							<view class="bookname" @click="ohmybook(list.spuCode)">{{list.frontDisplayName}}</view>
							<view class="authorName" @click="ohmybook(list.spuCode)">{{list.authorName}}</view>
							<view class="pressName" @click="ohmybook(list.spuCode)">{{list.pressName}}</view>
							<text class="salePrice" @click="ohmybook(list.spuCode)">￥{{list.salePrice}}</text>
							<image class="cart" src="/static/gouwuche.png" mode="" @click="addgood(list),thecarts(list)"></image>
						</view>
					</view>
					<view class="hotbox" v-for="(list,idx) in needbooks" :key="list.spuCode"
						 v-if="navIndex==4">
						<image :src="list.appImgUrl" class="bookimg" mode="aspectFill" @click="ohmybook(list.spuCode)"></image>
						<view class="allname">
							<view class="bookname" @click="ohmybook(list.spuCode)">{{list.frontDisplayName}}</view>
							<view class="authorName" @click="ohmybook(list.spuCode)">{{list.authorName}}</view>
							<view class="pressName" @click="ohmybook(list.spuCode)">{{list.pressName}}</view>
							<text class="salePrice" @click="ohmybook(list.spuCode)">￥{{list.salePrice}}</text>
							<image class="cart" src="/static/gouwuche.png" mode="" @click="addgood(list),thecarts(list)"></image>
						</view>
					</view>
				</view>
                    <view v-if="this.needs.hasNextPage==true"><uni-load-more status="loading"></uni-load-more> </view>
				     <view class="" v-else>
				     	没有更多商品了
				     </view>
			</view>

			<!-- 中间的 -->

			<view v-if="current === 1">
				<view class="head-nav">
					<view class="moren" :class="mIndex==1?'activite':''" @click="change(1),checkIndexa(1)">默认
					</view>
					<view class="price" :class="mIndex==2?'activite':''" @click="changef(1),checkIndexa(2)">价格
					</view>
					<!-- <image class="top" src="/static/icon/上三角.png" :class="mIndex==2?'activite':''"
						@click="changef(1),checkIndexa(2)">
					</image>
					<image class="bottom" src="/static/icon/下三角.png" :class="mIndex==2?'activite':''"
						@click="changef(1),checkIndexa(2)">
					</image> -->
					<text class="iconfont icon-shangsanjiaoxing" :class="flag?'':'colorful'"></text>
					<text class="iconfont icon-xiasanjiaoxing" :class="flag?'colorful':''"></text>
					<view class="seller" :class="mIndex==4?'activite':''" @click="checkIndexa(4),changes(1)">销量
					</view>
				</view>
				<view class="rongqi">
					<view class="hotbox" v-for="(list,idx) in morebooks" :key="list.spuCode"
						 v-if="mIndex==1">
						<image :src="list.appImgUrl" class="bookimg" mode="aspectFill" @click="ohmybook(list.spuCode)"></image>
						<view class="allname">
							<view class="bookname" @click="ohmybook(list.spuCode)">{{list.frontDisplayName}}</view>
							<view class="authorName" @click="ohmybook(list.spuCode)">{{list.authorName}}</view>
							<view class="pressName" @click="ohmybook(list.spuCode)">{{list.pressName}}</view>
							<text class="salePrice" @click="ohmybook(list.spuCode)">￥{{list.salePrice}}</text>
							<image class="cart" src="/static/gouwuche.png" mode="" @click="addgood(list),thecarts(list)"></image>
						</view>
					</view>
					<view class="hotbox" v-for="(list,idx) in morebooks" :key="list.spuCode"
						 v-if="mIndex==2">
						<image :src="list.appImgUrl" class="bookimg" mode="aspectFill" @click="ohmybook(list.spuCode)"></image>
						<view class="allname">
							<view class="bookname" @click="ohmybook(list.spuCode)">{{list.frontDisplayName}}</view>
							<view class="authorName" @click="ohmybook(list.spuCode)">{{list.authorName}}</view>
							<view class="pressName" @click="ohmybook(list.spuCode)">{{list.pressName}}</view>
							<text class="salePrice" @click="ohmybook(list.spuCode)">￥{{list.salePrice}}</text>
							<image class="cart" src="/static/gouwuche.png" mode="" @click="addgood(list),thecarts(list)"></image>
						</view>
					</view>
					<view class="hotbox" v-for="(list,idx) in morebooks" :key="list.spuCode"
						 v-if="mIndex==4">
						<image :src="list.appImgUrl" class="bookimg" mode="aspectFill" @click="ohmybook(list.spuCode)"></image>
						<view class="allname">
							<view class="bookname" @click="ohmybook(list.spuCode)">{{list.frontDisplayName}}</view>
							<view class="authorName" @click="ohmybook(list.spuCode)">{{list.authorName}}</view>
							<view class="pressName" @click="ohmybook(list.spuCode)">{{list.pressName}}</view>
							<text class="salePrice" @click="ohmybook(list.spuCode)">￥{{list.salePrice}}</text>
							<image class="cart" src="/static/gouwuche.png" mode="" @click="addgood(list),thecarts(list)"></image>
						</view>
					</view>
				</view>

			<view v-if="this.mores.hasNextPage==true"><uni-load-more status="loading"></uni-load-more> </view>
			 <view class="" v-else>
			 	没有更多商品了
			 </view>
			</view>
			<!-- 右边的 -->
			<view v-if="current === 2">
				<view class="head-nav">
					<view class="moren" :class="rIndex==1?'activite':''" @click="change(3),checkIndexb(1)">默认
					</view>
					<view class="price" :class="rIndex==2?'activite':''" @click="changef(3),checkIndexb(2)">价格
					</view>
					<!-- <image class="top" src="/static/icon/上三角.png" :class="rIndex==2?'activite':''"
						@click="changef(3),checkIndexb(2)">
					</image>
					<image class="bottom" src="/static/icon/下三角.png" :class="rIndex==2?'activite':''"
						@click="changef(3),checkIndexb(2)">
					</image> -->
					<text class="iconfont icon-shangsanjiaoxing" :class="flag?'':'colorful'"></text>
					<text class="iconfont icon-xiasanjiaoxing" :class="flag?'colorful':''"></text>
					<view class="seller" :class="rIndex==4?'activite':''" @click="checkIndexb(4),changes(3)">销量
					</view>
				</view>
				<view class="rongqi">
					<view class="hotbox" v-for="(list,idx) in playbooks" :key="list.spuCode"
						 v-if="rIndex==1">
						<image :src="list.appImgUrl" class="bookimg" mode="aspectFill" @click="ohmybook(list.spuCode)"></image>
						<view class="allname">
							<view class="bookname" @click="ohmybook(list.spuCode)">{{list.frontDisplayName}}</view>
							<view class="authorName" @click="ohmybook(list.spuCode)">{{list.authorName}}</view>
							<view class="pressName" @click="ohmybook(list.spuCode)">{{list.pressName}}</view>
							<text class="salePrice" @click="ohmybook(list.spuCode)">￥{{list.maxSalePrice}}</text>
							<image class="cart" src="/static/gouwuche.png" mode="" @click="addgood(list),thecarts(list)"></image>
						</view>
					</view>
					<view class="hotbox" v-for="(list,idx) in playbooks" :key="list.spuCode"
						 v-if="rIndex==2">
						<image :src="list.appImgUrl" class="bookimg" mode="aspectFill" @click="ohmybook(list.spuCode)"></image>
						<view class="allname">
							<view class="bookname" @click="ohmybook(list.spuCode)">{{list.frontDisplayName}}</view>
							<view class="authorName" @click="ohmybook(list.spuCode)">{{list.authorName}}</view>
							<view class="pressName" @click="ohmybook(list.spuCode)">{{list.pressName}}</view>
							<text class="salePrice" @click="ohmybook(list.spuCode)">￥{{list.maxSalePrice}}</text>
							<image class="cart" src="/static/gouwuche.png" mode="" @click="addgood(list),thecarts(list)"></image>
						</view>
					</view>
					<view class="hotbox" v-for="(list,idx) in playbooks" :key="list.spuCode"
						 v-if="rIndex==4">
						<image :src="list.appImgUrl" class="bookimg" mode="aspectFill" @click="ohmybook(list.spuCode)"></image>
						<view class="allname">
							<view class="bookname" @click="ohmybook(list.spuCode)">{{list.frontDisplayName}}</view>
							<view class="authorName" @click="ohmybook(list.spuCode)">{{list.authorName}}</view>
							<view class="pressName" @click="ohmybook(list.spuCode)">{{list.pressName}}</view>
							<text class="salePrice" @click="ohmybook(list.spuCode)">￥{{list.maxSalePrice}}</text>
							<image class="cart" src="/static/gouwuche.png" mode="" @click="addgood(list),thecarts(list)"></image>
						</view>
					</view>
				</view>
			<view v-if="this.plays.hasNextPage==true">	 <uni-load-more status="loading"></uni-load-more> </view>
			 <view class="" v-else>
			没有更多商品了
			 </view>
			</view>
		</view>
	</view>

</template>
<!-- tiao -->
<script>
	import {
		requestPost,
		requestGet
	} from '@/common/js/http.js';
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
		created() {
			this.getStorage();
			// this.postneed(1),
			// this.postneed(3)
		},

		mounted() {
			this.postneed(1),
				this.postneed(3),
				this.postneed(0)

			// this.postbooks(),
			// this.postplay()
		},
		data() {
			return {
				// key:"我的",
				needbooks: [],
				morebooks: [],
				playbooks: [],
				pricebooks: [],
				salebooks: [],
				needs: {},
				mores: {},
				plays:{},
				prices:{},
				sales: {},
				obj: "",
				current: 0,
				theitems: ['全部', '图书', '文创'],
				// active1:
				// styleType: 'text',
				// styles: [{
				// 		value: 'text',
				// 		text: '按钮',
				// 		checked: true
				// 	},
				// 	{
				// 		value: 'text',
				// 		text: '文字'
				// 	}
				// ],
				colorIndex: 0,
				// activeColor: [{border},{},{}],
				flag: true,
				navIndex: 1,
				mIndex: 1,
				rIndex: 1,
				pageNum: 1,
				hasMore: true,
				keyflag: false
			}
		},
		// onPageScroll(e) {
		// 	this.scrollTop = e.scrollTop;
		// },
		methods: {
			...mapMutations("goods", ["addtocarts"]),
			getStorage() {
				uni.getStorage({
					key: 'history',
					success: res => {
						console.log(res)
					}
				})
			},
			// 开始
			// 默认
			async postneed(e) {
				let result = await requestPost("/goods/search", {
					"pageSize": 20,
					"keyWord": this.obj,
					"spuType": e,
					"pageNum": this.pageNum,
					"orderDesc": true,
					"orderByPublishTime": true
				});
				console.log(result.data,"rererrerererer");
				
				if (e == 3) {
					result.code == 200 ? this.playbooks = [...this.playbooks, ...result.data.list] : '';
					 this.plays = result.data;
					 console.log(this.plays,"lllllllllllllllllll888888888");
					// this.more=e+10;
					// console.log(this.more,"more");
				} else if (e == 1) {
					result.code == 200 ? this.morebooks = [...this.morebooks, ...result.data.list] : '';
					// this.more=e+10;
					// console.log(this.more,"more");
				 this.mores = result.data;
				} else {
					result.code == 200 ? this.needbooks = [...this.needbooks, ...result.data.list] : '';
					// this.more=e+10;
					// console.log(this.more,"more");
					this.needs = result.data;
				}
			},
			// 价格上下,
			async postprice(e) {
				let result = await requestPost("/goods/search", {
					"pageSize": 20,
					"keyWord": this.obj,
					"spuType": e,
					"pageNum": this.pageNum,
					"orderDesc": this.flag,
					"orderByPrice": true
				});
				if (e == 3) {
					result.code == 200 ? this.playbooks = [...this.playbooks, ...result.data.list] : '';
					// this.more=e+20;
					// console.log(this.more,"more");
					this.plays = result.data;
				} else if (e == 1) {
					result.code == 200 ? this.morebooks = [...this.morebooks, ...result.data.list] : '';
					// this.more=e+20;
					// console.log(this.more,"more");
					 this.mores = result.data;
				} else {
					result.code == 200 ? this.needbooks = [...this.needbooks, ...result.data.list] : '';
					// this.more=e+20;
					// console.log(this.more,"more");
				 this.needs = result.data;
				}

			},
			// 销量
			async postsale(e) {
				let result = await requestPost("/goods/search", {
					"pageSize": 20,
					"keyWord": this.obj,
					"spuType": e,
					"pageNum": this.pageNum,
					"orderDesc": true,
					"orderByPublishTime": true
				});
				if (e == 3) {
					// this.more=e+30;
					// console.log(this.more,"more");
					result.code == 200 ? this.playbooks = [...this.playbooks, ...result.data.list] : '';
					 this.plays = result.data;
				} else if (e == 1) {
					result.code == 200 ? this.morebooks = [...this.morebooks, ...result.data.list] : '';
					// this.more=e+30;
					// console.log(this.more,"more");
					this.mores = result.data;
				} else {
					result.code == 200 ? this.needbooks = [...this.needbooks, ...result.data.list] : '';
					// this.more=e+30;
					// console.log(this.more,"more");
					this.needs = result.data;
				}
			},
			// 购物车
			async postBookTo(e) {
				// https://miniprogram.api.sisyphe.cn/gateway-api/mini-app-mobile-client/app/cart/v2/addCart
				let result = await tokenPost("/mini-app-mobile-client/app/cart/v2/addCart", {
					"cartRequest": [{
						"quantity": 1,
						"spuId": e.spuCode,
						"skuId": `${e.spuCode}001`
					}]
				})
				console.log(result,"dsdsdsdrnnnnnnnnnnnnndddddd")
				
				// result.code == 200 ? this.pricetop = [...this.pricetop, ...result.data.list] : ""
				// console.log(this.getlist);
			},
			// 发送购物车请求
			thecarts(e){
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
			checkIndex(index) {
				this.navIndex = index;
			},
			checkIndexa(index) {
				this.mIndex = index;
			},
			checkIndexb(index) {
				this.rIndex = index;
			},
			changef(e) {
				this.flag = !this.flag;
				if (e == 3) {
					this.playbooks = [];
					this.postprice(e)
				} else if (e == 1) {
					this.morebooks = [];
					this.postprice(e)
				} else {
					this.needbooks = [];
					this.postprice(e)
				}

			},
			change(e) {

				if (e == 3) {
					this.playbooks = [];
					this.postneed(e)
				} else if (e == 1) {
					this.morebooks = [];
					this.postneed(e)
				} else {
					this.needbooks = [];
					this.postneed(e)
				}

			},
			changes(e) {

				if (e == 3) {
					this.playbooks = [];
					this.postsale(e)
				} else if (e == 1) {
					this.morebooks = [];
					this.postsale(e)
				} else {
					this.needbooks = [];
					this.postsale(e)
				}

			},
			onClickItem(e) {
				if (this.current != e) {
					this.current = e;
					console.log(e, "sasasa");
					console.log(this.current, "current");
					// this.more = this.current;
					// console.log(this.more,'dwddsc');
				}
			},
			// 跳转书本详情页面
			ohmybook(e) {
				uni.navigateTo({
					url: `/pages/goods-detail/goods-detail?spuCode=${e}`
				})
			},
           tosearch(e){
           	uni.redirectTo({
           		url:`/pages/search/search?obj=${e}`,
           	})
           },

		},
		onPullDownRefresh() {
			this.pageNum = 1;
			if (this.current == 2) {
				this.playbooks = [];
				if (this.rIndex == 1) {
					this.postneed(3)
				} else if (this.rIndex == 2) {
					this.postprice(3)
				} else {
					this.postsale(3)
				}
			} else if (this.current == 1) {
				this.morebooks = [];
				if (this.mIndex == 1) {
					this.postneed(1)
				} else if (this.mIndex == 2) {
					this.postprice(1)
				} else {
					this.postsale(1)
				}
			} else {
				this.needbooks = [];
				if (this.navIndex == 1) {
					this.postneed(0)
				} else if (this.navIndex == 2) {
					this.postprice(0)
				} else {
					this.postsale(0)
				}
			}
			console.log('触发下拉刷新了');

		},
		onReachBottom() {
			this.pageNum++;
			if (this.current == 2) {
				if (this.rIndex == 1) {
					this.postneed(3)
				} else if (this.rIndex == 2) {
					this.postprice(3)
				} else {
					this.postsale(3)
				}
			} else if (this.current == 1) {
				if (this.mIndex == 1) {
					this.postneed(1)
				} else if (this.mIndex == 2) {
					this.postprice(1)
				} else {
					this.postsale(1)
				}
			} else {
				if (this.navIndex == 1) {
					this.postneed(0)
				} else if (this.navIndex == 2) {
					this.postprice(0)
				} else {
					this.postsale(0)
				}
			}

			// this.postbooks();
			console.log('触底了');
		},
		onLoad(options) {
			console.log(options.obj, "xxxxxxxxxxxxaaaxaa")
			this.obj = options.obj;
			console.log(this.obj, "bdujbeiufvbcehfbvceuicvbdhjnbvooooooobj");
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

<style lang="less" scoped>
	@import url("@/static/xzg/paihang/iconfont.css");
	.active {
		font-weight: 700;
		color: black !important;
		border-bottom: 6rpx solid seagreen;
	}
	.colorful{
		color: orange;
	}
		// 输入框
		.whitebg {
			background-color: #fff;
            position: fixed;
			width: 100%;
			padding: 30rpx 0 0rpx 0;
			display: flex;
			justify-content: center;
             z-index: 20;
			 height: 200rpx;
			.searchs {
				width: 90%;
				height: 70rpx;
				line-height: 70rpx;
				display: flex;
				justify-self: start;
				border-radius: 40rpx;
				// margin-left: 10%;
				background-color: whitesmoke;
				padding-left: 10rpx;

				.serchiocn {
					width: 40rpx;
					height: 60rpx;
					
				}

				.hotinputs {
					margin-top: 14rpx;
					margin-left: 10rpx;
					width: 100%;
				}

			}
		}
	.container {
		padding: 0 10rpx 0 10rpx;



		// 输入框有内容


		.topwrap {
			position: fixed;
			top: 100rpx;
			width: 99%;
			height: 100rpx;
			background-color: white;
            z-index: 20;
			.navraw {
				display: inline-block;
				text-align: center;
				width: 33%;
				height: 100rpx;
				line-height: 100rpx;
				color: gray;
				background-color: white;
			}
		}

		.content {
			// margin: 0 40rpx 40rpx 40rpx;
			padding-top: 326rpx;

			.head-nav {
				position: fixed;
				background-color: #fff;
				top: 202rpx;
				width: 100%;
				height: 60rpx;
				display: flex;
				margin: 0;
				padding-top: 40rpx;
				padding-bottom: 20rpx;
				z-index: 20;
				.activite {
					color: orange;
				}

				.moren {
					margin-left: 50rpx;
					// color: orange;
				}

				.price {
					margin-left: 180rpx;
				}

				.seller {
					margin-left: 180rpx;
				}
			}

			.rongqi {
				padding-left: 20rpx;
				padding-right: 20rpx;
				.hotbox {
					// margin-top: 120rpx;
					display: flex;
					margin-bottom: 40rpx;
					// border: 1px solid gray;
					background-color: #fff;
					border-radius: 12rpx;
					padding: 20rpx;

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

						.cart {
							width: 60rpx;
							height: 60rpx;
							position: absolute;
							bottom: 10rpx;
							right: 10rpx;
						}

					}

				}
			}

		}

	}
</style>
