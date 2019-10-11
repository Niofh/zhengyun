import Vue from 'vue'
import App from './App'
import store from './store'

import {SUCCESS_CODE, TOKEN} from "./common/js/const"
import {tokenInterceptor} from "./common/js/interceptor"
import {OrderStatusEnum, SubOrderStatusEnum} from "./common/js/enum"

Vue.config.productionTip = false

App.mpType = 'app'


Vue.prototype.$store = store


Vue.prototype.$SUCCESS_CODE = SUCCESS_CODE
Vue.prototype.$TOKEN = TOKEN

/**
 * 登录拦截器
 * @type {tokenInterceptor}
 */
Vue.prototype.$TokenInterceptor = tokenInterceptor

Vue.filter('orderFilter', function (value) {
    return OrderStatusEnum.getEnumName(value)
})

Vue.filter('subOrderFilter', function (value) {
    return SubOrderStatusEnum.getEnumName(value)
})
const app = new Vue({
    ...App,
    store
})
app.$mount()
