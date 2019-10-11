/*
 * @Description:
 * @Author: 毛金山(maojs@autoai.com)
 * @LastEditors: 毛金山(maojs@autoai.com)
 * @Date: 2019-04-18 18:30:39
 * @LastEditTime: 2019-05-31 13:15:34
 */

/**
 * @description: 路由全局守卫配置
 * @param {Object}
 *  {
 *    to, from, next
 * }
 * @return:
 */
export const routerBeforeProcessor = (to, from, next) => {
  // let token = null
  document.title = to.meta.title || 'template'
  // if (to.meta.requireAuth && !token) {
  //   return next({ path: '/login', query: { redirect: to.fullPath } })
  // }
  next()
}

export const routerAfterProcessor = () => {
}

/**
 * @description: 登录页面路由拦截器
 * @param {Object}
 *  {
 *    to, from, next
 *  }
 * @return:
 */
export const loginBeforeProcessor = (to, from, next) => {
  let token = null
  if (token) {
    next(from.fullPath)
  } else next()
}
export default {
  routerBeforeProcessor
}
