<template lang="html">

  <footer class="footer">
    <ul class="footer_links">
      <li class="footer_link">&copy; 2017 Toll-Time</li>
      <li class="footer_link">
        <router-link to="/about">About</router-link>
      </li>
    </ul>
  </footer>

</template>

<script lang="js">
  export default  {
    name: 'Footie'
  }
</script>

<style scoped lang="scss">
  .footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    height: 60px;

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

          &.active {
            border-bottom: 1px solid #42b983;
          }
        }
      }
    }
  }
</style>
