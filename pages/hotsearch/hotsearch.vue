<template>
	<view class="container">
		<view class="hotsearch">
			<view v-for="(item,index) in booklist" :key="item.authorName" class="wbook">
				<!-- 第一名 -->
				<!-- v-if内部不能进行数学计算之后来判断 -->
				<view class="whyhot" v-if="index==0">
					<view class="hotboss" v-for="(list,idx) in item" :key="list.isbn" @click="ohmybook(item.spuCode)">
						<view class="sohot" v-if="idx==0">
							<view class="idxs">
								<view class="topidx" >
									<text class="iconfont icon-first"></text>
								</view>
							</view>
							<image :src="list.appImgUrl" class="bookimg" mode="aspectFill"></image>
							<view class="allname">
								<view class="bookname">{{list.frontDisplayName}}</view>
								<view class="authorName">{{list.authorName}}</view>
								<view class="pressName">{{list.pressName}}</view>
								<text class="salePrice">￥{{list.salePrice}}</text>
								<image class="cart" src="/static/gouwuche.png" mode="" @click="carts"></image>
							</view>
						</view>
						<!-- 第二 -->
					<view class="sohot" v-else-if="idx==1">
						<view class="idxs">
							<view class="topidx" >
							<text class="iconfont icon-second"></text>
							</view>
						</view>
						<image :src="list.appImgUrl" class="bookimg" mode="aspectFill"></image>
						<view class="allname">
							<view class="bookname">{{list.frontDisplayName}}</view>
							<view class="authorName">{{list.authorName}}</view>
							<view class="pressName">{{list.pressName}}</view>
							<text class="salePrice">￥{{list.salePrice}}</text>
							<image class="cart" src="/static/gouwuche.png" mode="" @click="carts"></image>
						</view>
					</view>
					<!-- 第三 -->
					<view class="sohot" v-else-if="idx==2">
						<view class="idxs">
							<view class="topidx" >
							<text class="iconfont icon-third"></text>
							</view>
						</view>
						<image :src="list.appImgUrl" class="bookimg" mode="aspectFill"></image>
						<view class="allname">
							<view class="bookname">{{list.frontDisplayName}}</view>
							<view class="authorName">{{list.authorName}}</view>
							<view class="pressName">{{list.pressName}}</view>
							<text class="salePrice">￥{{list.salePrice}}</text>
							<image class="cart" src="/static/gouwuche.png" mode="" @click="carts"></image>
						</view>
					</view>
					<!-- 四至十 -->
					<view class="sohot" v-else>
						<view class="idxs">
							<view class="topidx" >
								{{++idx+index*10}}
							</view>
						</view>
						<image :src="list.appImgUrl" class="bookimg" mode="aspectFill"></image>
						<view class="allname">
							<view class="bookname">{{list.frontDisplayName}}</view>
							<view class="authorName">{{list.authorName}}</view>
							<view class="pressName">{{list.pressName}}</view>
							<text class="salePrice">￥{{list.salePrice}}</text>
							<image class="cart" src="/static/gouwuche.png" mode="" @click="carts"></image>
						</view>
					</view>
					</view>
				</view>
				<!-- 第二序列 -->
				<view class="whyhot" v-else>
					<view class="hotbox" v-for="(list,idx) in item" :key="list.isbn" @click="ohmybook(item.spuCode)">
						<view class="idxs">
							<view class="topidx" >
								{{++idx+index*10}}
							</view>
						</view>
						<image :src="list.appImgUrl" class="bookimg" mode="aspectFill"></image>
						<view class="allname">
							<view class="bookname">{{list.frontDisplayName}}</view>
							<view class="authorName">{{list.authorName}}</view>
							<view class="pressName">{{list.pressName}}</view>
							<text class="salePrice">￥{{list.salePrice}}</text>
							<image class="cart" src="/static/gouwuche.png" mode="" @click="carts"></image>
						</view>
					</view>
				</view>
			
			</view>
			<uni-load-more v-if="hasMore" status="loading"></uni-load-more>
			<uni-load-more v-else status="noMore"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import {
		requestPost
	} from '@/common/js/http.js';
	export default {
		data() {
			return {
				booklist: [],
				pagenum: 1,
				isLastPage: false,
				indexnum: 0,
				pages:"",
				hasMore:true,
			}
		},
		created() {
			this.postbooks();
		},
		methods: {
			// 热门搜索点进去
			async postbooks() {
				let result = await requestPost("/goods/toprecommendV1", {
					"pageNum": this.pagenum,
					"pageSize": 10
				});
				// result.code == 200 ? this.booklist=result.data.list: "",
				// this.booklist=books.push(this.booklist)
				// console.log(this.booklist, "hot");
				if (result.code == 200 && result.data.hasNextPage) {
					this.isLastPage = result.data.isLastPage;
					this.pages=result.data.pageNum
					this.booklist.push(result.data.list);
					// this.booklist=result.data.list;
					console.log(this.booklist, "hot");
				}
			},
			ohmybook(e){
				uni.navigateTo({
					url:`/pages/goods-detail/goods-detail?spuCode=${e}`
				})
			}

		},
		// computed: {
		// 	myidx: function() {
		// 		return this.indexnum * 10

		// 	}
		// },
		// onPullDownRefresh() {
		// 	this.postbooks();
		// 	console.log('触发下拉刷新了')
		// },
		onPullDownRefresh() {
			this.booklist = [];
			this.pagenum = 1;
			this.hasMore = true;
			console.log('触发下拉刷新了');
			this.postbooks().then(() => {
				uni.stopPullDownRefresh();
			});
		
		},
		onReachBottom() {
			if (!this.isLastPage) {
			this.pagenum++;
				this.postbooks();
				console.log('触底了');
			}

		}

	}
</script>

<style lang="less">
		@import url("@/static/xzg/paihang/iconfont.css");
	.container {
		padding: 20rpx;
		background-color: white;

		.wbook {

			// display: flex;
			// justify-content: flex-start;
			// margin-bottom: 60rpx;
			.hotboss {
			.sohot{
				flex: 5;
				display: flex;
				margin-bottom: 40rpx;
				.idxs {
					flex: 1;
					position: relative;
							
					.topidx {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-60%, -50%);
						width: 70rpx;
						height: 70rpx;
					border-radius: 70rpx;
						text-align: center;
						line-height: 70rpx;
						font-size: 26rpx;
						color: #006400;
						border: 1px solid #006400;
					}
				}
				// 
				.bookimg {
					flex: 2;
					width: 250rpx;
					height: 300rpx;
					border-radius: 8rpx;
				}
				// 
				
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
			
			.hotbox {
				flex: 5;
				display: flex;
				margin-bottom: 40rpx;

				.idxs {
					flex: 1;
					position: relative;

					.topidx {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-60%, -50%);
						width: 70rpx;
						height: 70rpx;
			 		border-radius: 70rpx;
						text-align: center;
						line-height: 70rpx;
						font-size: 26rpx;
						color: #006400;
						border: 1px solid #006400;
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
</style>
