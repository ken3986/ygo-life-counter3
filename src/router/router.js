import Vue from 'vue'
import VueRouter from 'vue-router'

// import Test from '@/views/Test.vue'
import Calculator from '@/views/Calculator.vue'
import Logs from '@/components/Logs.vue'
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
    component: Calculator,
    meta: { title: 'ygo-life-counter' }
  },
  // {
  //   path: '/',
  //   name: 'Test',
  //   component: Test,
  // },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs,
    meta: { title: 'ygo-life-counter-logs' }
  },
  {
    path: '/bar',
    name: 'Bar',
    component: Bar,
    meta: { title: 'ygo-life-counter-bar' }
  }
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  // base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router
