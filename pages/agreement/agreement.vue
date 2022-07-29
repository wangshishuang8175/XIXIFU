<template>
	<view>
		<uni-section title="显示图标或图片" type="line">
			<uni-list>
				<navigator url="/pages/FAQ/FAQ" hover-class="navigator-hover">
					<view class="list">
						<text class="iconfont icon-navicon-yhxy"></text>
						<uni-list-item :show-extra-icon="true" showArrow :extra-icon="extraIcon" title="常见问题" />
					</view>
				</navigator>
				<navigator url="/pages/useragreement/useragreement" hover-class="navigator-hover">
					<view class="list">
						<text class="iconfont icon-yonghu1"></text>
						<uni-list-item :show-extra-icon="true" showArrow :extra-icon="extraIcon" title="用户协议" />
					</view>
				</navigator>
				<navigator url="/pages/privacy/privacy" hover-class="navigator-hover">
					<view class="list">
						<text class="iconfont icon-yinsicelve"></text>
						<uni-list-item :show-extra-icon="true" showArrow :extra-icon="extraIcon" title="隐私政策" />
					</view>
				</navigator>
			</uni-list>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	@import url(@/static/wss/iconfont.css);

	.list {

		padding: 5px 0;
		/* padding-left: 15px; */

	}

	.uni-list-item {
		display: inline-block;
	}
</style>
