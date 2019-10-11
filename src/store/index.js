import * as types from './mutation-types'
import { login } from '../service/api'

export default {
  state: {
    userInfo: {}
  },
  mutations: {

    [types.SET_USER_INFO] (state, userInfo) {
      state.userInfo = userInfo
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
