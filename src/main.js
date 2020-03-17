// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App'
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'weui/dist/style/weui.min.css'
import 'jquery/src/jquery.js';
Vue.config.productionTip = false

// import store from '@/common/shareStore'
// import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    message: 'Hello!',
    templateName: 'korea',
    songs: []
  },
  mutations: {
    setTemplateName(state, value) {
      state.templateName = value
    },
    push(state, ele) {
      state.songs.push(ele)
    },
    clear(state) {
      state.songs = []
    },
    clearByTitle(state, title) {
      state.songs.splice(state.songs.findIndex(e => e.title == title), 1)
    }

  },
  actions: {
  }
})


/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
