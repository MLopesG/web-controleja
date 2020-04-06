import Vue from 'vue'
import App from './App.vue'

import Notifications from 'vue-notification';


import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false;

Vue.use(Notifications);

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
