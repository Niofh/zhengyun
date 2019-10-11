import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'


/**
 * 登录拦截器
 * @type {tokenInterceptor}
 */
// Vue.prototype.$TokenInterceptor = tokenInterceptor

const app = new Vue({
    ...App
})
app.$mount()
