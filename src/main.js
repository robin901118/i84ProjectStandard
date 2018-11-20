/**
 * +++++++++++++++++++++++++++++++++++
 * 基础引入
 * +++++++++++++++++++++++++++++++++++
 * */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import moment from 'moment'
import goodStorage from 'good-storage'
import VueLazyImageLoading from 'vue-lazy-image-loading'


/**
 * +++++++++++++++++++++++++++++++++++
 * 封装、组件、全局组件引入
 * +++++++++++++++++++++++++++++++++++
 * */
import './cube-ui'
import {decrypt, encrypt} from './assets/js/common'
Vue.use(VueLazyImageLoading);



/**
 * +++++++++++++++++++++++++++++++++++
 * vconsole调试
 * +++++++++++++++++++++++++++++++++++
 * */
import vconsole from 'vconsole';
new vconsole();


/**
 * +++++++++++++++++++++++++++++++++++
 * 全局变量
 * +++++++++++++++++++++++++++++++++++
 * */
Vue.prototype.$decrypt = decrypt;//解密
Vue.prototype.$encrypt = encrypt;//加密
Vue.prototype.$moment = moment;//格式化时间
Vue.prototype.$storage = goodStorage;//封装好的storage
Vue.config.productionTip = false;


/**
 * +++++++++++++++++++++++++++++++++++
 * 路由拦截
 * +++++++++++++++++++++++++++++++++++
 * */
router.beforeEach((to, from, next) => {
  //更改title
  document.title = to.meta.title;
  if (to.matched.some(res => res.meta.requireAuth)) {
    if (!(goodStorage.get('isLogin') || goodStorage.get('userPhone'))) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}//携带redirect地址，方便登陆成功返回原地址
      });
    } else {
      next();
    }
  } else {
    next();
  }
});


/**
 * +++++++++++++++++++++++++++++++++++
 * 实例化vue
 * +++++++++++++++++++++++++++++++++++
 * */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
