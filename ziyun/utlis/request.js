/**
 * uni-app：  uni.request 封装
 * Api ：https://uniapp.dcloud.io/api/request/request
 */

import {TOKEN} from "./const"

let BASE_URL = ""
if (process.env.NODE_ENV === 'development') {

  console.log('开发环境')

  BASE_URL = "http://172.30.10.145:8081"

} else {
  console.log('生产环境')

  BASE_URL = "http://172.30.10.62:8081"
}


class Request {
  constructor() {
    // 私有属性
    this._baseUrl = BASE_URL
    this._header = {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    // 异常处理
    this._errorHandler = function (res) {
      if (res.errMsg === "request:fail") {
        uni.showToast({
          icon: "none",
          title: '网络异常',
          duration: 2000
        })
      }
    }
  }

  /**
   * 设置统一的异常处理
   */
  setErrorHandler(handler) {
    this._errorHandler = handler;
  }

  /**
   * GET类型的网络请求
   */
  getRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'GET').then(res => res.data)
  }

  /**
   * POST类型的网络请求
   */
  postRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'POST').then(res => res.data)
  }

  requestAll(url, data, header, method) {

    try {
      header["Admin-Token"] = uni.getStorageSync(TOKEN)
    } catch (e) {

    }

    return new Promise((resolve, reject) => {
      uni.request({
        url: this._baseUrl + url,
        data: data,
        header: header,
        method: method,
        success: ((res) => {
          if (res.statusCode === 200) {  // http请求是200

            if (res.data.status === 401) {
              uni.reLaunch({
                url: "/pages/login/login"
              })
              uni.removeStorageSync(TOKEN)

            } else {
              //200: 服务端业务处理正常结束
              resolve(res)
            }

          } else {
            if (this._errorHandler != null) {
              // http 500 ,401等配置写在这里
              //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
              this._errorHandler(res)
            }
            //其它错误，提示用户错误信息
            reject(res)
          }
        }),
        fail: (res => {
          //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
          if (this._errorHandler != null) {
            this._errorHandler(res)
          }
          console.log(res)
          reject(res)
        })
      })
    })
  }
}

export default Request
