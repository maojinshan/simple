import Vue from 'vue'
import Router from 'vue-router'
import ROUTES from '@/routes'
import { ROUTER_DEFAULT_CONFIG } from '@/config'
import { routerBeforeProcessor, routerAfterProcessor } from '@/config/interceptors/router'

Vue.use(Router)

// 注入默认配置和路由表
let router = new Router({
  ...ROUTER_DEFAULT_CONFIG,
  routes: ROUTES
})
// 注入拦截器
router.beforeEach(routerBeforeProcessor)
router.afterEach(routerAfterProcessor)

export default router
