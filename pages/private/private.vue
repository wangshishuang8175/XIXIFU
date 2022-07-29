<!-- 引用组件顶部 -->
<template>
	<view class="container">
		<!-- 刚进入页面时候顶部的状态 -->
		<scroll-view class="swiper-nav" scroll-x="true">
			<view :class="['item',{active:currentIndex==idx}]" v-for="(item,idx) in topbar" :key="item.code"
				@click="clicktab(item.code),currentchange(idx)">
				<!-- {{item.name}}--{{item.code}} -->
				{{item.name}}
			</view>
		</scroll-view>


		<view class="head-nav">
			<view class="moren" :class="navIndex==1?'activite':''" @click="checkIndex(1),clickCode(this.navCode)">默认</view>
			<view class="price" :class="navIndex==5?'activite':''"  @click="checkIndex(5),clickTop()">价格</view>
			<image class="top" src="/static/icon/上三角.png" :class="navIndex==5?'activite':''" @click="checkIndex(5),clickTop()">
			</image>
			<image class="bottom" src="/static/icon/下三角.png" :class="navIndex==3?'activite':''" @click="checkIndex(3),clickBottom()">
			</image>
			<view class="seller" :class="navIndex==4?'activite':''" @click="checkIndex(4),clickSeller()">销量 </view>
		</view>
		<!-- -------默认----- -->
		<view class="content" v-for="item in codeone" :key="item.spuName" v-if="navIndex==1">
			<view class="left">
				<image :src="item.appImgUrl" mode=""></image>
			</view>
			<view class="mid">
				<view class="spuName">{{item.spuName}}</view>
				<view class="authorName">{{item.authorName}}</view>
				<view class="pressName">{{item.pressName}}</view>
				<view class="salePrice">￥{{item.salePrice}}</view>
			</view>
			<view class="right">
				<image class="cart" src="/static/gouwuche.png" mode="" @click="cartTab"></image>
			</view>
		</view>
		<!-- -------价格----- -->
<!-- 		<view class="content" v-for="item in price" :key="item.spuName" v-if="navIndex==2">
			<view class="left">
				<image :src="item.appImgUrl" mode=""></image>
			</view>
			<view class="mid">
				<view class="spuName">{{item.spuName}}</view>
				<view class="authorName">{{item.authorName}}</view>
				<view class="pressName">{{item.pressName}}</view>
				<view class="salePrice">￥{{item.salePrice}}</view>
			</view>
			<view class="right">
				<image class="cart" src="/static/gouwuche.png" mode="" @click="cartTab"></image>
			</view>
		</view> -->
		<!-- ------正序价格--------- -->
		<view class="content" v-for="item in pricetop" :key="item.spuName" v-if="navIndex==5">
			<view class="left">
				<image :src="item.appImgUrl" mode=""></image>
			</view>
			<view class="mid">
				<view class="spuName">{{item.spuName}}</view>
				<view class="authorName">{{item.authorName}}</view>
				<view class="pressName">{{item.pressName}}</view>
				<view class="salePrice">￥{{item.salePrice}}</view>
			</view>
			<view class="right">
				<image class="cart" src="/static/gouwuche.png" mode="" @click="cartTab"></image>
			</view>
		</view>

		<!-- ----------------逆序价格----------------- -->
		<view class="content" v-for="item in pricebottom" :key="item.spuName" v-if="navIndex==3">
			<view class="left">
				<image :src="item.appImgUrl" mode=""></image>
			</view>
			<view class="mid">
				<view class="spuName">{{item.spuName}}</view>
				<view class="authorName">{{item.authorName}}</view>
				<view class="pressName">{{item.pressName}}</view>
				<view class="salePrice">￥{{item.salePrice}}</view>
			</view>
			<view class="right">
				<image class="cart" src="/static/gouwuche.png" mode="" @click="cartTab"></image>
			</view>
		</view>
		<!-- ------销量--------- -->
		<view class="content" v-for="item in seller" :key="item.spuName" v-if="navIndex==4">
			<view class="left">
				<image :src="item.appImgUrl" mode=""></image>
			</view>
			<view class="mid">
				<view class="spuName">{{item.spuName}}</view>
				<view class="authorName">{{item.authorName}}</view>
				<view class="pressName">{{item.pressName}}</view>
				<view class="salePrice">￥{{item.salePrice}}</view>
			</view>
			<view class="right">
				<image class="cart" src="/static/gouwuche.png" mode="" @click="cartTab"></image>
			</view>
		</view>
		<uni-load-more v-if="hasMore" status="loading"></uni-load-more>
		<uni-load-more v-else status="noMore"></uni-load-more>
	</view>

</template>
<script>
	import {
		requestPost
	} from '@/common/js/http.js';
	export default {
		components: {},
		data() {
			return {
				topbar: [],
				// 第一个显示的active
				currentIndex: 0,
				// 组件的
				// value: ['0'],
				// accordionVal: '1',

				codeone: [],
				price: [],
				pageNum: 1,
				seller: [],
				pricebottom: [],
				pricetop: [],
				navIndex: 1,
				hasMore: true,
				navCode: "",
				obj:0,
				title:0
			}
		},
		mounted() {
			this.gettopbar(),
			this.getCode()

				// this.getPrice(),
				// this.getSeller(),
				// this.getPriceBottom(),
				// this.getPriceTop()
		},
		onLoad(options) {
			console.log(options.obj, "xxxxxxxxxxxxaaaxaa")
			this.obj = options.obj;
			this.title=options.title;
			console.log(this.obj, "bdujbeiufvbcehfbvceuicvbdhjnbvooooooobj");
		},
		methods: {
			
			// ---------------------------顶部-------------------------
			async gettopbar() {
				//label/getAppLabelTag
				let result = await requestPost("/label/getAppLabelTag", {
					"type": this.title
				})
				result.code == 200 ? this.topbar = result.data : "",
					this.topbar.unshift({
						tagType: this.title,
						code: '',
						name: "全部",
						
					})
				console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", this.topbar);
			},

             clicktab(e){
				 this.codeone = [];
				this.getCode(e);
			},
			// ---------------------用到的组件--------------------
			add() {
				if (this.content.length > 35) {
					this.content = ' '
				} else {
					this.content = ''
				}
				// TODO 小程序中不支持自动更新 ，需要手动resize 更新组件高度
				// #ifdef MP
				this.$nextTick(() => {
					this.$refs.collapse.resize()
				})
				// #endif
			},
			onClick(e) {
				uni.showToast({
					title: '列表被点击'
				})
			},
			change(e) {
				console.log(e);
			},
			// ---------------把code方法带过来----------------------
			clickCode(e){
				this.codeone = [];
				this.getCode(e)
			},
			async getCode(e) {
				this.navCode = e;
				let result = await requestPost("/label/queryAppLabelList", {
					"frontCategoryCode": e,
					"orderDesc": false,
					"pageNum": 1,
					"pageSize": 10,
					"type": this.obj

				})
				console.log(e,"wbibdwbwucchgcyucyyyyyyyyyyyyyyyyyyyyyuygcgyxucgd");
				console.log(result);
				this.navIndex = 1;
				result.code == 200 ? this.codeone = [...this.codeone, ...result.data.list] : "",
				console.log(this.navIndex,this.navCode,"dbwjwdwvhvvvvvvvvvvvCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC");
					console.log(this.codeone, "~~~~~~~~~~~~sdwyfdvwdvudhwvdhw xbbbbbcbwccwdwud~");
			},

			// --------------销量--------------------
			clickSeller(){
				 this.seller=[];
				 this.getSeller()
			},
			async getSeller() {       
				 console.log(this.navCode,"dgdsdsdshgdhsgdsdghsdg现在广西贵州广西贵州西藏广西贵州广西");
				let result = await requestPost("/label/queryAppLabelList", {
					"pageNum": this.pageNum,
					"orderDesc": false,
					// "pageNum": 1,
					"pageSize": 10,
					"type": this.obj,
					"frontCategoryCode":this.navCode,
					"orderBySoldVolume": true
				})
				console.log(result)
				result.code == 200 ? this.seller = [...this.seller, ...result.data.list] : ""
				console.log(this.seller, "销量销量");

			},
			// -------------价格+--------------				
			clickBottom(){
				this.pricebottom=[];
				this.getPriceBottom()
			},
			async getPriceBottom() {			
				let result = await requestPost("/label/queryAppLabelList", {
					"pageNum": this.pageNum,
					"orderDesc": true,
					// "pageNum": 1,
					"pageSize": 10,
					"type": this.obj,
					"frontCategoryCode":this.navCode,
					"orderByPrice": true
				})
				console.log(result,"价格价格价格上上啊还是个")
				result.code == 200 ? this.pricebottom = [...this.pricebottom, ...result.data.list] : ""
				console.log(this.pricebottom, "价格+");

			},
			// -----------------  价格-  -----------------------
			clickTop(){
				this.pricetop=[];
				this.getPriceTop()
			},
			async getPriceTop() {			
				let result = await requestPost("/label/queryAppLabelList", {
					"pageNum": this.pageNum,
					"orderDesc": false,
					// "pageNum": 1,
					"pageSize": 10,
					"type": this.obj,
					"frontCategoryCode":this.navCode,
					"orderByPrice": true
				})
				console.log(result,'加上个加分价格家恶搞价格价格下辖喜爱喜爱下')
				result.code == 200 ? this.pricetop = [...this.pricetop, ...result.data.list] : ""
				// console.log(this.getlist);
				console.log(this.pricetop, "价格-");
			},
			cartTab() {
				uni.navigateTo({
					url: '/pages/welcome/welcome',

				});
			},

			checkIndex(index) {
				this.navIndex = index;

			},
			// 切换上方小圆圈
			currentchange(e){
				console.log(e,'我滨化了帮我编花篮');
				this.currentIndex=e;
			},

		},

		//上拉加载
		onReachBottom() {
				this.pageNum++;
				if (this.navIndex==1) {
					this.getCode(this.navCode)
				} else if(this.navIndex==5){
					this.getPriceTop(this.navCode)
				}else if(this.navIndex==3){
						this.getPriceBottom(this.navCode)
				}else if(this.navIndex==4){
					this.getSeller(this.navCode)
				}
			// 	this.getPrice(),
			// 		this.getSeller(),
			// 	this.getPriceBottom()
	
			
		},
		//下拉刷新
		onPullDownRefresh() {
			// this.category = [];
			this.pageNum = 1;
			// this.hasMore = true;
			if (this.navIndex==1) {
				this.getCode(this.navCode)
			} else if(this.navIndex==5){
				this.getPriceTop(this.navCode)
			}else if(this.navIndex==3){
					this.getPriceBottom(this.navCode)
			}else if(this.navIndex==4){
				this.getSeller(this.navCode)
			}
			this.getCategory().then(() => {
				uni.stopPullDownRefresh();
			});

		}

	}
</script>
<style scoped lang="less">
	.container {
		width: 400px;
		height: 200px;
		position: relative;

		.swiper-nav {
			width: 320px;
			height: 72rpx;
			// background-color: red;
			display: flex;
			// flex-direction: column;
			// justify-content: space-around;
			white-space: nowrap;
			padding: 30rpx 60rpx 30rpx 40rpx;
			// 
			float: relative;

			.item {
				// flex: 1;
				display: inline-block;
				background-color: #eeee;
				text-align: center;
				margin: 10rpx 14rpx;
				padding: 9rpx 10rpx;
				border-radius: 28rpx;
				// border: 1px solid;

				&.active {
					border: 1rpx solid;
					border-color: darkgreen;
					color: darkgreen;
					background-color: #e7eae4;
					// background-color: green;
				}
			}
		}

		// 折叠展开
		.show {
			position: absolute;
			float: right;
			color: darkgreen;
			display: inline-block;
			width: 60px;
			height: 30px;
			background-color: pink;
			position: absolute;
			right: 0;
			top: 0;
			z-index: 100;
			margin-top: 25px;
			margin-right: 7px;


			.showup {
				font-size: 25rpx;
			}

			.showon {
				font-size: 25rpx;
			}
		}

		// 展开后
		.swiper-nav2 {
			width: 320px;
			height: 220rpx;
			// background-color: red;
			display: flex;
			padding: 30rpx 60rpx 30rpx 40rpx;
			background-color: red;
			// 
			float: relative;

			.item2 {
				// flex: 1;
				display: inline-block;
				background-color: lightgray;
				text-align: center;
				margin: 10rpx 14rpx;
				padding: 9rpx 10rpx;
				border-radius: 28rpx;

			}

			//组件样式
			.mybox-leave-active,
			.mybox-enter-active {
				transition: all 1s ease;
			}

			.mybox-leave-active,
			.mybox-enter {
				height: 0px !important;
			}

			.mybox-leave,
			.mybox-enter-active {
				height: auto;
			}
		}

		.example-body {
			flex-direction: column;
			flex: 1;
		}

		.content {
			
		}

		.text {
			font-size: 14px;
			color: #666;
			line-height: 20px;
		}

		.button {
			margin: 10px;
			margin-bottom: 0;
		}


		.head-nav {
			margin: 0 0px 0 30px;
			display: flex;
			color: gray;

			.activite {
				color: goldenrod;
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
			}

			.price {
				margin: 0 15px 0 85px;
			}

			.seller {
				margin: 0 30px 0px 50px;
			}

		}

		.content {
			width: 350px;
			height: 170px;
			// border: 1px solid lightgray;
			border-radius: 5px;
			margin: 20px 6px 20px 10px;
			display: flex;
			background-color: white;

			.left {
				flex: 1;

				image {
					margin-left: 8px;
					margin-top: 14px;
					width: 100px;
					height: 150px;
					border-radius: 10px;
				}
			}

			.mid {
				flex: 3;
				margin-top: 13px;
				margin-left: 14px;

				.salePrice {
					color: #be0000;
					font-weight: 800;
					margin-top: 55px;
					font-size: 28rpx;

				}

				.spuName {
					font-weight: 700;
					font-size: 28rpx;

				}

				.authorName {
					color: gray;
					margin-top: 5px;
					font-size: 26rpx;
					margin-bottom: 6rpx;

				}

				.pressName {
					color: gray;
					font-size: 26rpx;
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
