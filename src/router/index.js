import VueRouter from 'vue-router'
import Vue from 'vue'
import ECharts from '@/components/ECharts.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/echarts',
      name: 'ECharts',
      component: ECharts
    }
  ]
})

export default router