// 本文件主要是注入axios相关拦截器
import axios from 'axios'
import { AXIOS_DEFAULT_CONFIG } from '@/config'
import {
  requestSuccessProcessor,
  requestErrorProcessor,
  responseSuccessProcessor,
  responseErrorProcessor
} from '@/config/interceptors'

const getHttpInstance = config => {
  let axiosInstance = axios.create({
    ...AXIOS_DEFAULT_CONFIG,
    ...config
  })
  // 注入请求拦截
  axiosInstance.interceptors.request.use(
    requestSuccessProcessor,
    requestErrorProcessor
  )
  // 注入响应拦截
  axiosInstance.interceptors.response.use(
    responseSuccessProcessor,
    responseErrorProcessor
  )

  return axiosInstance
}

export {
  getHttpInstance,
  axios
}
