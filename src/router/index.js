import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../views/main.vue'
import get_started from '../views/auth/get_started.vue'
import page_unavailable from '../views/general/page_unavailable.vue'
import verification from '../views/auth/verification.vue'
import setup from '../views/user/setup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: main
  },
  {
    name:'login',
    path:'/get-started',
    component: get_started
  },
  {
    name: 'verification',
    path:'/verification',
    component: verification
  },
  {
    name:'setup',
    path:'/setup',
    component: setup
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
