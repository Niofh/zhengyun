import axios from 'axios'
import { getToken } from './auth'
// 创建axios实例
const service = axios.create({
  withCredentials: true,
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 50000 // 请求超时时间
})

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// request拦截器
service.interceptors.request.use(
  config => {
    config.params = config.params || {}
    config.data = config.data || {}
    console.log(config)
    if (getToken()) {
      config.headers['api_token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    console.log('response', response)
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    return response.data
  },
  error => {
    console.log(error && error.response)
    return Promise.reject(error.response)
  }
)

export default service
