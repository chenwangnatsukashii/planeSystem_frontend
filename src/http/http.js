// 封装axios请求
import axios from "./axios.js"

export default {
  /**
   * get 请求
   * @param url 接口路由
   * @param auth 是否需要带登录信息
   * @returns {AxiosPromise<any>}
   */
  get(url, data, auth = false) {
    if (auth) {
      return axios.get(url, data, {headers: {Authorization: 'Your back-end plane_system authenticates information'}});
    } else {
      return axios.get(url, data);
    }
  },

  get_with_params(url, data, auth = false) {
    if (auth) {
      return axios.get(url, data, {headers: {Authorization: 'Your back-end plane_system authenticates information'}});
    } else {
      let _params
      if (Object.is(data, undefined)) {
        _params = ''
      } else {
        _params = '?'
        for (const key in data) {
          if (data.hasOwnProperty(key) && data[key] !== null) {
            _params += `${key}=${data[key]}&`
          }
        }
      }
      return axios.get(`${url}${_params}`)
    }
  },

  /**
   * post 请求
   *
   * @param url 接口路由
   * @param data 接口参数
   * @param auth 是否需要带登录信息
   * @returns {AxiosPromise<any>}
   */
  post(url, data, auth = false) {
    if (auth) {
      return axios.post(url, data, {headers: {Authorization: 'Your back-end plane_system authenticates information'}});
    } else {
      return axios.post(url, data, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [(data) =>
          this.transParams(data)
        ]
      });
    }
  },

  post_list(url, data, auth = false) {
    if (auth) {
      return axios.post(url, data, {headers: {Authorization: 'Your back-end plane_system authenticates information'}});
    } else {
      return axios.post(url, data, {
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        transformRequest: [
          (data) => JSON.stringify(data) // 序列化请求的数据
        ]
      });
    }
  },

  // post_list(url, data, auth = false) {
  //   if (auth) {
  //     return axios.post(url, data, {headers: {Authorization: 'Your back-end plane_system authenticates information'}});
  //   } else {
  //     return axios.post(url, data, {
  //       headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  //       transformRequest: [
  //         function (data) { // 解决传递数组变成对象的问题
  //           Object.keys(data).forEach((key) => {
  //             if ((typeof data[key]) === 'object') {
  //               data[key] = JSON.stringify(data[key]) // 这里必须使用内置JSON对象转换
  //             }
  //           })
  //           data = qs.stringify(data) // 这里必须使用qs库进行转换
  //           return data
  //         }
  //       ]
  //     });
  //   }
  // },

  /**
   * put请求
   * @param url 接口路由
   * @param data 接口参数
   * @param auth 是否需要带登录信息
   * @returns {AxiosPromise<any>}
   */
  put(url, data, auth = false) {
    if (auth) {
      return axios.put(url, data, {headers: {Authorization: 'Your back-end plane_system authenticates information'}});
    } else {
      return axios.put(url, data, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [(data) =>
          this.transParams(data)
        ]
      });
    }
  },

  transParams(params) {
    let result = ''
    Object.keys(params).forEach((key) => {
      if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
        result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
      }
    })
    return result
  },

  /**
   * 删除
   * @param url 接口路由
   * @param auth 是否需要带登录信息
   * @returns {AxiosPromise}
   */
  del(url, auth = false) {
    if (auth) {
      return axios.delete(url, {headers: {Authorization: 'Your back-end plane_system authenticates information'}});
    } else {
      return axios.delete(url);
    }
  },

  /**
   * 上传文件
   * @param url 接口路由
   * @param file 接口文件
   * @param auth 是否需要带登录信息
   */
  uploader(url, file, auth = false) {
    let param = new FormData();
    param.append("file", file)
    if (auth) {
      return axios.post(url, param, {headers: {Authorization: 'Your back-end plane_system authenticates information'}})
    } else {
      return axios.post(url, param)
    }
  }
}
