<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/views/Header'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
#app {
  padding: 0 3%;
  margin: 40px 0;
}
</style>
