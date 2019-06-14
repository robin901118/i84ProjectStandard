/**
 * +++++++++++++++++++++++++++++++++++
 * 基础引入
 * +++++++++++++++++++++++++++++++++++
 * */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import dayjs from 'dayjs'
import Http from './assets/js/http';
import goodStorage from 'good-storage'
import VueLazyImageLoading from 'vue-lazy-image-loading'
import Navigation from 'vue-navigation';
import lodash from 'lodash';

/**
 * +++++++++++++++++++++++++++++++++++
 * 封装、组件、全局组件引入
 * +++++++++++++++++++++++++++++++++++
 * */
import './cube-ui'
import  lbImageEditor from 'lb-image-editor'
Vue.use(VueLazyImageLoading);//图片懒加载
Vue.use(lbImageEditor);//图片编辑器
Vue.use(Navigation,{router,store});

/**
 * +++++++++++++++++++++++++++++++++++
 * vconsole调试
 * +++++++++++++++++++++++++++++++++++
 * */
// import vconsole from 'vconsole';
// new vconsole();

/**
 * +++++++++++++++++++++++++++++++++++
 * 全局变量
 * +++++++++++++++++++++++++++++++++++
 * */
Vue.prototype.$day = dayjs;//格式化时间
Vue.prototype.$http = Http;//封装好的请求
Vue.prototype.$lodash = lodash;//lodash库
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
  next();
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
