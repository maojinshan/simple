import { loginBeforeProcessor } from '../config/interceptors/router'

/*
  meta字段定义

  @title  页面的title

  @name  用于topbar的显示文案等使用

  @requireLogin 访问该路由是否需要登录

  @requireAuth: 访问该路由是否需要验证用户权限

  @showInTopbar 当前路由是否需要在topbar中展示

*/

let routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login'),
    beforeEnter: loginBeforeProcessor,
    meta: {
      requireLogin: false,
      title: '登录'
    }
  },
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/Index'),
    children: [
      {
        path: '',
        name: 'test',
        component: () => import('@/pages/Test'),
        meta: {
          title: 'test',
          name: 'test',
          requireLogin: true,
          requireAuth: true,
          showInTopbar: true
        }
      },
      {
        path: 'test',
        name: 'test',
        component: () => import('@/pages/Test'),
        meta: {
          title: 'test',
          name: 'test',
          requireLogin: true,
          requireAuth: true,
          showInTopbar: true
        }
      },
      {
        path: 'test1',
        name: 'test1',
        component: () => import('@/pages/Test1'),
        meta: {
          title: 'test1',
          name: 'test1',
          requireLogin: true,
          requireAuth: true,
          showInTopbar: true
        }
      },
      {
        path: 'test2',
        name: 'test2',
        component: () => import('@/pages/Test2'),
        meta: {
          title: 'test2',
          name: 'test2',
          requireLogin: true,
          requireAuth: true,
          showInTopbar: true
        }
      }
    ]
  },
  {
    path: '/401',
    name: '无权访问',
    component: () => import('@/pages/401'),
    meta: {
      requireLogin: false,
      title: '无权访问'
    }
  },
  {
    path: '/404',
    name: '找不到页面',
    component: () => import('@/pages/404'),
    meta: {
      requireLogin: false,
      title: '找不到页面'
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export default routes
