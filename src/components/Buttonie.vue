<template lang="html">

  <section class="button">
    <button v-if="locate" @click="emitLocate" :class="color">{{ text }}</button>
    <button v-else :class="color">{{ text }}</button>
  </section>

</template>

<script lang="js">
  import { eventBus } from '@/event-bus'

  export default  {
    name: 'Buttonie',
    props: {
      color: String,
      locate: Boolean,
      text: String
    },
    methods: {
      emitLocate () {
        eventBus.$emit('locateUser')
      }
    }
  }
</script>

<style scoped lang="scss">
  .button {
    button {
      margin-bottom: 2rem;
      border: none;
      padding: 15px;
      color: white;
      border-radius: 15px;
      cursor: pointer;
      opacity: 1;
      outline: none;
      transition: opacity 250ms ease;

      &:hover {
        opacity: .8;
      }

      &.teal {
        background-color: #42b983
      }
    }
  }
</style>
