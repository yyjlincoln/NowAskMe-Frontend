import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../views/main.vue'
import get_started from '../views/auth/get_started.vue'
import page_unavailable from '../views/general/page_unavailable.vue'
import email_verification from '../views/auth/email_verification.vue'
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
    name: 'email_verification',
    path:'/email_verification',
    component: email_verification
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
