import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import home from './modules/home'
import user from './modules/user'

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    home: home,
    user: user
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
