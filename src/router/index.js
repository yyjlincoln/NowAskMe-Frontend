import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../views/main.vue'
import get_started from '../views/auth/get_started.vue'
import page_unavailable from '../views/general/page_unavailable.vue'
import verification from '../views/auth/verification.vue'
import setup from '../views/user/setup.vue'
import legal from '../views/legal/legal.vue'
import tos from '../views/legal/tos.vue'
import privacy from '../views/legal/privacy.vue'
import dashboard from '../views/app/dashboard.vue'
import diagnostics from '../views/general/diagnostics.vue'
import app from '../views/app/app.vue'
import friends from '../views/app/friends.vue'
import box from '../views/app/box.vue'
import settings from '../views/app/settings.vue'
import logout from '../views/auth/logout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: main
  },
  {
    name: 'login',
    path: '/get-started',
    component: get_started
  },
  {
    name: 'verification',
    path: '/verification',
    component: verification
  },
  {
    name: 'app',
    path: '/app',
    component: app,
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        component: dashboard
      },
      {
        name: 'friends',
        path: '/friends',
        component: friends
      },
      {
        name: 'box',
        path: '/box',
        component: box
      },
      {
        name: 'settings',
        path: '/settings',
        component: settings
      }
    ]
  },
  {
    name: 'legal',
    path: '/legal',
    component: legal,
    children: [
      {
        name: 'privacy',
        path: 'privacy',
        component: privacy
      },
      {
        name: 'tos',
        path: 'tos',
        component: tos
      },
    ]
  },
  {
    name: 'setup',
    path: '/setup',
    component: setup
  },
  {
    name: 'logout',
    path: '/logout',
    component: logout
  },
  {
    path: '/diagnostics',
    name: 'diagnostics',
    component: diagnostics

  },
  {
    path: '*',
    component: page_unavailable
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
