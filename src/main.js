import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './cube-ui'
import {getStore, removeStore, decrypt, encrypt} from './assets/js/common'
import {loginOut, isLoginApi} from './assets/js/api';
import vconsole from 'vconsole';
new vconsole();

/*全局变量*/
Vue.prototype._Decrypt=decrypt;//解密
Vue.prototype._Encrypt=encrypt;//加密

/*路由拦截授权*/
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    /*如果localStorage中的信息没了，也执行登出并跳转登录界面*/
    if (!(getStore('isLogin') || getStore('userPhone'))) {
      loginOut().then(() => {
        next({
          path: '/login',
          query: {redirect: to.fullPath}//携带redirect地址，方便登陆成功返回原地址
        });
      });
    } else {
      /*从vuex中获取登录状态和手机号,根据状态调用判断登录接口,避免频繁请求*/
      if (store.state.isLogin && store.state.userMobile) {
        document.title = to.meta.title;//更改title
        next();
      } else {
        isLoginApi().then(res => {
          /*具体参数参照api返回字段*/
          if (res['loginFlag']) {
            document.title = to.meta.title;//更改title
            /*状态和手机号码，手机号码从localstorage中取出需要解密，然后存入vuex中*/
            store.commit("SET_LOGIN", {
              userState:true,
              userMobile:decrypt(getStore('userPhone'))
            });
            next();
          } else {
            /*删除localstorage中的数据*/
            removeStore('isLogin');
            removeStore('userPhone');
            /*没登录则跳转到登录界面*/
            next({
              path: '/login',
              query: {redirect: to.fullPath}
            });
          }
        });
      }
    }
  } else {
    //更改title
    document.title = to.meta.title;
    next();
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
