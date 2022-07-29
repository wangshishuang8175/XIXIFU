const BaseURL = "https://miniprogram.api.sisyphe.cn/gateway-api/mini-app-mobile-client/app/anonymous"


export function requestGet(url, params) {
	return new Promise((resolve, reject) => {
		// #ifdef MP-WEIXIN || APP-PLUS
		url = BaseURL + url;
		// #endif
		uni.request({
			url: url,
			method: 'GET',
			data: params,
			success: res => {
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}


export function requestPost(url, params) {
	return new Promise((resolve, reject) => {
		// #ifdef MP-WEIXIN || APP-PLUS
		url = BaseURL + url;
		// #endif
		uni.request({
			url: url,
			method: 'POST',
			header: {
				'Content-Type': 'application/json'
			},
			data: params,
			success: res => {
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}
