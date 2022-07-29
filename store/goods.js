const goodsModule = {
	namespaced: true,
	state: {
		city: uni.getStorageSync("city") || "无锡",
		carts: uni.getStorageSync("carts") || [],
		// buybook: uni.getStorageSync("num") || {},
		
		// zancun:[],
	},
	mutations: {
		addtocarts(state, payload) {	
		var currentGood = state.carts.find(item => {
						if (item.spuId == payload.spuId) {
							return item;
						}
					})
					if (currentGood) {
						currentGood.quantity += payload.quantity
					} else {
						state.carts.push(payload)
					}
					//vuex持久化
					uni.setStorageSync('carts', state.carts)
		// console.log(this,"qqthisisisisi");
		// console.log(payload,"1ww111");
		// this.state.$set(zancun,key:"buynum",value:1):1
			// this.state.$set(state.zancun, 'buynum', 1)
			// this.$set(payload, 'buymoney', 0)
			// console.log(this,"nssnxklnknnnnn");
			// if (payload.isbn) {
			// 	// arr3=arr2.filter(item=>item.id == 20) 
			// 	// state.carts = state.carts.filter(item => item.buynum++)
			// 	// state.carts = state.carts.filter(item => item.buynum * item.salePrice)
			// 	uni.setStorageSync("carts", state.carts);
			// 	console.log("woyunxingle，小车一开");
			// } else {
				// payload.buymoney = payload.salePrice;
				// state.carts.push(payload);
				// history必须增加一个state.history前缀，否则无法将单纯的一个history识别为一个变量
				// uni.setStorageSync("carts", state.carts);
				console.log("woyunxingle，小车一开");
			// }

		},
		cuttocarts(state,payload){
			var reduceGood = state.carts.find(item => {
							if (item.skuId == payload.skuId) {
								return item;
							}
						})
						if (reduceGood.quantity>1) {
							console.log(payload,"pppppppppppppppppppppppppppppppppppppppppppppppppppppppp");
							console.log(reduceGood,"sxssxsxsrrrrrrrrrrrrrrrrrr");
							reduceGood.quantity -= reduceGood.quantity
						} 
		},
	},
	actions: {

	},
	getters: {

	}
};

export default goodsModule;
