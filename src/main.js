// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'

// Import Libs
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.GOOGLE_API_KEY,
    libraries: 'places, directions'
  }
})

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  ...App
})

export default { app, store, router }
