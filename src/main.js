// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import router from './router'
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'weui/dist/style/weui.min.css'
import 'jquery/jquery.js';
// import 'jquery-weui/dist/js/jquery-weui.min.js'
// import 'jquery-weui/dist/js/swiper.min.js'
// import 'jquery-file-download/src/Scripts/jquery.fileDownload.js'
// import 'jquery-weui/dist/lib/zepto.js'
import App from './App'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
