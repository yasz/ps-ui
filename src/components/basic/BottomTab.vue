<template>
  <router-link :to="url" class="ybutton-icon fa fa-fw" :class="icon">
    <p class="ybutton-label tabbar">{{ text }}</p>
  </router-link>
</template>

<script>
export default {
  name: 'BottomTab',
  props: { link: { default: '' }, text: '', url: '', icon: '' },
}
</script>
