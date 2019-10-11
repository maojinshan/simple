import { loginBeforeProcessor } from '../config/interceptors/router'

/*
  meta字段定义

  @requireAuth 访问该路由是否需要验证用户权限

  @title  页面的title

*/

let routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login'),
    beforeEnter: loginBeforeProcessor,
    meta: {
      requireAuth: false,
      title: '登录'
    }
  },
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/Index'),
    meta: {
      requireAuth: false,
      title: '首页'
    }
  }
]

export default routes
