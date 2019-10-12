import * as types from './mutation-types'
import { login } from '../service/api'

export default {
  state: {
    // 用户信息
    userInfo: window.localStorage.getItem('userInfo')
      ? JSON.parse(window.localStorage.getItem('userInfo'))
      : {}
  },
  mutations: {
    [types.SET_USER_INFO] (state, userInfo) {
      state.userInfo = userInfo
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  },
  actions: {
    async login ({ commit }, params) {
      let { code, data } = await login(params)
      if (code === 200) {
        let { token, userInfo } = data
        commit(types.SET_USER_INFO, { token, userInfo })
      }
      return { code }
    }
  }
}
