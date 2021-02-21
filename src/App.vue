<template>
  <div id="app">
    <div id="content">
      <router-view></router-view>
    </div>
    <van-grid id="gridbar" clickable>
      <van-grid-item icon="music-o" text="beat" to="/beat" />
      <van-grid-item icon="search" text="ppt-lyric" to="/lyric" />
      <van-grid-item icon="eye-o" text="ppt-tmplate" to="/template" />
      <van-grid-item icon="good-job-o" text="donate" to="/donate" />
    </van-grid>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'app',
  metaInfo: {
    title: 'praise slowly v1.5',
    link: [{ rel: 'icon', href: '/site-icon.png' }],
  },

  props: {
    ...mapState(['songs']),
  },
  mounted: function () {
    // document.addEventListener(
    //   'touchstart',
    //   (event) => {
    //     if (event.touches.length > 1) {
    //       console.log('zoom plz stahp')
    //       event.preventDefault()
    //       event.stopPropagation() // maybe useless
    //     }
    //   },
    //   { passive: false }
    // )
  },
})
</script>
<style scoped>
@import './common/css/common.css';
#gridbar {
  position: fixed;
  width: 100%;
  bottom: 0;
}
#content {
  padding-bottom: 125px;
}
</style>
