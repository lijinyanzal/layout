<template>
  <div id="app">
    <Header></Header>
    <Layout></Layout>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/views/Header'
import Layout from '@/views/Layout'

export default {
  name: 'App',
  components: {
    Header,
    Layout
  }
}
</script>

<style>
#app {
  margin: 40px 0;
}
</style>
