const searchModule = {
	namespaced: true,
	state: {
		city: uni.getStorageSync("city") || "无锡",
		history: uni.getStorageSync("history") || [],
		keyword:uni.getStorageSync("keywords") || "",
	},
	mutations: {
		addhistory(state, payload) {
			state.history.push(payload.key);
			// history必须增加history前缀，否则无法将单纯的一个history识别为一个变量
			uni.setStorageSync("history",state.history);
                 console.log("woyunxingl");
		}
	},
	actions: {

	},
	getters: {
           
	}
};

export default searchModule;
