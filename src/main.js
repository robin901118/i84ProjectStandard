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


/**
 * +++++++++++++++++++++++++++++++++++
 * 封装、组件、全局组件引入
 * +++++++++++++++++++++++++++++++++++
 * */
import './cube-ui'
import {getStore, decrypt, encrypt} from './assets/js/common'
import {loginOut, isLoginApi} from './assets/js/api';


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
Vue.config.productionTip = false;


/**
 * +++++++++++++++++++++++++++++++++++
 * 路由拦截
 * +++++++++++++++++++++++++++++++++++
 * */
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    console.log('是否登录',!getStore('isLogin'));
    console.log('是否有手机号',!getStore('userPhone'));
    console.log('联合起来',!(getStore('isLogin') || getStore('userPhone')));
    //更改title
    document.title = to.meta.title;

    if (!(getStore('isLogin') || getStore('userPhone'))) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}//携带redirect地址，方便登陆成功返回原地址
      });
    } else {
      /*从vuex中获取登录状态和手机号,根据状态调用判断登录接口,避免频繁请求*/
      if (store.state.isLogin && store.state.userMobile) {
        document.title = to.meta.title;//更改title
        next();
      }
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
