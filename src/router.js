import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFind from '@/views/404.vue'
import Home from '@/views/index.vue'
Vue.use(VueRouter)

/**
 * +++++++++++++++++++++++++++++++++++
 * 重写路由的push方法
 * +++++++++++++++++++++++++++++++++++
 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

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
      meta: { requireAuth: false, title: '404', index: 9999, keepAlive: false, scrollTop: 0}
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requireAuth: false, title: 'hello 爱巴士', index: 1, keepAlive: false, scrollTop: 0}
    }
  ]
})

/**
 * +++++++++++++++++++++++++++++++++++
 * 路由拦截
 * +++++++++++++++++++++++++++++++++++
 * */
router.beforeEach((to, from, next) => {
  if (from.meta.keepAlive) {                                                      //+++++++++++Keep-alive页面+++++++++++
    const $content = document.querySelector('#content');                 //保存当前页面的滚动条位置，提供给keep-alive
    const scrollTop = $content ? $content.scrollTop : 0;                          //使用
    from.meta.scrollTop = scrollTop;
  }

  // 更改title
  document.title = to.meta.title
  next()
})

export default router
