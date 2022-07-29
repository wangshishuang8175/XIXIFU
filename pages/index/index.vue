<template>
	<view class="index">
		<view
			:class="`title ${categoryCode==``?``:`active`} ${gradienNum == 1?`gradien`:``} ${gradienNum > 0.6?`gradien2`:``}`"
			:style="`${categoryCode==``?`background:linear-gradient(${colourBlend(bgColor,`#ffffff`, gradienNum*gradienNum*gradienNum)},${colourBlend(bgColor,`#ffffff`, gradienNum*gradienNum)},${colourBlend(bgColor,`#ffffff`, gradienNum)});`:``}`">
			<text>西西弗书店官方商城</text>
			<input class="search iconfont icon-sousuo" @focus="goSreach()" type="text" :placeholder="`搜索`"
				:placeholder-style="`${categoryCode==``&&gradienNum<0.6?`color:rgba(255,255,255,0.5);`:`color:rgba(0,0,0,0.3)`}`">
			<view class="scroll">
				<scroll-view scroll-x="true" class="categoryList">
					<view :class="`category ${categoryCode==``?`active`:``}`" @click="goCategory(null)">精选</view>
					<view :class="`category  ${(index===this.index)?`active`:``}`" v-for="(item,index) in categoryList"
						:key="item.categoryCode" @click="goCategory(index,item.categoryCode)">
						{{item.categoryName}}
					</view>
				</scroll-view>
				<icon class="iconfont icon-fenlei" @click="allClassfiy()"></icon>
			</view>
			<view class="tap" v-if="categoryCode!=``">
				<view class="tap1" @click="show=!show;">
					{{categoryName}}
				</view>
				<view class="tap2">
					<view :class="`item ${orderBySoldVolume?``:`active`}`"
						@click="goCategory(index,code2,false);show=false;">默认</view>
					<view :class="`item ${orderBySoldVolume?`active`:``}`"
						@click="goCategory(index,code2,true);show=false;">
						销量</view>
				</view>
			</view>
			<view :class="`select ${show?`show`:``}`" @touchmove.stop.prevent v-if="categoryList[index]">
				<view class="selectShow">
					<view class="selectList">
						<view class="selectName">
							<scroll-view scroll-y="true">
								<view class="scroll">
									<view :class="`item ${(index2===``||index2===undefined)?`active`:``}`"
										@click="getSelectIndex(undefined,categoryList[index].categoryCode)">
										全部{{categoryList[index].categoryName}}</view>
									<view :class="`item ${index2===idx?`active`:``}`"
										v-for="(item,idx) in categoryList[index].childList" :key="item.categoryName"
										@click="getSelectIndex(idx,item.categoryCode)">
										{{item.categoryName}}
									</view>
								</view>
							</scroll-view>
						</view>
						<view class="selectName" v-if="categoryList[index].childList[index2]">
							<scroll-view scroll-y="true">
								<view class="scroll">
									<view :class="`item ${(index3===``||index3===undefined)?`active`:``}`"
										@click="getSelectIndex2(undefined,categoryList[index].childList[index2].categoryCode)">
										全部{{categoryList[index].childList[index2].categoryName}}</view>
									<view :class="`item ${index3===idx?`active`:``}`"
										v-for="(item,idx) in categoryList[index].childList[index2].childList"
										:key="item.categoryName" @click="getSelectIndex2(idx,item.categoryCode)">
										{{item.categoryName}}
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
					<view class="btn"><button v-if="!(index2===``||index2===undefined)" @click="resetList()"
							style="background-color: #fff;color: #046626;border: #046626 1px solid;">重置</button><button
							@click="goCategory(index,code2,false);">确认</button>
					</view>
				</view>
			</view>
		</view>
		<view class=" bg" :style="`background-color:${bgColor}`"></view>
		<view class="" v-if="categoryCode==``">
			<view class="banner"
				:style="`background-image:linear-gradient(${colourBlend(bgColor,`#ffffff`, gradienNum)} ${gradienNum*100+`%`},#f6f6f6)`">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
					@change="swiperChange($event,index)" circular="true" indicator-active-color="white">
					<swiper-item v-for="item in bannerList" :key="item.id" @click="bookDetail(item.skipValue)">
						<view class="swiper-item">
							<image :src="item.imgUrl" alt="" mode="widthFix" />
						</view>
					</swiper-item>
				</swiper>
				<view class="tap_list">
					<view class="item" v-for="item in tapList" :key="item.name"
						@click="gojingxuan(item.categoryCode,item.name)">
						<view class="text">{{item.name}}</view>
						<view class="img">
							<image :src="item.imgUrl" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="labelList">
				<view class="item" v-for="(item,index) in labelList" :key="item.total"
					@click="goLabelList(labelCode[index].obj,labelCode[index].title)">
					<text class="iconfont icon-right">{{labelName[index]}}</text>
					<view class="img">
						<image :src="item.list.length&&item.list[0].appImgUrl" mode="aspectFill"></image>
						<image :src="item.list.length&&item.list[1].appImgUrl" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="rankingList">
				<view class="tit">
					<text>品类榜单</text>
					<text class="iconfont icon-right" @click="goAllRankList()">全部</text>
				</view>
				<scroll-view scroll-x="true" enable-flex>
					<view class="item">
						<view v-for="(item,index ) in rankingList.slice(0, 3)" :key="item&&item.total" class="list"
							@click="goBooksRank()">
							<view class="listname">{{listName[index]}}</view>
							<view v-for="list in item&&item.list" :key="list.authorName">
								<image :src="list.appImgUrl" mode="aspectFill" lazy-load="true"></image>
								<view class="info">
									<text>{{list.appShowName}}</text>
									<text class="aName">{{list.authorName}}</text>
								</view>
							</view>
						</view>
						<view class="list more" @click="goAllRankList()">
							更多
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="rec">
				<view class="tit">推荐好物</view>
				<view class="recommendList">
					<view class="item" v-for="item in recommendList" :key="item.pageNum">
						<view v-for=" list in item.list" :key="list.appShowName" @click="bookDetail(list.spuCode)">
							<image :src=" list.appImgUrl" mode="aspectFill">
							</image>
							<text class="name">{{list.appShowName}}</text>
							<text class="price">￥{{list.salePrice.toFixed(2)}}</text>
						</view>
						<view class="" v-if="item.isLastPage">
							没有更多内容了
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="" v-else>
			<view class="listbycategory">
				<view class="recommendList">
					<view class="item" v-for="item in listByCategory" :key="item.pageNum">
						<view v-for="list in item.list" :key="list.appImgUrl" @click="bookDetail(list.spuCode)">
							<image :src="list.appImgUrl" mode="aspectFill"></image>
							<text class="name">{{list.appShowName}}</text>
							<text class="price" v-if="categoryCode!='BR'">￥{{list.salePrice.toFixed(2)}}</text>
							<text class="price" v-else>￥{{list.maxSalePrice.toFixed(2)}}</text>
						</view>
						<view class="" v-if="item.isLastPage">
							没有更多内容了
						</view>
					</view>
				</view>
			</view>
		</view>
		<zdytabbar :current-page="0"></zdytabbar>
	</view>
	
</template>

<script>
	import {
		requestGet,
		requestPost
	} from "../../common/js/http.js";
		import zdytabbar from '@/components/zdytabbar/zdytabbar.vue'
	export default {
		components: {
			zdytabbar
		},
		data() {
			return {
				bgColor: "",
				bannerList: [],
				categoryList: [],
				categoryCode: "",
				labelName: ["独家定制", "精品畅销", "新书上架", "角落好书"],
				labelList: {},
				rankingList: [],
				listName: ["新书榜", "科技榜", "社科榜"],
				recommendList: [],
				pageNum: 1,
				tapList: [],
				categoryPageNum: 1,
				isLastPage: false,
				listByCategory: [],
				index: "",
				orderBySoldVolume: false,
				show: false,
				gradienNum: 0,
				index2: "",
				code2: "",
				index3: "",
				flag: true,
				categoryName: "",
				labelCode: [{
					obj: 7,
					title: 0
				}, {
					obj: 5,
					title: 5
				}, {
					obj: 3,
					title: 1
				}, {
					obj: 6,
					title: 4
				}]
			}
		},
		components: {},
		created() {
			this.getBanner();
			this.getCategory();
			this.getLabel();
			this.getTapList();
			this.getRanking();
			this.getRecommend();
		},
		mounted() {},
		methods: {
			async getBanner() {
				let result = await requestGet(
					"/layout/miniProgram/getBannerList", {
						page: "HOME"
					})

				if (result.code == 200) {
					this.bannerList = result.data;
					this.bgColor = result.data[0].backgroundColor
				}
			},
			swiperChange(e, index) {
				this.bgColor = this.bannerList[e.detail.current].backgroundColor;
			},
			async getCategory() {
				let result = await requestPost("/goods/categorylist")
				if (result.code == 200) {
					this.categoryList = result.data;
					console.log(this.categoryList)
				}
			},
			async goCategory(index, code, orderBySoldVolume, flag) {
				this.index = index;
				this.categoryCode = index != null ? this.categoryList[index].categoryCode : "";
				this.orderBySoldVolume = orderBySoldVolume;
				this.orderBySoldVolume = orderBySoldVolume;
				if (index === null) return;
				if (!flag) {
					this.listByCategory = [];
					this.categoryPageNum = 1;
					this.show = false;
					if (this.categoryList) {
						if (code.length == 6 && this.categoryList[this.index].childList[this.index2]) {
							this.categoryName = this.categoryList[this.index].childList[this.index2].childList[this
								.index3].categoryName
						} else if (code.length == 4 && this.categoryList[this.index].childList[this.index2]) {
							this.categoryName = this.categoryList[this.index].childList[this.index2].categoryName
						} else {
							this.categoryName = "全部" + this.categoryList[this.index].categoryName
						}
					}
					if (code.substring(0, 3) == this.categoryCode) {
						this.index2 = this.index3 = ""
					}
				}
				var categoryCode = code == "" ? this.categoryCode : code;
				console.log(categoryCode)
				if (orderBySoldVolume) {
					var params = {
						"frontCategoryCode": [categoryCode],
						"pageNum": this.categoryPageNum,
						"pageSize": 27,
						"orderBySoldVolume": true,
						"orderDesc": true
					}

				} else {
					var params = {
						"frontCategoryCode": [categoryCode],
						"pageNum": this.categoryPageNum,
						"pageSize": 27,
						"orderByPublishTime": true,
						"orderDesc": true
					}
				}
				let result = await requestPost("/goods/listbycategory", params)
				if (result.code == 200) {
					this.isLastPage = result.data.isLastPage
					this.listByCategory.push(result.data);
					console.log(this.listByCategory)
				}

			},
			getLabel() {
				const params = [{
					"orderDesc": false,
					"pageNum": 1,
					"pageSize": 10,
					"type": 7
				}, {
					"orderDesc": false,
					"pageNum": 1,
					"pageSize": 10,
					"type": 5
				}, {
					"orderDesc": false,
					"pageNum": 1,
					"pageSize": 10,
					"type": 3
				}, {
					"orderDesc": false,
					"pageNum": 1,
					"pageSize": 10,
					"type": 6
				}]
				params.forEach(async (item, idx) => {
					let result = await requestPost("/label/queryAppLabelList", item)
					if (result.code == 200) {
						this.labelList[idx] = result.data;
					}
				})
			},
			async getRanking() {
				let params = await requestGet("/content/classify/ranking/getClassifyRankingList")

				params.data.forEach(async (item, idx) => {
					let result = await requestPost("/goods/queryRankingList", {
						"categoryCode": item.categoryCode,
						"pageNum": 1,
						"pageSize": 2,
						"type": item.type

					})
					if (result.code == 200) {
						this.rankingList[idx] = result.data
					}
				})
			},
			async getTapList() {
				let result = await requestGet("/content/kingKong/Area/miniProgram/getList")
				if (result.code == 200) {
					this.tapList = result.data;
					console.log(this.tapList, "xsxsxsxss")
				}
			},
			async getRecommend() {
				let result = await requestPost("/label/queryAppLabelList", {
					"pageNum": this.pageNum,
					"pageSize": 9,
					"type": 1
				})
				if (result.code == 200 && result.data.hasNextPage) {
					this.isLastPage = result.data.isLastPage
					this.recommendList.push(result.data);
					console.log(this.recommendList)
				}

			},
			colourBlend(c1, c2, ratio) {
				ratio = Math.max(Math.min(Number(ratio), 1), 0)
				let r1 = parseInt(c1.substring(1, 3), 16)
				let g1 = parseInt(c1.substring(3, 5), 16)
				let b1 = parseInt(c1.substring(5, 7), 16)
				let r2 = parseInt(c2.substring(1, 3), 16)
				let g2 = parseInt(c2.substring(3, 5), 16)
				let b2 = parseInt(c2.substring(5, 7), 16)
				let r = Math.round(r1 * (1 - ratio) + r2 * ratio)
				let g = Math.round(g1 * (1 - ratio) + g2 * ratio)
				let b = Math.round(b1 * (1 - ratio) + b2 * ratio)
				r = ('0' + (r || 0).toString(16)).slice(-2)
				g = ('0' + (g || 0).toString(16)).slice(-2)
				b = ('0' + (b || 0).toString(16)).slice(-2)
				return '#' + r + g + b;
			},
			getSelectIndex(index, code) {
				console.log(index, code);
				this.index2 = index;
				this.code2 = code;
				this.index3 = ""

			},
			getSelectIndex2(index, code) {
				console.log(index, code)
				this.index3 = index;
				this.code2 = code;

			},
			resetList() {
				this.index2 = this.index3 = "";
				setTimeout(() => {
					this.goCategory(this.index, this.code2.substring(0, 2), false);
					this.show = false;
				}, 500)
			},
			bookDetail(spuCode) {
				uni.navigateTo({
					url: `/pages/goods-detail/goods-detail?spuCode=${spuCode}`
				})
			},
			gojingxuan(code, name) {
				uni.navigateTo({
					url: `/pages/wenxue/wenxue?obj=${code}&thename=${name}`
				})
			},
			goSreach() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			allClassfiy() {
				uni.switchTab({
					url: "/pages/classfiy/classfiy"
				})
			},
			goLabelList(obj, title) {
				uni.navigateTo({
					url: `/pages/private/private?obj=${obj}&title=${title}`
				})
			},
			goAllRankList() {
				uni.navigateTo({
					url: `/pages/ranklist/ranklist`
				})
			},
			goBooksRank() {
				uni.navigateTo({
					url: "/pages/booksrank/booksrank"
				})
			}
		},
		onReachBottom() {
			if (!this.isLastPage && this.categoryCode == ``) {
				this.pageNum++;
				this.getRecommend()
			}
			if (this.isLastPage === false && this.categoryCode != ``) {
				console.log(this.categoryCode)
				this.categoryPageNum++;
				this.goCategory(this.index, this.code2, false, this.flag)
			}
			if (this.code != "") {

			}
			console.log("上拉了")
		},
		onPageScroll(e) {
			this.gradienNum = e.scrollTop > 130 ? 1 : e.scrollTop / 130;
		},
	}
</script>

<style lang="less" scoped>
	@import "@/static/hrf/iconfont.css";

	.index {
		.title {

			width: 100%;
			z-index: 999;
			position: fixed;
			top: 0;
			left: 0;
			height: 304rpx;
			text-align: center;
			background-image: var(--bg-color);

			&.gradien2 {
				input {
					background-color: rgba(255, 255, 255, 0.2);

					&.icon-sousuo:before {
						color: rgba(0, 0, 0, 0.2)
					}
				}

				.bg,
				.banner {
					background-color: #eee;
				}

				.scroll {
					icon {
						color: #999;
					}

					.categoryList {

						.category {
							color: #999;
						}


					}
				}

				text {
					color: #666;
				}
			}

			&.gradien {
				text {
					color: #000;
				}

				input {
					background-color: #f5f5f5;

					&.icon-sousuo:before {

						color: rgba(0, 0, 0, 0.3);
					}
				}

				.bg,
				.banner {
					background-color: #fff;
				}

				.scroll {
					icon {
						color: #000;
					}

					.categoryList {

						.category {
							color: rgba(0, 0, 0, 0.7);
						}


					}
				}
			}

			.select {


				height: 0;
				overflow: hidden;

			}

			&.active {
				background-color: white;
				height: 304rpx;

				text {
					color: #000;
				}

				.scroll {
					icon {
						color: #000;
					}
				}

				.tap {
					background-color: #fff;
					height: 98rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 30rpx;

					.tap1 {
						color: #d7a462;
					}

					.tap2 {
						display: flex;

						.item {
							width: 80rpx;

							&.active {
								color: #d7a462;
							}
						}
					}
				}

				&+.bg {
					height: 400rpx;
				}

				input {
					margin: 0 30rpx;
					height: 72rpx;
					border-radius: 36rpx;
					background-color: #f5f5f5;

					&.icon-sousuo:before {
						color: rgba(0, 0, 0, 0.3)
					}
				}

				.categoryList {
					margin-top: 30rpx;
					padding-left: 10rpx;
					width: 640rpx;
					white-space: nowrap;
					display: inline-block;

					.category {
						padding: 0 5px;
						color: rgba(0, 0, 0, 0.7);
						display: inline-block;

						&.active {
							color: rgba(0, 0, 0, 0.9);
							font-size: 40rpx;
						}
					}
				}

				.select {
					display: none;

					&.show {
						display: block;

						height: 1000rpx;
						background-color: rgba(0, 0, 0, 0.6);

						.selectShow {
							background-color: #fff;
							height: 480rpx;

							.selectList {
								display: flex;
								text-align: start;
								border-top: #e5e5e5 2rpx solid;

								.selectName {
									width: 50%;
									border-right: #e5e5e5 2rpx solid;

									scroll-view {
										height: 360rpx;

										.scroll {
											height: 100%;


											.item {
												padding: 30rpx;
												height: 40rpx;
												font-size: 30rpx;


												&.active {
													position: relative;

													&::after {
														position: absolute;
														top: 40rpx;
														left: 6rpx;
														content: '';
														width: 0rpx;
														height: 0rpx;
														border: 12rpx solid;
														border-color: transparent transparent transparent #000000;
													}
												}
											}
										}
									}
								}
							}

							.btn {
								display: flex;
								justify-content: center;

								button {
									background-color: #046626;
									width: 6000rpx;
									color: #fff;
									font-size: 32rpx;
									margin: 20rpx 40rpx;
								}
							}
						}

					}
				}
			}

			text {
				display: block;
				padding: 60rpx 0 36rpx 0;
				font-size: 34rpx;
				color: white;
			}

			input {
				font-size: 26rpx;
				padding-left: 60rpx;
				margin: 0 30rpx;
				height: 72rpx;
				border-radius: 36rpx;
				background-color: rgba(255, 255, 255, 0.2);
				text-align: start;
				position: relative;

				&.icon-sousuo:before {
					position: absolute;
					font-size: 28rpx;
					top: 24rpx;
					left: 20rpx;
					color: rgba(255, 255, 255, 0.5);
				}
			}

			.categoryList {
				margin-top: 30rpx;
				padding-left: 10rpx;
				width: 640rpx;
				white-space: nowrap;
				display: inline-block;

				.category {
					padding: 0 5px;
					color: rgba(255, 255, 255, 0.7);
					display: inline-block;

					&.active {
						color: rgba(255, 255, 255, 0.9);
						font-size: 40rpx;
						font-weight: 700;
					}

				}


			}

			.icon-fenlei {
				position: relative;
				bottom: 8rpx;
				padding-left: 10rpx;
				font-size: 36rpx;
				color: white;
			}
		}

		.bg {
			height: 300rpx;
		}

		.banner {
			width: 100%;
			height: 410rpx;


			swiper {
				.swiper-item {
					text-align: center;
					margin: 0 30rpx;
					margin-top: 10rpx;

					image {
						width: 100%;
						border-radius: 8px;
					}
				}

				height: 260rpx;

			}

			.tap_list {
				display: flex;
				height: 140rpx !important;
				padding: 20rpx;

				.item {
					margin: 0 10rpx;
					background-color: #fff;
					border-radius: 12rpx;
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;

					.text {
						padding: 5rpx;
					}

					.img {
						image {
							vertical-align: middle;
							width: 50rpx;
							height: 50rpx;
						}
					}
				}
			}

		}

		.labelList {
			display: flex;
			flex-wrap: wrap;
			padding: 0 30rpx;
			background-color: #fff;
			margin: 0 30rpx;
			border-radius: 16rpx;

			.item {
				width: 50%;
				padding: 10rpx 0;

				text {
					display: block;
					height: 60rpx;

					&.icon-right::after {
						color: #999;
						font-weight: 100;
						font-size: 24rpx;
						position: relative;
						bottom: 4rpx;
						left: 4rpx;
					}
				}

				image {
					border-radius: 10rpx;
					margin-left: 30rpx;
					width: 100rpx;
					height: 145rpx;
				}


			}
		}

		.rankingList {
			.tit {
				margin: 30rpx;
				display: flex;
				justify-content: space-between;

				text:nth-child(2),
				text::after {
					color: #999;
					font-weight: 100;
					font-size: 24rpx;
				}
			}

			scroll-view {
				display: flex;
				flex-wrap: nowrap;
				flex-direction: column;

				.item {
					width: 1860rpx;

					position: relative;

					.list {
						padding: 20rpx;
						margin: 0 30rpx;
						width: 460rpx;
						height: 280rpx;
						display: inline-block;
						background-color: #fff;
						font-size: 24rpx;
						border-radius: 12rpx;


						.listname {
							height: 50rpx;
						}

						view {
							margin-top: 10rpx;
							height: 120rpx;
							display: flex;

							image {
								border-radius: 8rpx;
								width: 50rpx;
								height: 80rpx;
							}

							.info {
								margin-top: 0;

								text {
									margin-left: 10rpx;
									width: 320rpx;
									white-space: nowrap;
									overflow: hidden;
									text-overflow: ellipsis;
								}

								text:nth-child(2) {
									color: #999;
								}

								display: flex;
								flex-direction: column;
							}
						}
					}

					.more {
						color: #c5c5c5;
						text-align: center;
						line-height: 280rpx;
						position: absolute;
						top: 0;
						right: 0;
						width: 80rpx;
					}
				}

			}
		}

		.rec {
			.tit {
				margin: 30rpx;
			}

			.recommendList {

				.item {
					display: flex;
					flex-wrap: wrap;
					margin: 30rpx;

					view {
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						width: 33%;
						padding: 0 20rpx;

						text {
							font-size: 28rpx;
							width: 190rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							margin-bottom: 10rpx;
						}



						text:nth-child(3) {
							font-size: 24rpx;
							font-family: 'OPPO Sans';
							font-weight: 600;
							color: #c50000;
							margin-bottom: 40rpx;
						}

						image {
							margin-bottom: 10rpx;
							width: 190rpx;
							height: 284rpx;
							border-radius: 10rpx;
						}
					}
				}
			}
		}

		.listbycategory {

			.recommendList {

				.item {
					display: flex;
					flex-wrap: wrap;
					margin: 30rpx;

					view {
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						width: 33%;
						padding: 0 20rpx;

						text {
							font-size: 28rpx;
							width: 190rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							margin-bottom: 10rpx;
						}

						text:nth-child(3) {
							font-size: 24rpx;
							font-family: 'OPPO Sans';
							font-weight: 600;
							color: #c50000;
							margin-bottom: 40rpx;
						}

						image {
							margin-bottom: 10rpx;
							width: 190rpx;
							height: 284rpx;
							border-radius: 10rpx;
						}
					}
				}
			}
		}
	}
</style>
