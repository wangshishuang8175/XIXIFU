<template>
	<view class="container">
		<view class="image1">
			<rich-text class="totalname1">西 西 弗</rich-text>
			<text class="totalname2">畅 销 排 行 榜</text>
			<text>
				<text class="totalname3">
					<text class="totalname3-1">西 西 弗 书 友 们 的 共 同 选 择 . 每 日 更 新</text>
				</text>
			</text>
		</view>
		<view class="goods">
			<!-- .“分类” -->
			<!-- 		<view class="list">
				<view v-for="item in getcategorylist" :key="item.categoryCode">
					<view class="name">{{item.categoryName}}</view>
				</view> -->

			<!-- 1.畅 -->
			<view class="list" @click="ti()">
				<view class="text1">
					<text class="list-title">销售总榜</text>
					<text class="quanbu"> 全部 ></text>
				</view>
				<view class='item' v-for="item in floorList" :key="item.spuCode">
					<view class="list-item">
						<!-- 渲染图片 -->
						<image :src="item.appImgUrl"></image>
						<!-- 渲染书名 -->
						<view class="name">{{item.appShowName}}</view>
					</view>
				</view>
			</view>
			<!-- 2.文 -->
			<view class="list" @click="ti()">
				<view class="text1">
					<text class="list-title">文学榜</text>
					<text class="quanbu"> 全部 ></text>
				</view>
				<view class='item' v-for="item in floorList2" :key="item.spuCode">
					<view class="list-item">
						<!-- 渲染图片 -->
						<image :src="item.appImgUrl"></image>
						<!-- 渲染书名 -->
						<view class="name">{{item.appShowName}}</view>
					</view>
				</view>
			</view>
			<!-- 3.儿 -->
			<view class="list" @click="ti()">
				<view class="text1">
					<text class="list-title">少儿榜</text>
					<text class="quanbu"> 全部 ></text>
				</view>
				<view class='item' v-for="item in floorList3" :key="item.spuCode">
					<view class="list-item">
						<!-- 渲染图片 -->
						<image :src="item.appImgUrl"></image>
						<!-- 渲染书名 -->
						<view class="name">{{item.appShowName}}</view>
					</view>
				</view>
			</view>
			<!--4.心-->
			<view class="list" @click="ti()">
				<view class="text1">
					<text class="list-title">心理心灵榜</text>
					<text class="quanbu"> 全部 ></text>
				</view>
				<view class='item' v-for="item in floorList4" :key="item.spuCode">
					<view class="list-item">
						<!-- 渲染图片 -->
						<image :src="item.appImgUrl"></image>
						<!-- 渲染书名 -->
						<view class="name">{{item.appShowName}}</view>
					</view>
				</view>
			</view>
			<!-- 5 -->
			<view class="list" @click="ti()">
				<view class="text1">
					<text class="list-title">社科榜</text>
					<text class="quanbu"> 全部 ></text>
				</view>
				<view class='item' v-for="item in floorList5" :key="item.spuCode">
					<view class="list-item">
						<!-- 渲染图片 -->
						<image :src="item.appImgUrl"></image>
						<!-- 渲染书名 -->
						<view class="name">{{item.appShowName}}</view>
					</view>
				</view>
			</view>
			<!-- 6 -->
			<view class="list" @click="ti()">
				<view class="text1">
					<text class="list-title">经济管理榜</text>
					<text class="quanbu">全部 ></text>
				</view>
				<view class='item' v-for="item in floorList6" :key="item.spuCode">
					<view class="list-item">
						<!-- 渲染图片 -->
						<image :src="item.appImgUrl"></image>
						<!-- 渲染书名 -->
						<view class="name">{{item.appShowName}}</view>
					</view>
				</view>
			</view>
			<!-- 7 -->
			<view class="list" @click="ti()">
				<view class="text1">
					<text class="list-title">生活榜</text>
					<text class="quanbu"> 全部 ></text>
				</view>
				<view class='item' v-for="item in floorList7" :key="item.spuCode">
					<view class="list-item">
						<!-- 渲染图片 -->
						<image :src="item.appImgUrl"></image>
						<!-- 渲染书名 -->
						<view class="name">{{item.appShowName}}</view>
					</view>
				</view>
			</view>
			<!-- 8 -->
			<view class="list" @click="ti()">
				<view class="text1">
					<text class="list-title">艺术榜单</text>
					<text class="quanbu"> 全部 ></text>
				</view>
				<view class='item' v-for="item in floorList8" :key="item.spuCode">
					<view class="list-item">
						<!-- 渲染图片 -->
						<image :src="item.appImgUrl"></image>
						<!-- 渲染书名 -->
						<view class="name">{{item.appShowName}}</view>
					</view>
				</view>
			</view>
			<!-- 9 -->
			<view class="list" @click="ti()">
				<view class="text1">
					<text class="list-title">设计榜</text>
					<text class="quanbu"> 全部 ></text>
				</view>
				<view class='item' v-for="item in floorList9" :key="item.spuCode">
					<view class="list-item">
						<!-- 渲染图片 -->
						<image :src="item.appImgUrl"></image>
						<!-- 渲染书名 -->
						<view class="name">{{item.appShowName}}</view>
					</view>
				</view>
			</view>
			<!-- 10 -->
			<view class="list" @click="ti()">
				<view class="text1">
					<text class="list-title">科技榜</text>
					<text class="quanbu"> 全部 ></text>
				</view>
				<view class='item' v-for="item in floorList10" :key="item.spuCode">
					<view class="list-item">
						<!-- 渲染图片 -->
						<image :src="item.appImgUrl"></image>
						<!-- 渲染书名 -->
						<view class="name">{{item.appShowName}}</view>
					</view>
				</view>
			</view>
			<!-- 11 -->
			<view class="list" @click="ti()">
				<view class="text1">
					<text class="list-title">文创榜</text>
					<text class="quanbu"> 全部 ></text>
				</view>
				<view class='item' v-for="item in floorList11" :key="item.spuCode">
					<view class="list-item">
						<!-- 渲染图片 -->
						<image :src="item.appImgUrl"></image>
						<!-- 渲染书名 -->
						<view class="name">{{item.appShowName}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		requestGet,
		requestPost
	} from '@/common/js/http.js';
	export default {
		data() {
			return {
				floorList: [],
				floorList2: [],
				floorList3: [],
				floorList4: [],
				floorList5: [],
				floorList6: [],
				floorList7: [],
				floorList8: [],
				floorList9: [],
				floorList10: [],
				floorList11: [],
			}
		},
		created() {
			this.getfloorList(),
				this.getfloorList2(),
				this.getfloorList3(),
				this.getfloorList4(),
				this.getfloorList5(),
				this.getfloorList6(),
				this.getfloorList7(),
				this.getfloorList8(),
				this.getfloorList9(),
				this.getfloorList10(),
				this.getfloorList11()
		},
		methods: {
			// ti()
				
			ti(){
				uni.navigateTo({
					url:"/pages/booksrank/booksrank"
				})
			},
			async getfloorList() {
				//1.畅销总榜    goods/queryRankingList
				let result = await requestPost("/goods/queryRankingList", {
					"pageNum": 1,
					"pageSize": 4,
					"type": 4,
					"categoryCode": "BR"
				});
				//渲染的时候data根据接口信息填写写
				result.code == 200 ? this.floorList = result.data.list : "",
					console.log(this.floorList, "15551");
			},
			//2.文
			async getfloorList2() {
				//goods/categorylist
				let result = await requestPost("/goods/queryRankingList", {
					"pageNum": 1,
					"pageSize": 4,
					"type": 4,
					"categoryCode": "A2"
				})
				result.code == 200 ? this.floorList2 = result.data.list : "",
					console.log(this.floorList2, "22222");
			},
			//3.儿
			async getfloorList3() {
				//goods/categorylist
				let result = await requestPost("/goods/queryRankingList", {
					"pageNum": 1,
					"pageSize": 4,
					"type": 4,
					"categoryCode": "A1"
				})
				result.code == 200 ? this.floorList3 = result.data.list : "",
					console.log(this.floorList3, "3333333");
			},
			//4.心
			async getfloorList4() {
				//goods/categorylist
				let result = await requestPost("/goods/queryRankingList", {
					"pageNum": 1,
					"pageSize": 4,
					"type": 4,
					"categoryCode": "A9"
				})
				result.code == 200 ? this.floorList4 = result.data.list : "",
					console.log(this.floorList4, "3333333");
			},
			//5.社
			async getfloorList5() {
				//goods/categorylist
				let result = await requestPost("/goods/queryRankingList", {
					"pageNum": 1,
					"pageSize": 4,
					"type": 4,
					"categoryCode": "A6"
				})
				result.code == 200 ? this.floorList5 = result.data.list : "",
					console.log(this.floorList5, "3333333");
			},
			//6.经
			async getfloorList6() {
				//goods/categorylist
				let result = await requestPost("/goods/queryRankingList", {
					"pageNum": 1,
					"pageSize": 4,
					"type": 4,
					"categoryCode": "A8"
				})
				result.code == 200 ? this.floorList6 = result.data.list : "",
					console.log(this.floorList6, "3333333");
			},
			//7.生活
			async getfloorList7() {
				//goods/categorylist
				let result = await requestPost("/goods/queryRankingList", {
						"pageNum": 1,
						"pageSize": 4,
						"type": 4,
						"categoryCode": "A3"
					}

				)
				result.code == 200 ? this.floorList7 = result.data.list : "",
					console.log(this.floorList7, "3333333");
			},
			//8.艺术
			async getfloorList8() {
				//goods/categorylist
				let result = await requestPost("/goods/queryRankingList", {
						"pageNum": 1,
						"pageSize": 4,
						"type": 4,
						"categoryCode": "A4"
					}

				)
				result.code == 200 ? this.floorList8 = result.data.list : "",
					console.log(this.floorList8, "3333333");
			},
			//9.设计
			async getfloorList9() {
				//goods/categorylist
				let result = await requestPost("/goods/queryRankingList", {
						"pageNum": 1,
						"pageSize": 4,
						"type": 4,
						"categoryCode": "A5"
					}

				)
				result.code == 200 ? this.floorList9 = result.data.list : "",
					console.log(this.floorList9, "3333333");
			},
			//10.科技
			async getfloorList10() {
				//goods/categorylist
				let result = await requestPost("/goods/queryRankingList", {
						"pageNum": 1,
						"pageSize": 4,
						"type": 4,
						"categoryCode": "A7"
					}

				)
				result.code == 200 ? this.floorList10 = result.data.list : "",
					console.log(this.floorList10, "3333333");
			},
			//11.文创
			async getfloorList11() {
				//goods/categorylist
				let result = await requestPost("/goods/queryRankingList", {
						"pageSize": 10,
						"pageNum": 1,
						"type": 4,
						"categoryCode": "BR"
					}

				)
				result.code == 200 ? this.floorList11 = result.data.list : "",
					console.log(this.floorList11, "3333333");
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		// position: relative;

		.image1 {
			background-color: #532e25;
			opacity: 0.8;
			width: 100%;
			height: 250rpx;
			// position: absolute;

			.totalname1 {
				display: block;
				height: 60rpx;
				margin-left: 40%;
				color: white;
				font-size: 26rpx;
				;

			}

			.totalname2 {
				display: block;
				height: 60rpx;
				margin-left: 30%;
				font-size: 40rpx;
				font-weight: 600;
				color: goldenrod;
			}

			.totalname3 {
				display: block;
				margin-left: 14%;
				color: white;
				font-size: 26rpx;
				padding-top: 20rpx
			}
		}

		.goods {
			.list {
				width: 340px;
				height: 160px;
				background-color: white;
				margin: 20px 15px;
				border-radius: 30rpx;
				overflow: hidden;
				padding: 15rpx;
				// position: absolute;
				// top:20px;

				.list-title {
					.text1 {
						margin-left: 47rpx;

						.quanbu {
							float: right;
							color: dimgrey;
						}
					}
				}

				.item {
					width: 60px;
					height: 130px;
					float: left;
					margin-top: 20rpx;
					margin-left: 40rpx;

					.list-item {
						image {
							width: 60px;
							height: 100px;
							background-size: 30% 30%;
							border-radius: 14rpx;
						}

						.name {
							font-size: 24rpx;
							color: dimgrey;
							//超出范围隐藏
							display: -webkit-box;
							overflow: hidden;
							text-overflow: ellipsis;
							word-wrap: break-word;
							white-space: normal !important;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
						}
					}
				}
			}
		}
	}

	// 	.goods {
	// 		background-color: #dadada;

	// 		.list {
	// 			background-color: red;
	// 			display: flex;
	// 			flex-direction: row;
	// 			padding: 50rpx;
	// 			height:200rpx;
	// 			.item {
	// 				width: 20%;
	// 				padding: 10rpx;
	// 				box-sizing: border-box;
	// 				background-color: aquamarine;
	// 			}
	// 			.list-item{
	// 				width: 100%;
	// 				padding: 10rpx;
	// 				box-sizing: border-box;
	// 				background-color: aquamarine;
	// 			}

	// 			image {
	// 				height: 150rpx;
	// 				width: 100rpx;
	// 				margin: 4rpx auto;
	// 			}

	// 			// .data {
	// 			// 	width: 355rpx;
	// 			// 	margin-bottom: 15rpx;
	// 			// 	background: green;
	// 			// 	padding: 10px;
	// 			// 	box-sizing: border-box;


	// 			}
	// 		}
	// 	}
	// }
</style>
