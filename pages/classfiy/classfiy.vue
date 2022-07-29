<template>
	<view>
		<view class="whitebg">
			<view class="searchs">
				<uni-icons type="search" size="22"></uni-icons>
				<input type="text" name="hotinput" id="" class="hotinputs" placeholder="搜索"
					 @focus="tosearch()">
			</view>
		</view>
	
		
		<view class="container">
			<scroll-view class="left" scroll-y="true">
				<!-- 通过索引的方式  当前的index=遍历的idx时添加active样式-->
				<view v-for="(item,idx) in getcategorylist" :key="item.categoryCode"
					:class="['item', {active:currentIndex===idx}]" @click="leftclick(idx)">
					{{ item.categoryName }}
				</view>
			</scroll-view>
			<!-- <scroll-view class="right" scroll-y="true">
				<view v-for="(item,idx) in getcategorylist" :key="item.categoryCode" class="rightlist">
		

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
				
				</view>
			
			</scroll-view> -->
			<view class="right">
				<rightclassfiy :currentIndex='currentIndex'></rightclassfiy>
			</view>
			
		</view>
	<zdytabbar :current-page="1"></zdytabbar>
	</view>
</template>


<script>
	import {
		requestGet,
		requestPost
	} from '@/common/js/http.js';
import zdytabbar from '@/components/zdytabbar/zdytabbar.vue'
import rightclassfiy from '../../components/rightclassfiy/rightclassfiy.vue'
	export default {
		components: {
				zdytabbar,
				rightclassfiy
			},
		data() {
			return {
				getcategorylist: [],
				currentIndex: 0,
				search:"",
				input:"",
			}
		},
		created() {
			this.getcategory();
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
			// console.log(this.getcategorylist.childList,"liebiao");
			},
			leftclick(idx, item) {
				this.currentIndex = idx;
				console.log(this.currentIndex);
			},
			tosearch(){
				uni.navigateTo({
					url:"/pages/search/search",
				})
			}
		},
	}
</script>


<style lang="less" scoped>
	.whitebg{
		background-color: #fff;
    padding:30rpx 0 30rpx 0;
display: flex;
justify-content: center;
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
				}
		
			}
	}
	
	.container {
		display: flex;
        padding-bottom: 120rpx;
		.left {
			flex: 1;
			width: 180rpx;
			text-align: center;
			height: 1200rpx;
			.item {
				height: 120rpxbackground-color;
				line-height: 120rpx;
				margin-bottom: 20rpx;
			}

			& .active {
				background-color: #EEEEEE;
				color: darkgreen;
			}

		}

		.right {
			flex: 3;
			height: 900rpx;
			.rightlist{
				.rtop{
					border-bottom: 1px solid lightgray;
					height: 100rpx;
					padding: 20rpx 20rpx 20rpx 0;
					.rtoptitle{
						font-size: 48rpx;
						font-weight: 500;
						margin-bottom: 20rpx;
					}
					.rtoptext{
						font-size:26rpx;
						color: dimgrey;
					}
				}
				.rightbodytitle{
					.mitems{
						margin: 30rpx 0 30rpx 0;
					}
					.rightbodytext{
			
						// display: flex;
						// flex-wrap: wrap;
						//     flex-direction: column;
						// //     align-content: space-between;
						//     justify-content: space-between;
					
						.sitems{
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
	}
</style>