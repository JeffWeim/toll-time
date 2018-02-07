import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import store from '@/store/index'

Vue.use(Router)
Vue.use(VueResource)
Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';

const router = new Router({
  hashbang: false,
  linkActiveClass: 'active',
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['@/views/Home.vue'], resolve),
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/views/Login.vue'], resolve),
    },
    {
      path: '/signup',
      name: 'Signup',
      component: resolve => require(['@/views/Signup.vue'], resolve),
    },
    {
      path: '/profile',
      name: 'Profile',
      component: resolve => require(['@/views/Profile.vue'], resolve),
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'About',
      component: resolve => require(['@/views/About.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched[0].meta.requiresAuth) {
    if (!store.state.user.isAuthorized) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
