import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../views/main.vue'
import get_started from '../views/auth/get_started.vue'
import page_unavailable from '../views/general/page_unavailable.vue'
import register from '../views/auth/register.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: main
  },
  {
    path:'/get-started',
    component: get_started
  },
  {
    path:'/register',
    component: register
  },
  {
    path:'*',
    component: page_unavailable
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
