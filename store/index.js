//新建store/index.js

import {
	createStore
} from "vuex";
import  search from "@/store/search.js";
import  goods from "@/store/goods.js"
// 可以在组件中通过this.$store.state.xx 来访问store中的数据
export default createStore({
	// state: {

	// },
	// mutations: {

	// },
	// actions: {
		
	// },
	// getters: {

	// },
	 modules: {
	search,
	goods
	  },
});