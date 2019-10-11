import Vue from 'vue'
import Vuex from 'vuex'
import {TOKEN, SUCCESS_CODE, USER_INFO} from "../common/js/const"
import {getUserInfoApi, loginApi, logoutApi} from "../api/user"

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        hasLogin: false, // 是否已经登录
        user: { // 用户信息
            username: "",
            mobile: "",
            channelNum: ""
        },
        tabBar: ["/pages/index/index", "/pages/my-order/my-order", "/pages/personal/personal", "/pages/product/product"],
        orderTabbarId: 0 // 订单页tabbarId

    },
    mutations: {
        setOrderTabbarId(state, id) {
            state.orderTabbarId = id
        },


        /*登录成功*/
        login(state, data) {
            state.hasLogin = true
            state.user = {
                username: data.user.userName,
                mobile: data.user.mobile,
                channelNum: data.user.channelNum
            }
            // 存储登录信息Token
            uni.setStorageSync(TOKEN, data.token)
            uni.setStorageSync(USER_INFO, data.user)
        },
        /*退出登录*/
        logout(state) {
            state.hasLogin = false
            state.user = {
                username: "",
                mobile: "",
                channelNum: ""
            }

            // 移除登录token信息
            uni.removeStorageSync(TOKEN)
            uni.removeStorageSync(USER_INFO)

        },


    },
    actions: {
        login({commit, state}, params) {
            console.log(params, "login")
            loginApi(params).then(res => {
                if (res.status === SUCCESS_CODE) {

                    const data = res.data
                    // 注册成功并且登录成功
                    commit("login", {
                        token: data.token,
                        user: {
                            userName: data.userName,
                            mobile: data.mobile,
                        }
                    })
                    console.log(params.route, "sdfsfsdfsdf")
                    if (params.route) {

                        if (state.tabBar.indexOf(params.route) > -1) {
                            uni.switchTab({
                                url: params.route
                            })
                        } else {
                            uni.redirectTo({
                                url: params.route
                            })
                        }

                    } else {
                        uni.switchTab({
                            url: "/pages/index/index"
                        })
                    }

                } else {
                    uni.showToast({
                        title: res.msg,
                        icon: "none"
                    })
                }
            }).catch(()=>{
              uni.hideLoading()
            })
        },
        logout({commit}) {
            logoutApi().then(res => {
                if (res.status === SUCCESS_CODE) {
                    commit("logout")
                    uni.reLaunch({
                        url: '/pages/login/login'
                    });
                }
            })
        },

        /*获取用户信息*/
        getUserInfo({commit}, token = uni.getStorageSync(TOKEN)) {
            getUserInfoApi().then(res => {
                const data = res.data
                console.log(data.name)
                if (res.status === SUCCESS_CODE) {
                    commit("login", {
                        token: token,
                        user: {
                            userName: data.name,
                            mobile: data.phone,
                            channelNum: data.channelNum,
                        }
                    })
                }
            })
        }
    }
})

export default store
