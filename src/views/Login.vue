<template lang="html">
  <section class="login">
    <form>
      <label>Email:</label>
      <input type="email" name="email" v-model="email"/>

      <br/>

      <label>Password:</label>
      <input type="password" name="password" v-model="password"/>

      <br/>

      <p class="login__error-message" v-if="error.length">{{ error }}</p>

      <button @click.prevent="login">Login</button>
    </form>
  </section>
</template>

<script lang="js">
  import { login } from '@/api/auth'

  export default  {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        error: ''
      }
    },
    methods: {
      login() {
        let creds = {
          email: this.email,
          password: this.password
        }

        login(this, creds, { redirect: '/', withCredentials: true })
      }
    }
  }
</script>

<style scoped lang="scss">
  .login {
    &__error-message {
      color: red;
      font-weight: bold;
    }
  }
</style>
