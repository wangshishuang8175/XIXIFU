
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import zdyTabbar from "@/components/zdy-tabbar/zdy-tabbar.vue"
Vue.component('zdy-tabbar', zdyTabbar)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store'
// import zdyTabbar from "@/components/zdy-tabbar/zdy-tabbar.vue"
// app.component('zdy-tabbar', zdyTabbar)


export function createApp() {
  const app = createSSRApp(App).use(store)
  return {
    app
  }
}
// #endif