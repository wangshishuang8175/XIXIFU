<template>
	<!-- 导航 -->
	<view>
		<uni-section title="实心标签" type="line">
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="current" :values="items" :style-type="styleType"
					:active-color="activeColor" @clickItem="onClickItem" />
			</view>
			<view class="content">
				<view v-if="current === 0"><text class="content-text">未使用</text></view>
				<view v-if="current === 1"><text class="content-text">已使用</text></view>
				<view v-if="current === 2"><text class="content-text">已过期</text></view>
			</view>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: ['未使用(0)', '已使用(0)', '已过期(0)'],
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

<style lang="less">
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
		background-color: white;
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
