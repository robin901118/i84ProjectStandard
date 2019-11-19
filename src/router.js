import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFind from '@/views/404.vue'
import Home from '@/views/index.vue'
Vue.use(VueRouter)

/**
 * +++++++++++++++++++++++++++++++++++
 * 路由配置
 * meta--requireAuth (该页面是否需要登录后才可进)
 * meta--title(页面标题)
 * meta--index(页面层级，主要给页面切换效果使用)
 * +++++++++++++++++++++++++++++++++++
 * */
const router = new VueRouter({
  routes: [
    {
      path: '*',
      name: 'notFind',
      component: NotFind,
      meta: { requireAuth: false, title: '404', index: 9999 }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requireAuth: false, title: 'hello 爱巴士', index: 1 }
    }
  ]
})

export default router
