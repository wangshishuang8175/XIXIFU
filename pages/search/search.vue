<template>
	<view class="container">
		<!-- 搜索框 -->
		<view class="searchs">
			<uni-icons type="search" size="22"></uni-icons>
			<input type="text" name="hotinput" id="" class="hotinputs" :placeholder="inputbook.contxt"
				v-model="keywords" @input="changewhy()" @change="whatbook(this.keywords),addhistory({key:this.keywords})">
		</view>
		<!-- 输入框跳出的内容 -->
		<view class="hottop" v-if="keywords">
			<view class="keyor" v-for="(item,idx) in mybooks" :key="item.keywords">
				<view class="" @click="whatbook(item.keywords),addhistory({key:item.keywords})">
					<!-- {{idx}}	 -->{{item.keywords}}
				</view>
			</view>
			<!-- 			<button @click="whatbook()">dianjifasong</button> -->
		</view>
		<!-- 搜索历史 -->
		<view class="hotbody" v-else>
			<view class="searchhistory">
				<view class="sccc" v-show="this.hiddennumber!=0">搜索历史 <uni-icons type="trash-filled" size="26"
						class="rubbish" @click="removeStorage(),qingkong()">
					</uni-icons>
				</view>

				<view class="">
					<view class="myhistory" v-for="(item,idx) in historylist" :key="idx">
						<view class="items" @click="changebook(item)">
							{{item}}
						</view>
					</view>

				</view>
			</view>

			<!-- 热门搜索 -->
			<view class="hotsearch">
				<view class="hottitle">
					<text class="hotsearchs">热门搜索</text>
					<navigator url="/pages/hotsearch/hotsearch" class="lookmore" hover-class="navigator-hover">查看更多 >
					</navigator>
				</view>
				<view class="wbooks">
					<view v-for="item in booklist" :key="item.isbn" class="wbook" @click="ohmybook(item.spuCode)">
						<image :src="item.appImgUrl" class="bookimg" mode="aspectFill"></image>
						<text class="text">{{item.frontDisplayName}}</text>
					</view>
				</view>
			</view>
			<view class="maylike">
				<view class="liketitle">
					<text class="maylikes">猜你喜欢</text>
					<view class="unlike" @click="wholike">不感兴趣，换一批 &nbsp;<text class="iconfont icon-huanyipi"></text>
					</view>
				</view>
				<view class="lbooks">
					<view v-for="item in likelist" :key="item.isbn" class="lbook" @click="ohmybook(item.spuCode)">
						<image :src="item.appImgUrl" class="bookimg"></image>
						<text class="text">{{item.appShowName}}</text>
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

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
	import _ from 'lodash';
	export default {
		data() {
			return {
				booklist: [],
				likelist: [],
				inputbook: {},
				// keyword: "",
				needbooks: [],
				mybooks: [],
				keywords: "",
				// displayd:{display:"block"}
				// history:[],
				historylist: [],
				hiddennumber: 0,
			}
		},
		created() {
			this.postbooks();
			this.postlike();
			this.getinput();
			// this.postsearch();
			// this.changeso()
			// this.getStorage()
			this.changewhy = _.debounce(this.changeso, 300);
			this.changewhy();
			this.hhh()
		},
		unmounted() {
			// 移除组件时，取消定时器
			this.changewhy.cancel();
		},
		onLoad(options) {
			console.log(options.obj, "xxxxxxxxxxxxaaaxaa")
			this.keywords = options.obj;
			console.log(this.keyword, "bdujbeiufvbcehfbvceuicvbdhjnbvooooooobj");
		},
		// watch: {
		// 	keyword: function(newVal, oldVal) {
		// 		this.postsearch(newVal);
		// 		console.log(oldVal, "olds");
		// 		console.log(newVal, "newb");
		// 		// console.log(keyword,"ji");
		// 	}
		// },
		onShow() {
			this.numberor()
		},
		methods: {
			...mapMutations("search", ["addhistory"]),
			// placeholder
			async getinput() {
				let result = await requestGet("/prompt/searchPrompt");
				result.code == 200 ? this.inputbook = result.data : "";
				console.log(this.inputbook, "input");
			},
			// 热门搜索
			async postbooks() {
				let result = await requestPost("/goods/toprecommendV1", {
					"pageNum": 1,
					"pageSize": 10
				});
				result.code == 200 ? this.booklist = result.data.list : "",
					console.log(this.booklist, "hot");
			},
			// 感兴趣
			async postlike() {
				let result = await requestPost("/goods/guessWhat", {
					"spuCode": "",
					"pageSize": 3,
					"pageNum": 4,
				});
				result.code == 200 ? this.likelist = result.data.list : "",
					console.log(this.likelist, "likebook");
			},
			// 输入框下拉运行结果，只有keyword
			async postsearch() {
				// const qkey = JSON.stringify({
				// 	keyword: e,
				// 	pageNum: 1,
				// 	pageSize: 10
				// });
				let result = await requestPost("/articleSearch/miniProgram/completion-new", {
					keywords: this.keywords,
					pageNum: 1,
					pageSize: 10
				});
				result.code == 200 ? this.mybooks = result.data.list : "";

				console.log(this.mybooks, "mybook");
				// console.log(qkey, "qqq");
				// console.log(e, "dwsc");
			},
			// 点击跳转发请求，发送给need页面的
			async postneed(event) {
				let result = await requestPost("/goods/search", {
					"pageSize": 20,
					"keyWord": event,
					"spuType": 1,
					"pageNum": 1,
					"orderDesc": true,
					"orderByPublishTime": true
				});
				result.code == 200 ? this.needbooks = result.data.list : "";
				console.log(this.needbooks, "needbooks");
				// console.log(qkey, "qqq");
				// console.log(e, "dwsc");
			},
			// setStor() {
			// 	uni.setStorage({		
			// 		key: 'historys',
			// 		data: this.keywords,
			// 		success() {
			// 			console.log( this.keywords,'存储成功')
			// 		}
			// 	})
			// },
			// getStorage() {
			// 	uni.getStorage({
			// 		key: 'historys',
			// 		success: res => {
			// 			console.log(res)
			// 		}
			// 	})
			// },
			// tiao
			removeStorage() {
				uni.removeStorage({
					key: 'history',
					success: function() {
						console.log('删除成功')
					}
				})
			},
			numberor() {
				if (this.history) {
					return this.hiddennumber = 1;
				}
			},
			wholike() {
				this.postlike();

			},
			hhh() {
				this.historylist = this.history;
				console.log(this.history, "bksavhhhhhhhhhhhhhhsj");
				console.log(this.historylist, "dwdbjhhhhhhhhhhhhhhhhhhhhh");
			},
			qingkong() {
				this.history = [];
				this.historylist = [];
			
					this.hiddennumber = 0;
		
				// setTimeout(callback:()=>{

				// },100)

				// this.displayd={display:"none"}
			},
			// 输入跳转内容之后keyword符文u空
			// tiao(){
			// 	this.keywords=""
			// },
			// 函数祛痘之后发搜索
			changeso() {
				this.postsearch();
				console.log("www");

				// this.removeStorage(e);
			},
			// 做跳转到need
			whatbook(e) {
				this.postneed(e);
				// this.setStor();
				console.log(e, "WhoNNNNNNNNNNNN");
				uni.redirectTo({
					url: `/pages/need/need?obj=${e}`,
				});
			},
			changebook(e) {
				console.log(e, "xweeeeee");
				uni.navigateTo({
					url: `/pages/need/need?obj=${e}`,
				});
			},
			// 跳转详情也
			ohmybook(e) {
				uni.navigateTo({
					url: `/pages/goods-detail/goods-detail?spuCode=${e}`
				})
			},
			// 判断初始时跳不跳转
			focusinput() {
				this.changewhy();
			}
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

			})
		},


	}
</script>

<style lang="less">
	@import url("@/static/xzg/iconfont.css");

	.container {
		padding: 40rpx;
		background-color: white;

		.searchs {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			display: flex;
			justify-self: start;
			border-radius: 40rpx;
			background-color: whitesmoke;
			padding-left: 10rpx;

			.serchiocn {
				width: 40rpx;
				height: 60rpx;
			}

			.hotinputs {
				margin-top: 14rpx;
				margin-left: 10rpx;
			}

		}

		.hottop {
			.keyor {
				margin-bottom: 30rpx;
			}
		}

		.hotbody {
			.searchhistory {
				margin-top: 10rpx;

				.sccc {
					margin-left: 24rpx;

					.rubbish {
						margin-left: 450rpx;
					}
				}


				.myhistory {
					display: inline-block;

					.items {
						font-size: 30rpx;
						display: inline-block;
						background-color: lightgrey;
						padding: 10rpx 30rpx 10rpx 30rpx;
						border-radius: 30rpx;
						margin: 10rpx;
					}
				}
			}

			.hotsearch {
				margin-top: 30rpx;

				.hottitle {
					padding: 5px;
					display: flex;
					justify-content: space-between;

					.hotsearchs {
						font-size: 16px;
						color: black;
						font-weight: 700;
					}

					.lookmore {
						color: orange;
						font-size: 14px;
					}
				}

				& .wbooks {
					width: 100%;
					height: 400px;
					overflow: hidden;

					.wbook {
						display: inline-block;
						width: 90px;
						height: 180px;
						text-align: center;
						margin: 10px;
						overflow: hidden;
						text-overflow: ellipsis;
						border-radius: 4px;

						.bookimg {
							width: 90px;
							height: 150px;
							border-radius: 4px;
						}

						.text {
							font-size: 10px;
							white-space: nowrap;
						}
					}
				}
			}

			.maylike {
				margin-top: 30px;

				.liketitle {
					padding: 5px;
					display: flex;
					justify-content: space-between;

					.maylikes {
						font-size: 16px;
						color: black;
						font-weight: 700;
					}

					.unlike {
						color: orange;
						font-size: 13px;
					}
				}

				& .lbooks {
					width: 100%;
					height: 210px;
					overflow: hidden;

					.lbook {
						display: inline-block;
						width: 100px;
						height: 200px;
						text-align: center;
						margin: 5px;
						overflow: hidden;
						text-overflow: ellipsis;
						border-radius: 4rpx;

						.bookimg {
							width: 100px;
							height: 160px;
						}

						.text {
							font-size: 10px;
							white-space: nowrap;
						}
					}
				}
			}
		}



	}
</style>
