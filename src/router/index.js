import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/page/:pagename',
      component: HelloWorld,
      // meta: {keepAlive: true},
    },
    {
      path: '/',
      redirect: '/page/lyric',
      // meta: {keepAlive: true},
    }
  ]
})
