import { loginBeforeProcessor } from '../config/interceptors/router'

/*
  meta字段定义

  @requireAuth 访问该路由是否需要验证用户权限

  @title  页面的title

  @name  用于topbar的显示文案等使用

  @showInTopbar 当前路由是否需要在topbar中展示

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
    },
    children: [
      {
        path: 'test',
        name: 'test',
        component: () => import('@/pages/Test'),
        meta: {
          requireAuth: false,
          title: 'test',
          name: 'test',
          showInTopbar: true
        }
      },
      {
        path: 'test1',
        name: 'test1',
        component: () => import('@/pages/Test1'),
        meta: {
          requireAuth: false,
          title: 'test1',
          name: 'test1',
          showInTopbar: true
        }
      }
    ]
  }
]

export default routes
