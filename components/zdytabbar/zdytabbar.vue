<template>
	<view class="tabbar-container">
		<block>
			<view class="tabbar-item" v-for="(item, index) in tabbarList" :key="item.index" :class="[item.centerItem ? ' center-item' : '' ]" @click="changeItem(item)">
				<view class="item-top"><image :src="currentItem == item.id ? item.selectIcon : item.icon"></image></view>
				<view class="item-bottom" :class="[currentItem == item.id ? 'item-active' : '']">
					<text>{{ item.text }}</text>
				</view>
			</view>
		</block>
	</view>
</template>
 
<script>
export default {
	props: {
		currentPage: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			currentItem: 0,
			tabbarList: [
				
				{
					id: 0,
					path: '/pages/index/index',
					icon: '/static/shang.png',
					selectIcon: '/static/shouye.png',
					text: '商城',
					centerItem: false
				},
				{
					id: 1,
					path: '/pages/classfiy/classfiy',
					icon: '/static/fen.png',
					selectIcon: '/static/fenlei.png',
					text: '分类',
					centerItem: false
				},
				{
					id: 2,
					path: '/pages/code/code',
					icon: '/static/code.png',
					selectIcon: '/static/code.png',
					text: '二维码',
					centerItem: true
				},
				{
					id: 3,
					path: '/pages/cart/cart',
					icon: '/static/gou.png',
					selectIcon: '/static/gouwuche.png',
					text: '购物车',
					centerItem: false
				},
				{
					id: 4,
					path: '/pages/me/me',
					icon: '/static/31wode.png',
					selectIcon: '/static/wode.png',
					text: '我的',
					centerItem: false
				}
			]
		};
	},
	mounted() {
		this.currentItem = this.currentPage;
		uni.hideTabBar();
	},
	methods: {
		changeItem(item) {
			let _this = this;
			//_this.currentItem = item.id;
			uni.switchTab({
				url: item.path
			});
		}
	}
};
</script>
<style scoped>
view {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}
.tabbar-container {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 110rpx;
	box-shadow: 0 0 5px #999;
	display: flex;
	align-items: center;
	padding: 5rpx 0;
	color: #999999;
	background-color: #fff;
}
.tabbar-container .tabbar-item {
	width: 20%;
	height: 100rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
}
.tabbar-container .item-active {
	color: green;
}
.tabbar-container .center-item {
	display: block;
	position: relative;
}
.tabbar-container .tabbar-item .item-top {
	width: 70rpx;
	height: 70rpx;
	padding: 8rpx;
}
.tabbar-container .center-item .item-top {
	flex-shrink: 0;
	width: 120rpx;
	height: 120rpx;
	position: absolute;
	top: -40rpx;
	left: calc(50% - 60rpx);
	border-radius: 50%;
	/* box-shadow: 0 0 5px #999; */
	background-color: #ffffff;
	/* padding: 10rpx; */
}
.tabbar-container .tabbar-item .item-top image {
	width: 100%;
	height: 100%;
}
.tabbar-container .tabbar-item .item-bottom {
	font-size: 28rpx;
	width: 100%;
}
.tabbar-container .center-item .item-bottom {
	position: absolute;
	bottom: -5rpx;
}
</style>