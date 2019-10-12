import '@/assets/styles/main.scss'
import components from '../components'
import './element'
import ECharts from 'vue-echarts/components/ECharts.vue'
import { myMixin } from '@/mixins'
import directives from '@/directives'
import filters from '@/filters'
import { setEnableRole } from '@/utils/roles'
import { setEnablePageAuth } from '@/utils/pageAuth'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/chart/pie'
// import 'echarts/lib/chart/map'
// import 'echarts/lib/chart/radar'
// import 'echarts/lib/chart/scatter'
// import 'echarts/lib/chart/effectScatter'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/polar'
// import 'echarts/lib/component/geo'
// import 'echarts/lib/component/legend'
// import 'echarts/lib/component/title'
// import 'echarts/lib/component/visualMap'
// import 'echarts/lib/component/dataset'

import chinaMap from 'echarts/map/json/china.json'

// import { Loading } from 'element-ui'
ECharts.registerMap('china', chinaMap)

const installComponent = (Vue, components) => {
  Object.entries(components).forEach(([key, comp]) => {
    Vue.component(comp.name, comp)
  })
}

export default {
  install: (Vue, options) => {
    // 需要在业务中便捷访问的API，统一放置在此处进行注入挂载

    Vue.prototype.$appName = 'demo'

    // 开启页面访问控制
    setEnablePageAuth(Vue, true)

    // 开启功能权限控制
    setEnableRole(Vue, true, true)

    Vue.mixin(myMixin)

    Vue.use(directives)

    Vue.use(filters)

    Vue.component('v-chart', ECharts)

    installComponent(Vue, components)
  }
}
