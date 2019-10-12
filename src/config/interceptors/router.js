import Vue from 'vue'
import { isInPaths } from '../../utils/pageAuth'
import store from '../../store'

/**
 * @description: 路由全局守卫配置
 * @param {Object}
 *  {
 *    to, from, next
 * }
 * @return:
 */
export const routerBeforeProcessor = (to, from, next) => {
  let token = store.state.userInfo.token
  document.title = to.meta.title || 'template'
  let enableAuth = Vue.prototype.enableRole
  if (to.meta.requireLogin) {
    // 需要登录访问
    if (!token) {
      // 未登录状态，先去登录
      next({ path: '/login', query: { redirect: to.fullPath } })
    } else {
      // 已登录, 判断是否开启了访问权限认证
      if (enableAuth) {
        // 已开启
        if (isInPaths(to.path)) {
          // 有权限，直接访问
          next()
        } else {
          // 无权限访问，提示联系管理员
          next('/401')
        }
      } else {
        // 未开启验证权限，直接访问
        next()
      }
    }
  } else {
    next()
  }
}

export const routerAfterProcessor = () => {}

/**
 * @description: 登录页面路由拦截器
 * @param {Object}
 *  {
 *    to, from, next
 *  }
 * @return:
 */
export const loginBeforeProcessor = (to, from, next) => {
  let token = store.state.userInfo.token
  if (token) {
    next(from.fullPath)
  } else next()
}
export default {
  routerBeforeProcessor
}
