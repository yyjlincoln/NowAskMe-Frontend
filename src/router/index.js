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
import stream from '../views/app/stream.vue'
import friends_add from '../views/app/friends_add.vue'
import login_qr from '../views/auth/qr.vue'
import login_password from '../views/auth/password.vue'
import user_profile from '../views/user/profile.vue'
import licenses from '../views/legal/licenses.vue'
import me from '../views/app/me.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: main,
    meta: { title: "Nowaskme" }
  },
  {
    name: 'login',
    path: '/get-started',
    component: get_started,
    meta: { title: "Get started" }
  },
  {
    name: 'login_qr',
    path: '/login/qr',
    component: login_qr,
    meta: { title: "Login via QR Code" }
  },
  {
    name: 'login_password',
    path: '/login/password',
    component: login_password,
    meta: { title: "Login via password" }
  },
  {
    name: 'verification',
    path: '/verification',
    component: verification,
    meta: { title: "Verify your email address" }
  },
  {
    name: 'app',
    path: '/app',
    component: app,
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        component: dashboard,
        meta: { title: "Dashboard" }
      },
      {
        name: 'friends',
        path: '/friends',
        component: friends,
        meta: { title: "Friends" }
      },
      {
        name: 'box',
        path: '/box',
        component: box,
        meta: { title: "Box" }
      },
      {
        name: 'settings',
        path: '/settings',
        component: settings,
        meta: { title: "Settings" }
      },
      {
        name: 'stream',
        path: '/stream',
        component: stream,
        meta: { title: "Stream" }
      },
      {
        name: 'friends_add',
        path: '/friends/add',
        component: friends_add,
        meta: { title: "Search for a friend" }
      },
      {
        name: 'me',
        path: '/me',
        component: me
      },
      {
        name: 'user_profile',
        path: '/user/:uuid',
        component: user_profile,
        meta: { title: "Profile" }
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
        component: privacy,
        meta: { title: "Legal" }
      },
      {
        name: 'tos',
        path: 'tos',
        component: tos,
        meta: { title: "Terms of Service" }
      },
      {
        name: 'licenses',
        path: 'licenses',
        component: licenses,
        meta: { title: "Licenses" }
      }
    ]
  },
  {
    name: 'setup',
    path: '/setup',
    component: setup,
    meta: { title: "Setup your account" }
  },
  {
    name: 'logout',
    path: '/logout',
    component: logout
  },
  {
    path: '/diagnostics',
    name: 'diagnostics',
    component: diagnostics,
    meta: { title: "Diagnostics" }

  },
  {
    path: '*',
    component: page_unavailable,
    meta: { title: "Error" }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

router.afterEach((to) => {
  // Wait for the next DOM update cycle
  Vue.nextTick(() => {
    document.title = to.meta.title ? to.meta.title + " - Anonymous Q&A" : "Nowaskme - Anonymous Q&A"
  })
})

export default router
