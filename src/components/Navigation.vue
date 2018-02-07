<template lang="html">
  <nav class="navigation">

    <div class="navigation__top">
      <router-link to="/">
        <img src="http://placehold.it/150x25">
      </router-link>

      <div style="display: flex; flex-direction: row; align-items: center; justify-">
        <p v-if="userData.firstName !== undefined">Welcome, {{ userData.firstName }}</p>
        <img v-if="userData.avatar !== undefined" :src="userData.avatar" style="border-radius: 50%; max-width: 100%; width: 30px;" />
      </div>
    </div>

    <div class="navigation__bottom">
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li v-if="!authorized">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="!authorized">
          <router-link to="/signup">Signup</router-link>
        </li>
        <li v-if="authorized">
          <a href="#" @click="logout">Logout</a>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li v-if="authorized">
          <router-link to="/profile">Your Profile</router-link>
        </li>
      </ul>
    </div>

  </nav>
</template>

<script lang="js">
  import { logout } from '@/api/auth'

  export default  {
    name: 'Navigation',
    methods: {
      logout() {
        logout(this)
      }
    },
    computed: {
      authorized() {
        return this.$store.getters.isAuthorized
      },

      userData() {
        return this.$store.state.user.userData
      }
    }
  }
</script>

<style scoped lang="scss">
  .navigation {
    ul {
      li {
        list-style-type: none;
        display: inline-block;
        padding-right: 20px;

        a {
          text-decoration: none;
          color: #42b983;

          &:hover {
            opacity: .5;
          }

          &.router-link-exact-active {
            border-bottom: 1px solid #42b983;
          }
        }
      }
    }
  }
</style>
