<template>
	<view class="container">
		<view class="integrals_module_one">
			<view class="left">
				<view class="nub">0.00</view>
				<text>积分</text>
			</view>
			<view class="right">
				<view class="rule">
					<view class="rule_one">规则说明</view>
				</view>
				<view class="exchange">
					<view>积分可前往西西弗APP内进行兑换</view>
				</view>
			</view>
		</view>

		<!-- 导航 -->
		<view>
			<uni-section title="实心标签" type="line">
				<view class="uni-padding-wrap uni-common-mt">
					<uni-segmented-control :current="current" :values="items" :style-type="styleType"
						:active-color="activeColor" @clickItem="onClickItem" />
				</view>
				<view class="content">
					<view v-if="current === 0"><text class="content-text">全部</text></view>
					<view v-if="current === 1"><text class="content-text">获取</text></view>
					<view v-if="current === 2"><text class="content-text">消耗</text></view>
					<view v-if="current === 3"><text class="content-text">过期</text></view>
				</view>
			</uni-section>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: ['全部', '获取', '消耗', '过期'],
				styles: [{
						value: 'text',
						text: '按钮',
						checked: true
					},
					{
						value: 'text',
						text: '文字'
					}
				],
				current: 0,
				colorIndex: 0,

				styleType: 'text',
				search: "",
				activeColor: "",
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			styleChange(e) {
				if (this.styleType !== e.detail.value) {
					this.styleType = e.detail.value
				}
			},
			colorChange(e) {
				if (this.styleType !== e.detail.value) {
					console.log(e.detail.value);
					this.activeColor = e.detail.value
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		padding: 0;
		margin: 0;
	}

	.integrals_module_one {
		background-color: ForestGreen;
		height: 300rpx;
		margin: 30rpx;
		border-radius: 5% 5% 0 0;
		display: flex;

		.left {
			padding-left: 20rpx;
			padding-top: 35rpx;
			flex: 1;
			color: white;
			justify-content: center;

			.nub {
				display: inline-block;
				padding-right: 10rpx;
				font-size: 40rpx;
			}

			text {
				font-size: 20rpx;
			}
		}

		.right {
			text-align: right;
			display: flex;
			flex-direction: column;

			.rule {
				display: flex;
				flex: 1;
				justify-content: flex-end;

				.rule_one {
					color: white;
					width: 160rpx;
					height: 50rpx;
					background-color: rgba(0, 0, 0, 0.2);
					text-align: center;
					border-radius: 35%;
					margin-top: 35rpx;
				}
			}

			.exchange {
				display: flex;
				flex: 1;
				color: SandyBrown;
				align-items: flex-end;
				padding-bottom: 30rpx;
				padding-right: 20rpx;
				font-size: 25rpx;
			}
		}
	}

	// 导航
	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 0;

	}

	.uni-padding-wrap {
		padding: 0px 30px;
	}

	.content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		height: 150px;
		text-align: center;
	}

	.segmented-control__item {
		border-bottom: 1px solid green;
		border-bottom-width: 2px;

		.segmented-control__item--text {
			border-bottom-style: none;
			border-bottom-width: 2px;
			padding: 6px 0;
		}
	}
</style>
