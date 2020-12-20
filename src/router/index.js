import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../views/main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: main
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
