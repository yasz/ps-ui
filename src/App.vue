<template>
  <div id="app">
    <div>
      <router-view></router-view>
    </div>
    <div class="weui-tabbar">
      <span class="weui-badge" style="position:absolute;top: -.4em;right: 30%;">{{songs.length}}</span>
      <!-- 这个是红色的数量标 -->
      <BottomTab :icon="'fa-file'" :url="'/lyric'" :text="'歌词'"></BottomTab>
      <BottomTab :icon="'fa-bars'" :url="'/template'" :text="'模板'"></BottomTab>
      <BottomTab :icon="'fa-file-powerpoint-o'" :url="'/export'" :text="'导出'"></BottomTab>
      <BottomTab :icon="'fa-heart-o'" :url="'/about'" :text="'我'"></BottomTab>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import BottomTab from '@/components/basic/BottomTab.vue'
export default {
  name: 'app',
  computed: {
    ...mapState(['songs'])
  },
  components: { BottomTab }
}
</script>
<style scoped>
@import './common/css/common.css';
.weui-tabbar {
  height: 60px;
  position: absolute;
  bottom: 0px;
}
</style>
