<template>
  <div id="app">
    <v-header></v-header>
    <router-view/>
  </div>
</template>
<script>
  import Header from './views/header/Header'
  export default {
    name: 'app',
    components: {
      'v-header': Header
    }
  }
</script>
<style lang="stylus">
@import './assets/fonts/fonts.css'
@import './assets/stylus/base.styl'
#app
  /*font-family 'PingFang'*/
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
  height: 100%
</style>
