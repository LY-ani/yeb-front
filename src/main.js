import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'

import {
  postRequest
} from "./utils/api";
import {
  putRequest
} from "./utils/api";
import {
  getRequest
} from "./utils/api";
import {
  deleteRequest
} from "./utils/api";
import {
  initMenu
} from './utils/menus';

Vue.config.productionTip = false

Vue.use(ElementUI);

// 以插件的形式使用： this.postRequest
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 判断用户是否已经登录
  if (window.sessionStorage.getItem('tokenStr')) {
    initMenu(router, store);
    next();
  } else {
    // if (to.path == '/') {
    // }
    next();
  }

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')