import Vue from 'vue'
import Router from 'vue-router'
import RouterRules from './rules'
import Utils from "../utils/utils";
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

Vue.use(Router);

const router = new Router(RouterRules);

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (to.meta.requireAuth) {
    if (Utils.cookie.get('token') && Utils.cookie.get('islogin') ==='station' ) {
      next();
    }else{
      router.push('/login');
    }
  }
  next();
})

export default router
