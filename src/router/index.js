import VueRouter from 'vue-router'
import Vue from 'vue'
import Layout from '@/views/Layout.vue'
import ECharts from '@/components/ECharts.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout
    },
    {
      path: '/echarts',
      name: 'ECharts',
      component: ECharts
    }
  ]
})

export default router