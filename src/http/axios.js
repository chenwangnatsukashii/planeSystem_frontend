// 服务器响应前后拦截
import axios from 'axios'
import qs from 'qs'
import config from '@/config'

// 创建 axios 实例
const {baseUrl, timeout} = config

const ax = axios.create({
  // 是否跨站点访问控制请求使用凭证(Cookie)
  withCredentials: true,
  baseURL: baseUrl.dev, // 配置接口地址
  // headers:{
  //   contentType : "application/json;charset=UTF-8",
  // },
  // headers: {
  //   "Content-Type": "application/x-www-form-urlencoded"
  // },
  // 修改请求的数据再发送到服务器
  transformRequest: [
    (data, headers) => qs.stringify(data) // 序列化请求的数据
  ],
  timeout: timeout // 配置请求超时
})

// 请求拦截
ax.interceptors.request.use(config => {
  // 1. 这个位置就请求前最后的配置
  // 2. 当然你也可以在这个位置 加入你的后端需要的用户授权信息
  // config.headers.common['token'] = ""
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
ax.interceptors.response.use(response => {
  // 请求成功
  // 1. 根据自己项目需求定制自己的拦截
  // 2. 然后返回数据
  return response
}, error => {
  // 请求失败
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        // 对400错误您的处理\
        break
      case 401:
        // 对 401 错误进行处理
        break
      default:
        // 如果以上都不是的处理
        return Promise.reject(error)
    }
  }
})

export default ax
