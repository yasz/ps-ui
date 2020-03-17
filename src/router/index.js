import Vue from 'vue'
import VueRouter from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import YExport from '@/components/page/YExport.vue'
import YLyric from '@/components/page/YLyric.vue'
import YTemplate from '@/components/page/YTemplate.vue'
import YAboutme from '@/components/page/YAboutme.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: YLyric,
  },
  {
    path: '/lyric',
    component: YLyric,
  }
  ,
  {
    path: '/about',
    component: YAboutme,
    // meta: {keepAlive: true},
  },
  {
    path: '/template',
    component: YTemplate,
    // meta: {keepAlive: true},
  },
  {
    path: '/export',
    component: YExport,
    // meta: {keepAlive: true},
  },
  {
    path: '/test',
    component: {
      template: `<h1>测试</h1>`
    }
    // meta: {keepAlive: true},
  }, {
    path: '/test2',
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/About.vue")
    // meta: {keepAlive: true},
  }
]
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
