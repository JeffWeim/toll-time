<template lang="html">

  <section class="welcome">
    <h3 v-if="loggedOutMessage.length">{{ loggedOutMessage }} </h3>

    <p>Please <router-link to="/login">login</router-link> (or <router-link to="/signup">sign-up</router-link>) to get started.</p>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'Welcome',
    computed: {
      loggedOutMessage () {
        return this.$store.state.user.loggedOutMessage
      }
    }
  }
</script>

<style scoped lang="scss">
  .welcome {
    a {
      text-decoration: none;
      color: #42b983;
    }
  }
</style>
