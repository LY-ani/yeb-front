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
    if (!window.sessionStorage.getItem('user')) {
      // 判断用户信息是否存在
      return getRequest('./admin/info').then(res => {
        if (res) {
          // 存入用户信息
          window.sessionStorage.setItem('user', JSON.stringify(res));
          next();
        }
      })
    }
    next();
  } else {
    if (to.path == '/') {
      next();
    } else {
      // 未登录时直接在地址栏中打开系统里的路径，先打开登录界面，登录后直接打开要进入的界面，在Login.vue中处理
      next('/?redirect=' + to.path)
    }
  }

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')