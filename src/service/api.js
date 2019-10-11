/*
 * @Description:
 * @Author: 毛金山(maojs@autoai.com)
 * @LastEditors: 毛金山(maojs@autoai.com)
 * @Date: 2018-12-21 16:31:00
 * @LastEditTime: 2019-06-17 10:24:23
 */
import { getHttpInstance } from '@/plugins/axios'
import { BASE_URL } from '@/config'

// V2.0版本接口
let http = getHttpInstance({ baseURL: BASE_URL })
let exportHttp = getHttpInstance({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/x-download;charset=utf-8',
    'Cache-Control': 'no-cache'
  },
  responseType: 'blob'
})

// 登录模块
// 登录
export const login = params => http.get('/login/login', { params }).then(data => data)

// 导出文件
export const exportData = (path, params) => exportHttp.get(path, { params }).then(data => data)
