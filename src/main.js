import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import VueAppend from 'vue-append'

import Authenticate from '../src/components/Authenticate';
import WishList from '../src/components/WishList';
import Home from '../src/components/Home';

import store from "./store";
import {fire} from './firebase';

Vue.prototype.$firebase = fire;
Vue.config.productionTip = false

fire.auth().onAuthStateChanged( user => {
  store.dispatch("fetchUser", user);
});


const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'open active',
  routes: [
      {
          path: '/authenticate',
          name: 'Authenticate',
          component: Authenticate
      },
      {
          path: '/wishlist',
          name: 'WishList',
          component: WishList
      },
      {
          path: '/home',
          name: 'Home',
          component: Home
      }
  ]
});

const VueFire = require('vuefire')
Vue.use(VueFire);
Vue.use(VueAppend);

new Vue({
  Vuex,
  vuetify,
  VueRouter,
  store,
  router,
  render: h => h(App)
}).$mount('#app')

