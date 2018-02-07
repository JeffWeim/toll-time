<template>
  <div class="home">
    <welcome v-if="!authorized"></welcome>
    <mappie v-else></mappie>
  </div>
</template>

<script>
  import Mappie from '@/components/Mappie'
  import Welcome from '@/components/Welcome'

  export default {
    name: 'HomeView',
    components: {
      Mappie,
      Welcome
    },
    computed: {
      authorized() {
        return this.$store.getters.isAuthorized
      }
    },
    destroyed() {
      this.$store.dispatch('setLoggedOutMessage', '')
    }
  }
</script>

<style scoped></style>
