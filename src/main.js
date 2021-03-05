import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueAppend from 'vue-append';

import router from './routes/index'
import store from "./store";
import {fire} from './firebase';

Vue.prototype.$firebase = fire;
Vue.config.productionTip = false

fire.auth().onAuthStateChanged( user => {
  store.dispatch("fetchUser", user);
});


const VueFire = require('vuefire')
Vue.use(VueFire);
Vue.use(VueAppend);

new Vue({
  Vuex,
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')

