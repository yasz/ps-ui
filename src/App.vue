<template>
  <div id="app">
    <router-view></router-view>
    <!--<keep-alive>-->
    <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
  <!--</keep-alive>-->
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
@import './common/css/common.css';
</style>
