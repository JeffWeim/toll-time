<template>
  <main id="app">
    <div class="wrapper">
      <navigation></navigation>

      <router-view></router-view>

      <footie></footie>
    </div>
  </main>
</template>

<script>
  import Navigation from '@/components/Navigation'
  import Footie from '@/components/Footie'
  import { checkAuth, session } from '@/api/auth'

  export default {
    name: 'App',
    components: {
      Navigation,
      Footie
    },
    beforeUpdate() {
      let isAuthorized = checkAuth(this)
      this.$store.dispatch('setAuthentication', isAuthorized)
    },
    created() {
      let self = this

      if (self.$store.state.user.userData.length === undefined && localStorage.getItem('token')) {
        self.$store.dispatch('getUserData', {
          user: localStorage.getItem('id_token'),
          router: self.$router,
          vue: self
        })
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }
</style>
