<template>
	<view class="container">
		<view class="hotsearch">
			<view v-for="(item,index) in booklist" :key="item.authorName" class="wbook">
				<view class="hotbox" v-for="(list,idx) in item" :key="list.isbn">
					<view class="idxs">
						<view class="topidx">
							<!-- {{this.booklist}} -->
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
				pages:""
			}
		},
		created() {
			this.postbooks();
		},
		methods: {
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

		},
		computed: {
			myidx: function() {
				return this.indexnum * 10

			}
		},
		// onPullDownRefresh() {
		// 	this.postbooks();
		// 	console.log('触发下拉刷新了')
		// },
		onReachBottom() {
			if (!this.isLastPage) {
				this.pagenum++;
				this.indexnum++;
				this.postbooks();
				console.log('触底了');
			}

		}

	}
</script>

<style lang="less">
	.container {
		padding: 20rpx;
		background-color: white;

		.wbook {

			// display: flex;
			// justify-content: flex-start;
			// margin-bottom: 60rpx;
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
