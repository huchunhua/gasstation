// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import Antd from 'ant-design-vue';
import Qs from 'qs'
import Utils from './utils/utils';
import 'ant-design-vue/dist/antd.css';
import './assets/style/cmmon.css';


Vue.config.productionTip = false;

Vue.use(Antd);

Vue.prototype.$http = Axios;
Vue.prototype.$utils = Utils;
/* eslint-disable no-new */
Axios.interceptors.request.use(
  config => {
    var _token = Utils.cookie.get('token');
    if (_token) {
      if (typeof(config.data) == "undefined") {
        config.data = {token: _token};
      } else {
        config.data.token = _token;
      }
    }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    if (config.method === 'post') {
      config.data = Qs.stringify(config.data)
    }
    config.url = Utils.config.ApiBaseUri + config.url;
    return config;
  },
  err => {
    return Promise.reject(err);
  });
Axios.interceptors.response.use(response => {
  return response
}, error => {
  //请求错误时做些事
  return Promise.reject(error)
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})