import Vue from 'vue'
import VueRouter from 'vue-router'

import Logs from '@/components/Logs.vue'
import Calculator from '@/views/Calculator.vue'
import Bar from '@/views/Bar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'Calculator',
    component: Calculator
  },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs
  },
  {
    path: '/bar',
    name: 'Bar',
    component: Bar
  }
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
