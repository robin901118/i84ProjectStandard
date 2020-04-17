/**
 * +++++++++++++++++++++++++++++++++++
 * 基础引入
 * +++++++++++++++++++++++++++++++++++
 * */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Http from './assets/js/http'
import goodStorage from 'good-storage'

/**
 * +++++++++++++++++++++++++++++++++++
 * 封装、组件、全局组件引入
 * +++++++++++++++++++++++++++++++++++
 * */
import './cube-ui'

/**
 * +++++++++++++++++++++++++++++++++++
 * 全局变量
 * +++++++++++++++++++++++++++++++++++
 * */

Vue.prototype.$http = new Http()// 封装好的请求
Vue.prototype.$storage = goodStorage
Vue.config.productionTip = false

/**
 * +++++++++++++++++++++++++++++++++++
 * 环境配置
 * +++++++++++++++++++++++++++++++++++
 * */
switch (process.env.VUE_APP_CURRENTMODE) {
  //测试环境
  case "test":
    const VConsole = require('vconsole');
    new VConsole();//测试服开启debug
    break;

  //本地开发环境
  case "mock":
    require('./mock');//引入mock数据
    break;
}

/**
 * +++++++++++++++++++++++++++++++++++
 * 实例化vue
 * +++++++++++++++++++++++++++++++++++
 * */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
