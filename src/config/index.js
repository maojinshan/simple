// 是否开启权限认证
export const IS_ENABLE_AUTH = true
// 路由默认配置
export const ROUTER_DEFAULT_CONFIG = {
  base: '/',
  waitForData: true,
  transitionOnLoad: true
}

// axios默认配置
export const AXIOS_DEFAULT_CONFIG = {
  timeout: 20000,
  maxContentLength: 2000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Cache-Control': 'no-cache'
  }
}

// 上传文件时axios配置
export const UPLOAD_CONFIG = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

// http数据请求baseURL
const baseURL = {
  local: '',
  dev: '',
  beta: '',
  prod: ''
}

export const BASE_URL = baseURL[process.env.VUE_APP_ENV]

// vuex 默认配置
export const VUEX_DEFAULT_CONFIG = {
  strict: process.env.NODE_ENV !== 'production'
}
