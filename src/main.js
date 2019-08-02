/**
 * +++++++++++++++++++++++++++++++++++
 * 基础引入
 * +++++++++++++++++++++++++++++++++++
 * */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import Http from './assets/js/http'
import Navigation from 'vue-navigation'

/**
 * +++++++++++++++++++++++++++++++++++
 * 封装、组件、全局组件引入
 * +++++++++++++++++++++++++++++++++++
 * */
import './cube-ui'
Vue.use(Navigation, { router, store })

/**
 * +++++++++++++++++++++++++++++++++++
 * 全局变量
 * +++++++++++++++++++++++++++++++++++
 * */

Vue.prototype.$http = Http// 封装好的请求
Vue.config.productionTip = false

/**
 * +++++++++++++++++++++++++++++++++++
 * 路由拦截
 * +++++++++++++++++++++++++++++++++++
 * */
router.beforeEach((to, from, next) => {
  // 更改title
  document.title = to.meta.title
  next()
})

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
