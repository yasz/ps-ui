<template>
  <router-link
    :to="url"
    class="weui-tabbar__item ybutton-icon weui-tabbar__icon fa fa-fw"
    :class="icon"
  >
    <p class="ybutton-label weui-tabbar__label">{{text}}</p>
  </router-link>
</template>

<script>
export default {
  name: 'BottomTab',
  props: { link: { default: '' }, text: '', url: '', icon: '' }
}
</script>
