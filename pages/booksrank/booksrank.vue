<template>
	<view class="container">
		<scroll-view class="menu" scroll-x="true">
			<button :class="navIndex==1?'activite':''" @click="checkIndex(1)">畅销总榜</button>
			<button :class="navIndex==2?'activite':''" @click="checkIndex(2)">文学榜</button>
			<button :class="navIndex==3?'activite':''" @click="checkIndex(3)">少儿榜</button>
			<button :class="navIndex==4?'activite':''" @click="checkIndex(4)">心理心灵榜</button>
			<button :class="navIndex==5?'activite':''" @click="checkIndex(5)">社科榜</button>
			<button :class="navIndex==6?'activite':''" @click="checkIndex(6)">经济管理榜</button>
			<button :class="navIndex==7?'activite':''" @click="checkIndex(7)">生活榜</button>
			<button :class="navIndex==8?'activite':''" @click="checkIndex(8)">艺术榜</button>
			<button :class="navIndex==9?'activite':''" @click="checkIndex(9)">设计榜</button>
			<button :class="navIndex==10?'activite':''" @click="checkIndex(10)">科技榜</button>
			<button :class="navIndex==11?'activite':''" @click="checkIndex(11)">文创榜</button>
		</scroll-view>
		<view class="list">
			<!-- 一级 -->
			<scroll-view class="list-left" scroll-y>
				<view v-if="navIndex==1"  :key="item.type" 	 class="list-nav"  v-for="(item,idx) in dataList">
					<!-- <view class="TabLeft">
						<text>· {{item.name}}</text>

					</view> -->
					<view @click="leftclick(idx),clickbooks(item.type)" class="list-nav" :class="['item', {active:currentIndex===idx}]">
							<text>· {{item.name}}</text>
					</view>  
				</view>
			</scroll-view>
			<!-- 文学榜 -->
			<scroll-view class="list-left" scroll-y>
				<view  v-if="navIndex==2" v-for="(item,idx) in List[0].childList" :key="item.categoryCode" >
					<view @click="leftclick(idx),clickbooks2(item.categoryCode)" class="list-nav" :class="['item', {active:currentIndex===idx}]">
						· {{item.categoryName}}榜
					</view>  
				</view>
				<!-- <view v-if="navIndex==2" class="list-nav" :key="item.spuName" 	:class="['item', {active:currentIndex===idx1}]" @click="leftclick(idx1)"  v-for="(item,idx1) in data1List">
					{{item.name}}
				</view> -->
			</scroll-view>
			<scroll-view class="list-left" scroll-y>
				<view v-if="navIndex==3"  v-for="(item,idx2) in List[1].childList"  :key="item.categoryCode"   >
				<view @click="leftclick(idx2),clickbooks2(item.categoryCode)" class="list-nav" :class="['item', {active:currentIndex===idx2}]">
					· {{item.categoryName}}榜
				</view>  
				</view>
			</scroll-view>

			<scroll-view class="list-left" scroll-y>
				<view v-if="navIndex==4"  v-for="(item,idx3) in List[2].childList"  :key="item.categoryCode"   >
				<view @click="leftclick(idx3),clickbooks2(item.categoryCode)" class="list-nav" :class="['item', {active:currentIndex===idx3}]">
					 · {{item.categoryName}}榜
				</view>  
				</view>
			</scroll-view>

			<scroll-view class="list-left" scroll-y>
				<view v-if="navIndex==5"  v-for="(item,idx4) in List[3].childList"  :key="item.categoryCode"   >
				<view @click="leftclick(idx4),clickbooks2(item.categoryCode)" class="list-nav" :class="['item', {active:currentIndex===idx4}]">
					 · {{item.categoryName}}榜
				</view>  
				</view>
			</scroll-view>

			<scroll-view class="list-left" scroll-y>
				<view v-if="navIndex==6" v-for="(item,idx5) in List[4].childList"  :key="item.categoryCode" >
						<view @click="leftclick(idx5),clickbooks2(item.categoryCode)" class="list-nav" :class="['item', {active:currentIndex===idx5}]">
							 · {{item.categoryName}}榜
						</view>  
				</view>
			</scroll-view>

			<scroll-view class="list-left" scroll-y>
				<view v-if="navIndex==7" v-for="(item,idx6) in List[5].childList"   :key="item.categoryCode" >
				<view @click="leftclick(idx6),clickbooks2(item.categoryCode)" class="list-nav" :class="['item', {active:currentIndex===idx6}]">
					 · {{item.categoryName}}榜
				</view>  
				</view>
			</scroll-view>

			<scroll-view class="list-left" scroll-y>
				<view v-if="navIndex==8" v-for="(item,idx7) in List[6].childList"   :key="item.categoryCode">
					<view @click="leftclick(idx7),clickbooks2(item.categoryCode)" class="list-nav" :class="['item', {active:currentIndex===idx7}]">
						 · {{item.categoryName}}榜
					</view>  
				</view>
			</scroll-view>

			<scroll-view class="list-left" scroll-y>
				<view v-if="navIndex==9" v-for="(item,idx8) in List[7].childList"   :key="item.categoryCode" >
					<view @click="leftclick(idx8),clickbooks2(item.categoryCode)" class="list-nav" :class="['item', {active:currentIndex===idx8}]">
						 · {{item.categoryName}}榜
					</view>  
				</view>
			</scroll-view>

			<scroll-view class="list-left" scroll-y>
				<view v-if="navIndex==10"  v-for="(item,idx9) in List[8].childList"   :key="item.categoryCode" >
					<view @click="leftclick(idx9),clickbooks2(item.categoryCode)" class="list-nav" :class="['item', {active:currentIndex===idx9}]">
						· {{item.categoryName}}榜
					</view>  
				</view>
			</scroll-view>

			<scroll-view class="list-left" scroll-y>
				<view v-if="navIndex==11" v-for="(item,idx10) in List[9].childList"  :key="item.categoryCode" >
						<view @click="leftclick(idx10),clickbooks2(item.categoryCode)" class="list-nav" :class="['item', {active:currentIndex===idx10}]">
						· {{item.categoryName}}榜
						</view>  
				</view>
			</scroll-view>
<!-- 1 -->
		<scroll-view class="list-right" scroll-y>
				<view class="" v-for="(largeitem,index) in books" :key="index">
					<view v-if="navIndex==1" class="right-nav" @tap="openOrder" v-for="(item,idx) in largeitem"   :key="item.categoryCode">
						<view class="left">
							<view class="xuhao">
								{{++idx+index*10}}
							</view>
						
						</view>
						<view class="left1">
							<image :src="item.appImgUrl"></image>
						</view>
						<view class="mid">
							<view class="name">
								{{item.spuName}}
							</view>
							<view class="author">
								{{item.authorName}}
							</view>
							<view class="publish">
								{{item.pressName}}
							</view>
							<view class="price">
								￥{{item.minSalePrice}}
							</view>
						</view>
						<view class="right">
							<image src="/static/icon/gouwuche.png" mode=""></image>
						</view>
					</view>
				</view>
		
			</scroll-view>
			
               <!-- 2 -->
		<scroll-view class="list-right" scroll-y>
				<view class="" v-for="(largeitem,index) in books" :key="index">
					<view v-if="navIndex==2" class="right-nav" @tap="openOrder" v-for="(item,idx) in largeitem"   :key="item.categoryCode">
						<view class="left">
							<view class="xuhao">
								{{++idx+index*10}}
							</view>
						<!-- 	<image :src="item.appImgUrl"></image> -->
						</view>
						<view class="left1">
							<image :src="item.appImgUrl"></image>
						</view>
						<view class="mid">
							<view class="name">
								{{item.spuName}}
							</view>
							<view class="author">
								{{item.authorName}}
							</view>
							<view class="publish">
								{{item.pressName}}
							</view>
							<view class="price">
								￥{{item.minSalePrice}}
							</view>
						</view>
						<view class="right">
							<image src="/static/icon/gouwuche.png" mode=""></image>
						</view>
					</view>
				</view>
		
			</scroll-view>
<!-- 3 -->
		<scroll-view class="list-right" scroll-y>
			<view class="" v-for="(largeitem,index) in books" :key="index">
				<view v-if="navIndex==3" class="right-nav" @tap="openOrder" v-for="(item,idx) in largeitem"   :key="item.categoryCode">
					<view class="left">
						<view class="xuhao">
							{{++idx+index*10}}
						</view>
					<!-- 	<image :src="item.appImgUrl"></image> -->
					</view>
					<view class="left1">
						<image :src="item.appImgUrl"></image>
					</view>
					<view class="mid">
						<view class="name">
							{{item.spuName}}
						</view>
						<view class="author">
							{{item.authorName}}
						</view>
						<view class="publish">
							{{item.pressName}}
						</view>
						<view class="price">
							￥{{item.minSalePrice}}
						</view>
					</view>
					<view class="right">
						<image src="/static/icon/gouwuche.png" mode=""></image>
					</view>
				</view>
			</view>
				
		</scroll-view>
			<!-- 4 -->
		<scroll-view class="list-right" scroll-y>
				<view class="" v-for="(largeitem,index) in books" :key="index">
					<view v-if="navIndex==4" class="right-nav" @tap="openOrder" v-for="(item,idx) in largeitem"   :key="item.categoryCode">
						<view class="left">
							<view class="xuhao">
								{{++idx+index*10}}
							</view>
						<!-- 	<image :src="item.appImgUrl"></image> -->
						</view>
						<view class="left1">
							<image :src="item.appImgUrl"></image>
						</view>
						<view class="mid">
							<view class="name">
								{{item.spuName}}
							</view>
							<view class="author">
								{{item.authorName}}
							</view>
							<view class="publish">
								{{item.pressName}}
							</view>
							<view class="price">
								￥{{item.minSalePrice}}
							</view>
						</view>
						<view class="right">
							<image src="/static/icon/gouwuche.png" mode=""></image>
						</view>
					</view>
				</view>
		
			</scroll-view>
			<!-- 5 -->
		<scroll-view class="list-right" scroll-y>
				<view class="" v-for="(largeitem,index) in books" :key="index">
					<view v-if="navIndex==5" class="right-nav" @tap="openOrder" v-for="(item,idx) in largeitem"   :key="item.categoryCode">
						<view class="left">
							<view class="xuhao">
								{{++idx+index*10}}
							</view>
						<!-- 	<image :src="item.appImgUrl"></image> -->
						</view>
						<view class="left1">
							<image :src="item.appImgUrl"></image>
						</view>
						<view class="mid">
							<view class="name">
								{{item.spuName}}
							</view>
							<view class="author">
								{{item.authorName}}
							</view>
							<view class="publish">
								{{item.pressName}}
							</view>
							<view class="price">
								￥{{item.minSalePrice}}
							</view>
						</view>
						<view class="right">
							<image src="/static/icon/gouwuche.png" mode=""></image>
						</view>
					</view>
				</view>
		
			</scroll-view>
			<!-- 6 -->
	<scroll-view class="list-right" scroll-y>
		<view class="" v-for="(largeitem,index) in books" :key="index">
			<view v-if="navIndex==6" class="right-nav" @tap="openOrder" v-for="(item,idx) in largeitem"   :key="item.categoryCode">
				<view class="left">
					<view class="xuhao">
						{{++idx+index*10}}
					</view>
				<!-- 	<image :src="item.appImgUrl"></image> -->
				</view>
				<view class="left1">
					<image :src="item.appImgUrl"></image>
				</view>
				<view class="mid">
					<view class="name">
						{{item.spuName}}
					</view>
					<view class="author">
						{{item.authorName}}
					</view>
					<view class="publish">
						{{item.pressName}}
					</view>
					<view class="price">
						￥{{item.minSalePrice}}
					</view>
				</view>
				<view class="right">
					<image src="/static/icon/gouwuche.png" mode=""></image>
				</view>
			</view>
		</view>
			
	</scroll-view>
			<!-- 7 -->
	<scroll-view class="list-right" scroll-y>
		<view class="" v-for="(largeitem,index) in books" :key="index">
			<view v-if="navIndex==7" class="right-nav" @tap="openOrder" v-for="(item,idx) in largeitem"   :key="item.categoryCode">
				<view class="left">
					<view class="xuhao">
						{{++idx+index*10}}
					</view>
				<!-- 	<image :src="item.appImgUrl"></image> -->
				</view>
				<view class="left1">
					<image :src="item.appImgUrl"></image>
				</view>
				<view class="mid">
					<view class="name">
						{{item.spuName}}
					</view>
					<view class="author">
						{{item.authorName}}
					</view>
					<view class="publish">
						{{item.pressName}}
					</view>
					<view class="price">
						￥{{item.minSalePrice}}
					</view>
				</view>
				<view class="right">
					<image src="/static/icon/gouwuche.png" mode=""></image>
				</view>
			</view>
		</view>
			
	</scroll-view>
			<!-- 8 -->
	<scroll-view class="list-right" scroll-y>
		<view class="" v-for="(largeitem,index) in books" :key="index">
			<view v-if="navIndex==8" class="right-nav" @tap="openOrder" v-for="(item,idx) in largeitem"   :key="item.categoryCode">
				<view class="left">
					<view class="xuhao">
						{{++idx+index*10}}
					</view>
				<!-- 	<image :src="item.appImgUrl"></image> -->
				</view>
				<view class="left1">
					<image :src="item.appImgUrl"></image>
				</view>
				<view class="mid">
					<view class="name">
						{{item.spuName}}
					</view>
					<view class="author">
						{{item.authorName}}
					</view>
					<view class="publish">
						{{item.pressName}}
					</view>
					<view class="price">
						￥{{item.minSalePrice}}
					</view>
				</view>
				<view class="right">
					<image src="/static/icon/gouwuche.png" mode=""></image>
				</view>
			</view>
		</view>
			
	</scroll-view>
			<!-- 9 -->
		<scroll-view class="list-right" scroll-y>
				<view class="" v-for="(largeitem,index) in books" :key="index">
					<view v-if="navIndex==9" class="right-nav" @tap="openOrder" v-for="(item,idx) in largeitem"   :key="item.categoryCode">
						<view class="left">
							<view class="xuhao">
								{{++idx+index*10}}
							</view>
							<!-- <image :src="item.appImgUrl"></image> -->
						</view>
						<view class="left1">
							<image :src="item.appImgUrl"></image>
						</view>
						<view class="mid">
							<view class="name">
								{{item.spuName}}
							</view>
							<view class="author">
								{{item.authorName}}
							</view>
							<view class="publish">
								{{item.pressName}}
							</view>
							<view class="price">
								￥{{item.minSalePrice}}
							</view>
						</view>
						<view class="right">
							<image src="/static/icon/gouwuche.png" mode=""></image>
						</view>
					</view>
				</view>
		
			</scroll-view>
			<!-- 10 -->
			<scroll-view class="list-right" scroll-y>
				<view class="" v-for="(largeitem,index) in books" :key="index">
					<view v-if="navIndex==10" class="right-nav" @tap="openOrder" v-for="(item,idx) in largeitem"   :key="item.categoryCode">
						<view class="left">
							<view class="xuhao">
								{{++idx+index*10}}
							</view>
						<!-- 	<image :src="item.appImgUrl"></image> -->
						</view>
						<view class="left1">
							<image :src="item.appImgUrl"></image>
						</view>
						<view class="mid">
							<view class="name">
								{{item.spuName}}
							</view>
							<view class="author">
								{{item.authorName}}
							</view>
							<view class="publish">
								{{item.pressName}}
							</view>
							<view class="price">
								￥{{item.minSalePrice}}
							</view>
						</view>
						<view class="right">
							<image src="/static/icon/gouwuche.png" mode=""></image>
						</view>
					</view>
				</view>
		
			</scroll-view>
			<!-- 11 -->
		<scroll-view class="list-right" scroll-y>
				<view class="" v-for="(largeitem,index) in books" :key="index">
					<view v-if="navIndex==11" class="right-nav" @tap="openOrder" v-for="(item,idx) in largeitem"   :key="item.categoryCode">
						<view class="left">
							<view class="xuhao">
								{{++idx+index*10}}
							</view>
						<!-- 	<image :src="item.appImgUrl"></image> -->
						</view>
						<view class="left1">
							<image :src="item.appImgUrl"></image>
						</view>
						<view class="mid">
							<view class="name">
								{{item.spuName}}
							</view>
							<view class="author">
								{{item.authorName}}
							</view>
							<view class="publish">
								{{item.pressName}}
							</view>
							<view class="price">
								￥{{item.minSalePrice}}
							</view>
						</view>
						<view class="right">
							<image src="/static/icon/gouwuche.png" mode=""></image>
						</view>
					</view>
				</view>
		
			</scroll-view>
		</view>
		<uni-load-more v-if="hasMore" status="loading"></uni-load-more>
		<uni-load-more v-else status="noMore"></uni-load-more>
	</view>
</template>
<script>
	import {
		requestPost,
		requestGet,
	} from "@/common/js/http.js"
	export default {
		data() {
			return {
				navIndex: 1,
				navLeftIndex: 1,
				currentIndex:0,
				
				dataList: [{
						type: 1,
						name: "畅销总榜"
					},
					{type: 2,
						name: "新书榜"
					},
					{type: 3,
						name: "5月榜"
					}
				],
			
				category: [],
				categoryActive: 0,
				books: [],
				// books3: [],
				// books4: [],
				// books5: [],
				// books6: [],
				// books7: [],
				// books8: [],
				// books9: [],
				// books10: [],
				// books11: [],
				pageNum: 1,
				hasMore: true,
				List:[],
				event:"",
				titlex:4
			}
		},
		created() {
			this.getCategory(),
				this.getBooks("1"),
				// 不要在created调用这么多，@click调用就行了，你初始运行这么多，数据叠加在一起，你的总榜被就拉的特别特别长了
			 //   this.getBooks("2"),
			 //    this.getBooks("3"),	
				// this.getBooks2("A1"),
				// this.getBooks2("A2"),
				// this.getBooks2("A3"),
				// this.getBooks2("A4"),
				// this.getBooks2("A5"),
				// this.getBooks2("A6"),
				// this.getBooks2("A7"),
				// this.getBooks2("A8"),
				// this.getBooks2("A9"),
				// this.getBooks2("BR"),
				// this.getBooks3(),
				// this.getBooks4(),
				// this.getBooks5(),
				// this.getBooks6(),
				// this.getBooks7(),
				// this.getBooks8(),
				// this.getBooks9(),
				// this.getBooks10(),
				// this.getBooks11(),
				this.getList()
		},
		methods: {
			 categoryClickMain(id,index) {
			                this.categoryActive = index;
			                let current = this.dataList.find(item => item.id === id); 
			            },
						//childlistllllllllllll
						async getList() {
							let result = await requestPost("/goods/categorylist", {
								
							})	     
							// console.log(result)
							result.code == 200 ? this.List = result.data: ""
							this.quanbu();
							console.log(this.List,"wdhjshdjabcjklashbu");
							console.log(this.List[1].childList,"dnu9nfduinfunfnnnnnnnnnnnnn");
						},
						quanbu() {
										this.List.forEach((mitem,idx) => {
										
												mitem.childList.unshift({
													"categoryTopCode": 6666,
													"categorySystemCode": mitem.categorySystemCode,
													"categorySystemName": null,
													"categoryCode": mitem.categoryCode,
													"categoryName": mitem.categoryName,
													"categoryFullName": "全部",
													"categoryDescription": null,
													"isLeaf": null,
												
											})
										})
									},

			async getCategory() {
				let result = await requestGet("/content/classify/ranking/getClassifyRankingList")
				console.log(result)
				result.code == 200 ? this.category = result.data : ""
			},
			// 点击方法提前清空数组
			clickbooks(e){
				this.books=[];
				this.getBooks(e)
			},
			clickbooks2(e){
				this.books=[];
				this.getBooks2(e)
			},
			async getBooks(e) {
				//清空数组
				let result = await requestPost("/goods/queryRankingList", {
					"pageSize": 10,
					"type": e,
					pageNum: this.pageNum,
					
				})
				// if (result.data.list.length < 10) {
				// 	this.hasMore = false
				// }
				console.log(result)
				console.log(e,"2222222222222222222")
				this.titlex=e;
				// this.booklist.push(result.data.list);
				result.code == 200 ? this.books.push(result.data.list) : ""
			},
			async getBooks2(e) {
				let result = await requestPost("/goods/queryRankingList", {
					"pageSize": 10,
					"type": 4,
					"categoryCode":e,
					pageNum: this.pageNum
				})
				// if (result.data.list.length < 10) {
				// 	this.hasMore = false
				// }
				this.event=e;
				console.log(result)
				result.code == 200 ? this.books.push(result.data.list) : ""
			},
		
			checkIndex(index) {
				this.navIndex = index;
				},
				// , item
				leftclick(idx) {
					this.currentIndex = idx;
					console.log(this.currentIndex);
				},
				leftclick(idx1) {
					this.currentIndex = idx1;
					console.log(this.currentIndex);
				},
		
				checkLeftIndex(index) {
					this.navLeftIndex = index;
				},
			},
			// 上拉加载
			onReachBottom() {
				
					this.pageNum++;
					if(this.titlex==4){
						this.getBooks2(this.event);				
					}else{
						this.getBooks(this.titlex);
					}
					
				
			},
			// 下拉刷新
			onPullDownRefresh() {
				this.books = [];
				this.pageNum = 1;
				this.hasMore = true;			
					if(this.titlex==4){
						this.getBooks2(this.event);				
					}else{
						this.getBooks(this.titlex);
					}							
				this.getBooks().then(() => {
					uni.stopPullDownRefresh();
				});
			}
		}
</script>
<style lang="less" scoped>
	.container {
		.menu {
			white-space: nowrap;
			.activite {
				color: green;
				border: 1px solid green;
			}
			button {
				display: inline-block;
				background-color: #EBEBEB;
				border-radius: 18px;
				width: 100px;
				height: 30px;
				line-height: 30px;
				font-size: 14px;
				margin-left: 8px;
			}
		}
		.list {
			display: flex;
			margin-top: 12px;
			.list-left {
				width: 100px;
				background-color: ghostwhite;
				.active{
					color:green;
				}
				.list-nav {
					width: 90px;
					height: 60px;
					line-height: 60px;
					margin-left: 10px;
					font-weight: 500;
                    font-size: 14px;
                    overflow: hidden;
					word-break: break-all;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}
			}
			.list-right {
				margin-left: 5px;
				.right-nav {
					display: flex;
					margin-top: 20px;
					.left {
						.xuhao{
							flex:1;
							width: 20rpx;
						}
						// flex: 2;
				
					}
					.left1{image {
							width: 90px;
							height: 110px;
							margin-left: 10px;
						}}	
					.mid {
						margin-left: 10px;
						flex: 3;
						height: 110px;
						width: 200px;
						.name {
							font-weight: 700;
							overflow: hidden;
							word-break: break-all;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
						}
						.author {
							font-size: 12px;
							color: lightgrey;
							margin-top: 5px;
						}
						.publish {
							font-size: 12px;
							color: lightgrey;
							margin-top: 5px;
						}
						.price {
							color: red;
							font-weight: 600;
							margin-top: 20px;
						}
					}
					.right {
						flex: 2;
						width: 30px;
						height: 30px;
						image {
							width: 30px;
							height: 30px;
							margin-top: 80px;
							position: relative;
							right: 60px
						}
					}
				}
			}
		}
	}
</style>