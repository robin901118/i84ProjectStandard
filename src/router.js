import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);


/**
 * +++++++++++++++++++++++++++++++++++
 * 路由加载（懒加载）
 * +++++++++++++++++++++++++++++++++++
 * */
const Home = resolve => require(['@/views/index.vue'], resolve);
const notFind = resolve => require(['@/views/404.vue'], resolve);


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
      path: "*",
      name: "notFind",
      component: notFind,
      meta: {requireAuth: false, title: '404', index: 9999}
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {requireAuth: false, title: 'hello 爱巴士', index: 1}
    }
  ]
});

export default router;