import Vue from 'vue'
import App from './App'
import router from '@/plugins/router'
import store from '@/plugins/store'
import inject from '@/plugins/inject'
import './plugins/element.js'

inject.install(Vue)

// 开启topbar
Vue.prototype.$enableTopbar = true
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
