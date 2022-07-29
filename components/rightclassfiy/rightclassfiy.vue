<template>
	<view>
		<scroll-view class="right" scroll-y="true">
			<!-- 			<view v-for="item in getcategorylist" :key="item.categoryCode" class="rightlist">
				

						<view class="rtop">
							<view class="rtoptitle">{{ item.categoryName }}</view>
							<view class="rtoptext">{{item.categoryDescription}}</view>	
						</view>
						
								<view  v-for="mitem in item.childList" :key="mitem.categoryCode" class="rightbodytitle">
									 <view class="mitems">{{mitem.categoryName}} </view>
									 <view class="rightbodytext">
									 	<view  v-for="sitem in mitem.childList" :key="mitem.categoryCode" class="sitems">
									 		 <view class="">{{sitem.categoryName}} </view> 
									 	</view>
									 </view>
								</view>							
				</view> -->
			<view class="rightlist">

				<view class="rtop" @click="rtop">
					<view class="rtoptitle">{{ this.getcategorylist[this.currentIndex].categoryName }}</view>
					<view class="rtoptext">{{this.getcategorylist[this.currentIndex].categoryDescription}}</view>
				</view>

				<view v-for="mitem in getcategorylist[currentIndex].childList" :key="mitem.categoryCode"
					class="rightbodytitle" >
					<view class="mitems">{{mitem.categoryName}} </view>
					<view class="rightbodytext">
						<view v-for="sitem in mitem.childList" :key="mitem.categoryCode" class="sitems">
							<!-- <view class="steam" @click="steam()">{{sitem.categoryName}} </view> -->
							<navigator
								:url="`/pages/wenxue/wenxue?obj=${sitem.categoryCode}&thename=${sitem.categoryFullName}`"
								class="steam" to="/pages/wenxue/wenxue">{{sitem.categoryName}}
							</navigator>
						</view>

					</view>
				</view>

			</view>

		</scroll-view>
		<!-- <zdytabbar :current-page="1"></zdytabbar> -->
	</view>
</template>


<script>
	import {
		requestGet,
		requestPost
	} from '@/common/js/http.js';
	export default {
		props: {
			currentIndex: Number,
		},
		name: "rightclassfiy",
		data() {
			return {
				getcategorylist: [],
				// currentIndex: 0,
				search: "",
				input: "",
				hhhj:[1,2,3],
			}
		},
		created() {
			this.getcategory();
			console.log(this.currentIndex, "dwihdbi");
		this.currentIndex=this.currentIndex	
		},
		methods: {
			//这里  getcategory()方法自定义
			async getcategory() {
				//goods/categorylist
				let result = await requestPost("/goods/categorylist", {
					"frontCategoryCode": ["A2"],
					"pageNum": 1,
					"pageSize": 27,
					"orderByPublishTime": true,
					"orderDesc": true
				})
				result.code == 200 ? this.getcategorylist = result.data : "",
					console.log(this.getcategorylist, "fujfhc");
						this.quanbu();
						console.log(this.getcategorylist,"sdsds");
				// Object.getOwnPropertyNames(obj)
				// console.log(this.getcategorylist.childList,"liebiao");
			},
			quanbu() {
				this.getcategorylist.forEach((item,idx) => {
					item.childList.forEach((mitem) => {
						mitem.childList.unshift({
							"categoryTopCode": null,
							"categorySystemCode": mitem.categorySystemCode,
							"categorySystemName": null,
							"categoryCode": mitem.categoryCode,
							"categoryName": "全部",
							"categoryFullName": mitem.categoryFullName,
							"categoryDescription": null,
							"isLeaf": null,
						}) ;
					})
				})
			},
			rtop() {
				console.log(this.currentIndex,"nubnb");
				var objcode=this.getcategorylist[this.currentIndex].categoryCode;
				var objname=this.getcategorylist[this.currentIndex].categoryFullName;
				console.log(objcode,"dsdcodedeede");
				uni.navigateTo({
					url: `/pages/wenxue/wenxue?obj=${objcode}&thename=${objname}`

				});
			},


		},
	}
</script>


<style lang="less" scoped>
	.right {
		padding-left: 20rpx;
		height: 1200rpx;
        padding-bottom: 120rpx;
		.rightlist {
			.rtop {
				border-bottom: 1px solid lightgray;
				height: 120rpx ;
				padding: 0rpx 20rpx 0rpx 0;

				.rtoptitle {
					font-size: 48rpx;
					font-weight: 500;
					margin-bottom: 20rpx;
				}

				.rtoptext {
					font-size: 26rpx;
					color: dimgrey;
				}
			}

			.rightbodytitle {
				.mitems {
					margin: 30rpx 0 30rpx 0;
				}

				.rightbodytext {

					// display: flex;
					// flex-wrap: wrap;
					//     flex-direction: column;
					// //     align-content: space-between;
					//     justify-content: space-between;

					.sitems {
						display: inline-block;
						padding: 10rpx 30rpx 10rpx 30rpx;
						border-radius: 30rpx;
						margin: 10rpx;
						background-color: #D3D3D3;
					}
				}
			}
		}
	}
</style>
