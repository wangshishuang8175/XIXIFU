<template>
	<view class="container">
		<view class="img">
			<image src="/static/icon/welcome.png"></image>
		</view>
		<view class="btn">
			<button type="primary" @click="setStor(),minecode()">
				<image src="/static/icon/wexin.png" mode=""></image>
				<text>授权登录</text>

			</button>
		</view>
		<view class="xieyi" @click="postcode()">
			<label class="radio">
				<radio />
			</label>
			我已阅读并同意
			<uni-link>《用户协议》</uni-link>和<uni-link>《隐私政策》</uni-link>
		</view>
	</view>
</template>

<script>
	import {
		requestPost,
		requestGet
	} from '@/common/js/codes.js';
	export default {
		data() {
			return {
				code: "",
				mytoken: {}
			}
		},
		created() {
			this.getlogin()
		},
		methods: {
			getUserInfo() {
				uni.getUserInfo({
					provider: 'weixin',
					success: (res) => {
						console.log('getUserInfo', res);
					},
				});
			},
			getlogin() {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						console.log('res-login', res);
						this.code = res.code;
						console.log('code', res.code);
						console.log(this.code, "wdwdwd");
						if (res.errMsg == 'login:ok') {
							//TODO 获取code 携带code参数调用后端接口}
							console.log("err");
						}
					}
				})
			},
			setStor() {
				console.log(this.mytoken,"wdttttt");
				uni.setStorage({
					key: 'token',
					data: this.mytoken,
					success() {
						console.log('存储成功')
					},

				})
			},
			getStorage() {
				uni.getStorage({
					key: 'historys',
					success: res => {
						console.log(res)
					}
				})
			},
			async postcode() {
				uni.login({
					success: async (res) => {
						let result = await requestPost("/user-center-web/third-part/weixin-mini-apps/signon", {
							"code": res.code,
							"stationCode": "CSNA00",
							"stationName": "线上商城_书店",
							"xxfAppId": 106
						});
						// result.statusCode == 200 ? this.mytoken = result.data : ""
						console.log(result, "jjjjjj");
					}
				})
			},
			minecode(){
				uni.switchTab({
					url:"/pages/code/code"
				})
			}
		}

	}
</script>

<style lang="less" scoped>
	.container {
		.img {
			background-color: transparent;

			image {
				width: 100%
			}
		}

		.btn {
			button {
				background-color: green;
				margin-left: 10px;
				margin-right: 10px;
				height: 60px
			}

			image {
				width: 30px;
				height: 28px;
				position: relative;
				top: 12px
			}

			text {
				color: white;
				position: relative;
				left: 10px;
				top: 5px
			}
		}

		.xieyi {
			margin-left: 10px;
			margin-top: 12px;

			.radio {

				radio {
					transform: scale(0.7)
				}

			}

			uni-link {
				color: orange;
			}

		}
	}
</style>
