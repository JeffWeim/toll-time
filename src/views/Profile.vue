<template lang="html">

  <section class="profile">
     <h2>Username: {{ user.name }}</h2>

    <h2>Email: {{ user.email }}</h2>

    <h2>Account Created On: {{ parseDate(user.dateCreated) }}</h2>

    <img :src="user.avatar" style="border-radius: 50%;"/>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'profile',
    methods: {
      parseDate (string) {
        if (string !== undefined && string.length > 0) {
          let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          let newDate = new Date(string.slice(0, 10))
          let year = newDate.getFullYear()
          let month = newDate.getUTCMonth()
          let day = newDate.getDate()

          return months[month] + ' ' + day + ', ' + year
        } else {
          return 'Waiting'
        }
      }
    },
    computed: {
      user() {
        return this.$store.state.user.userData
      }
    },
    mounted() {}
}
</script>

<style scoped lang="scss">
  .profile {

  }
</style>
