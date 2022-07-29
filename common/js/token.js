const BaseURL = "https://miniprogram.api.sisyphe.cn/gateway-api"

const Token=
"eyJ0eXAiOiJKV1QiLCJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJhdWQiOiJTUiIsInN1YiI6IjQxNDkxNzk2NzMxODM4MDU0NiIsInh4Zl9pZCI6NDE0OTE3OTY3MzE4MzgwNTQ1LCJpc3MiOiJodHRwczovL3Bhc3Nwb3J0LnNpc3lwaGUudG9wIiwiaWF0IjoxNjU1Njg5NDEyLCJhcHBfaWQiOjEwNiwibm9uY2UiOiIxZjhmNzViMS1jZGQ0LTQ0ODAtOTcyNy1kOTVhOTI4MDFkZDMifQ.NsvLiQdoDhP__vw3rXOJlya1AbfQEmpAVRQ1NfMeSDs"
export function tokenGet(url, params) {
	return new Promise((resolve, reject) => {
		// #ifdef MP-WEIXIN || APP-PLUS
		url = BaseURL + url;
		// #endif
		uni.request({
			url: url,
			method: 'GET',
			header: {
				'authorization': Token,
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


export function tokenPost(url, params) {
	return new Promise((resolve, reject) => {
		// #ifdef MP-WEIXIN || APP-PLUS
		url = BaseURL + url;
		// #endif
		uni.request({
			url: url,
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
			    'authorization': Token,
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
