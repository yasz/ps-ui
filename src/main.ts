// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import router from "./router";
import App from "./App.vue";

// import 'font-awesome/css/font-awesome.css';
// import 'bootstrap/dist/css/bootstrap.css'
// import 'weui/dist/style/weui.min.css'
Vue.config.productionTip = false;

import Vuex, { StoreOptions, MutationTree } from "vuex";
// import * as types from "./mutations-types";
Vue.use(Vuex);
const mutations: MutationTree<any> = {
  ["SET_SINGER"](state, data: number): void {
    state.initNumber += data;
  }
};
const store = new Vuex.Store({
  state: {
    message: "Hello!",
    templateName: "korea",
    songs: <any>[]
  },
  mutations: {
    setTemplateName(state, value) {
      state.templateName = value;
    },
    push(state, ele: any) {
      state.songs.push(ele);
    },
    clear(state) {
      state.songs = [];
    },
    clearByTitle(state, title) {
      state.songs.splice(state.songs.findIndex((e: any) => e.title == title));
    }
  },
  actions: {}
});

/* eslint-disable no-new */

new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App },
  store,
  render: h => h(App)
}).$mount("#app");
