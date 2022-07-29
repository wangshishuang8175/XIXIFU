<template>
	<view class="container">
		
		<navigator url="/pages/index/index" open-type="switchTab" class="fanhui">返回</navigator>
		<view class="bg_box">
			<view class="bg_two">
				<view class="vip">
					<text>会员码</text>
				</view>
				<view class="BookClub">
					<view class="BookClub_child">
						<text class="iconfont icon-shu"></text>
						<text>西西弗书友</text>
					</view>
				</view>
				<view class="QuickMark">
					<image src="../../static/erweima.png" mode=""></image>
				</view>
				<view class="nub">
					888812546982000578886
				</view>
				<view class="refresh">
					<text class="iconfont icon-shuaxin"></text>
					<text>点击刷新</text>
				</view>
				<view class="logo">
					<image src="../../static/logo2.png" mode=""></image>
				</view>
				<view class="tip">
					<text class="iconfont icon-tishi"></text>
					<text>在线下门店消费时，出示二维码，可获取积分</text>
				</view>
			</view>
		</view>
		<!-- <zdytabbar :current-page="2"></zdytabbar> -->
	</view>
</template>

<script>
		// import zdytabbar from '@/components/zdytabbar/zdytabbar.vue'
	export default {
		// components: {
		// 	zdytabbar
		// },
		data() {
			return {

			}
		},
         onLoad() {
         	uni.navigateTo({
         		url:"/pages/welcome/welcome"
         	})
         },
		methods: {
           
		}
	}
</script>

<style lang="less">
	@import url(@/static/wss/iconfont.css);
	.container{
		position: relative;
	}
    .fanhui{
	  position: absolute;
	  top: 70rpx;
	  left: 50rpx;
	  color: #fff;
	}
	.bg_box {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		background-color: #1A6840;
         
		.bg_two {
			background-color: white;
			width: 85%;
			height: 80%;
			border-radius: 18rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
            
			.vip {
				padding: 30rpx;
			}

			.BookClub {
				padding-bottom: 55rpx;

				.BookClub_child {
					width: 200rpx;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					background-color: Azure;
					border: 1px solid Teal;
					border-radius: 35rpx;
					display: flex;
					align-items: center;

					.iconfont {
						font-size: 35rpx;
					}

					text {
						color: Teal;
						padding-left: 15rpx;
						font-size: 25rpx;
					}
				}
			}

			.QuickMark {
				image {
					width: 410rpx;
					height: 410rpx;
				}
			}

			.nub {
				padding: 20rpx 0;
				font-size: 28rpx;
			}

			.refresh {
				font-size: 25rpx;
				color: Gray;

				.iconfont {
					font-size: 28rpx;
				}

				text {
					padding-left: 15rpx;
				}
			}

			.logo {
				padding-top: 100rpx;

				image {
					width: 180rpx;
					height: 100rpx;
				}
			}

			.tip {
				padding: 25rpx;
				font-size: 25rpx;
				color: DarkGray;

				.iconfont {
					font-size: 28rpx;
				}

				text {
					padding-left: 15rpx;
				}
			}

		}
	}
</style>
