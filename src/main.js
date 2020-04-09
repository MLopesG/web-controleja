import Vue from 'vue'
import App from './App.vue'

import './registerServiceWorker'
import router from './router'
import modal from 'vue-js-modal';

Vue.use(modal);
Vue.config.productionTip = false;


new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
