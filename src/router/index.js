import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../views/main.vue'
import get_started from '../views/auth/get_started.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: main
  },
  {
    path:'/get-started',
    component: get_started
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
