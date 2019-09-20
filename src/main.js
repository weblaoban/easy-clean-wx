import Vue from 'vue'
import ElementUI from 'element-ui';
import moment from 'moment/moment';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import API from './api/index';
import './assets/rem';
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.prototype.$API = API;
Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  return moment(value).format(formatString);
});
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
