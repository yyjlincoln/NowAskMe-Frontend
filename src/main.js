import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false


import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax, {
  // options here
})
import nowaskmeapi from "./utils/nowaskmeapi.js"

Vue.use(nowaskmeapi)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
