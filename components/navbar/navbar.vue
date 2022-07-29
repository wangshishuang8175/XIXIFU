<template>
	<view class="box">
		<view class="icons">
			<uni-icons class="item" type="left" size="20" @click="goback"></uni-icons>
			<uni-icons class="item" type="home" size="20" @click="gohome"></uni-icons>
		</view>
		<view class="menu" :style="[menuStyle]">
			<view v-for="(item,idx) in menus" :key="item" :class="['item',{active:idx===scrollIdx}]">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['menuopacity','scrollIdx'],
		data() {
			return {
				menus: ['商品', '详情', '推荐'],				
			}
		},
		computed:{
			menuStyle(){
				return {
					'--menu-opacity': this.menuopacity
				}
			}
		},
		methods:{
			goback(){
				// uni.navigateBack({})
				uni.navigateBack({
					
				})
				
				
			},
			gohome(){
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.box {
		background-color: transparent;
		position: relative;
		width: 100%;
		height: 100%;
		
		.icons {
			position: absolute;
			left: 0;
			top: 0;
			width: 100rpx;
			display: flex;
			z-index: 200;

			.item {
				flex: 1;
			}
		}

		.menu {
			width: 100%;
			height: 100%;
			z-index: 100;
			background-color: white;
			position: absolute;
			opacity: var(--menu-opacity);
			left: 0;
			top:0;
			display: flex;
			justify-content: center;
			flex: 1;
			font-size: 26rpx;

			.item {
				padding-left: 20rpx;
				padding-right: 20rpx;

				&.active {
					position: relative;

					&::after {
						content: "";
						position: absolute;
						bottom: 0;
						width: 30rpx;
						left: 50%;
						margin-left: -15rpx;
						border-bottom: 2px solid green;
					}
				}
			}
		}
	}
</style>
