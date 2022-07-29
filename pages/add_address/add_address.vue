<template>
	<view>
		<form>
			<view class="formbox">
				<view class="">
					<view class="cu-form-group margin-top">
						<view class="title">收件人</view>
						<input v-model="addressee" placeholder="请输入姓名" name="input">
					</view>
					<view class="cu-form-group">
						<view class="title">联系电话</view>
						<input v-model="telephone" placeholder="请输入电话" name="input">
						<view class="cu-capsule radius">
							<view class='cu-tag bg-blue '>
								+86
							</view>
							<view class="cu-tag line-blue">
								中国大陆
							</view>
						</view>
					</view>


					<view class="cu-form-group">
						<view class="title">地址选择</view>
						<picker mode="region" @change="RegionChange" :value="region">
							<view class="picker">
								{{region[0]}}，
								{{region[1]}}，
								{{region[2]}}
							</view>
						</picker>
					</view>

					<view class="cu-form-group align-start">
						<view class="title">详细地址</view>
						<textarea v-model="address" maxlength="-1" :disabled="modalName!=null" @input="textareaBInput"
							placeholder="请输入详细地址"></textarea>
					</view>

					<view class="cu-form-group margin-top">
						<view class="title">设为默认地址</view>
						<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
					</view>
				</view>

				<view class="btnbox">
					<button class="btn" @click="addaddress(),tianjia()">保存</button>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	import {
		tokenPost,
		tokenGet,
	} from '@/common/js/token.js';
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				region: ['江苏省', '无锡市', '滨湖区'],
				modalName: null,
				textareaAValue: '',
				textareaBValue: '',

				// 新增地址
				address: "",
				addressee: "",
				areaId: "region[2]",
				areaType: "",
				cityId: "region[1]",
				isDefault: 0,
				provinceId: "region[0]",
				telephone: "",

				// 是否默认地址
				switchA: false,
			};
		},
		created() {
			// this.addaddress()
		},
		methods: {
		...mapMutations("location", ["addlocation"]),
			tianjia(){
				var dingwei={
						"address": this.address,
						"addressee": this.addressee,
						"areaId": 1367,
						"areaType": 1,
						"cityId": 112,
						"isDefault": 0,
						"provinceId": 10,
						"telephone": this.telephone,
					};
					this.addlocation(dingwei)		
			},
			RegionChange(e) {
				this.region = e.detail.value
			},

			textareaBInput(e) {
				this.textareaBValue = e.detail.value
			},

			async addaddress() {
				console.log("xxxxxxxxxxxxxxxxx");
				let result = await tokenPost(
					"/mini-app-mobile-client/app/user/address/save", {
						"address": this.address,
						"addressee": this.addressee,
						"areaId": 1367,
						"areaType": 1,
						"cityId": 112,
						"isDefault": 0,
						"provinceId": 10,
						"telephone": this.telephone,
					}
				);
				console.log(this.address, this.addressee, this.telephone, "aaasasasssas");
				console.log(result, "hsdhjsgdbsjdbsdsdsdsdhhhhhhhh");
				if (result.code == 200) {
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1500);
					uni.showToast({
						title: '添加成功',
						duration: 1500
					});
				}
			},

			SwitchA(e) {
				this.switchA = e.detail.value
			},
		},
		// computed: {
		
		// 	...mapState("location", {
		// 		city: "city",
		// 		locations: "locations",
		// 	}),
		
		// },
	}
</script>

<style lang="less" scoped>
	.cu-form-group .title {
		min-width: calc(4em + 15px);

		.cu-btn {
			color: green;
		}
	}

	.formbox {
		display: flex;
		flex-direction: column;
		height: 100vh;

		.btnbox {
			display: flex;
			flex: 1;
			align-items: flex-end;
			margin-bottom: 100rpx;

			.btn {
				background-color: #1A6840;
				color: white;
				margin: 0 40rpx;
				border-radius: 30rpx;
				width: 800rpx;
			}
		}
	}
</style>
