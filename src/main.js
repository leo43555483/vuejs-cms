// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import _ from 'lodash'
import axios from 'axios'
import router from './router'
import ElementUi from 'element-ui'
import store from '../store'
import './assets/less/main.less'
import './assets/less/transition.less'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false;
Vue.use(ElementUi);
Vue.prototype.$_ = _;
Vue.prototype.$http = axios;
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
