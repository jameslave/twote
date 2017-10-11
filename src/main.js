// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import * as firebase from 'firebase/app';
import 'firebase/database';
import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App'
import router from './router'

Vue.use(VueAxios, axios);

const config = {
  databaseURL: 'https://twote-c9c93.firebaseio.com/',
};
firebase.initializeApp(config);

Vue.prototype.$firebase = firebase;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
