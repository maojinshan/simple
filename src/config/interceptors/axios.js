/*
 * @Description:
 * @Author: 毛金山(maojs@autoai.com)
 * @LastEditors: 毛金山(maojs@autoai.com)
 * @Date: 2018-12-21 16:29:03
 * @LastEditTime: 2019-07-22 14:50:06
 */

import { Message } from 'element-ui'
import router from '@/plugins/router'
import _ from 'lodash'

/**
 * @description: ajax请求成功拦截器
 * @param {Object}
 * @return: Object
 */
export const requestSuccessProcessor = config => {
  let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
  let token = userInfo && userInfo.token
  if (token) config.headers.common['token'] = token

  switch (config.method) {
    case 'get':
      config.params = _.pickBy(config.params, item => { return item !== '' && item !== null })
      break
    case 'post':
    case 'put':
    case 'delete':
      config.data = _.pickBy(config.data, item => { return item !== '' && item !== null })
      break
    default :
      break
  }

  if (config.method === 'post' && config.data) {
    let deleteArray = [null, '', 'all', undefined]
    Object.keys(config.data).forEach(key => deleteArray.includes(config.data[key]) && delete config.data[key])
    config.data instanceof FormData && (config.headers['Content-Type'] = 'multipart/form-data')
  }
  // config.params = config.data

  return config
}

/**
 * @description: ajax请求失败拦截器
 * @param {error}
 * @return: null
 */
export const requestErrorProcessor = error => {
  return Promise.reject(error).catch(error => {
    console.log(error)
    return null
  })
}

/**
 * @description: ajax响应成功拦截器
 * @param {Object}
 * @return: Object
 * {
 *  code: 200,
 *  data: {},
 *  message: '成功'
 * }
 */
export const responseSuccessProcessor = response => {
  let resData = response.data || {}

  // 流文件直接下载
  if (resData instanceof Blob) return resData

  let { code, message } = resData
  // loadingInstance.close()

  switch (code) {
    case 200: // 业务处理成功

      return resData
    case 4010:// token失效

      sessionStorage.removeItem('userInfo')
      router.replace('/login')
      return resData
    default:
      //
      Message.error({ message })

      return resData
  }
}

/**
 * @description: ajax响应错误拦截器
 * @param {error}
 * @return: {}
 */
export const responseErrorProcessor = error => {
  if (error.toString().search('timeout') !== -1) {
    // 实现超时的逻辑
    Message.error({ message: '请求超时' })
  }
  return Promise.reject(error).catch(error => {
    console.log(error)
    return {}
  })
}
