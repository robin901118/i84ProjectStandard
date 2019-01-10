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
      meta: {requireAuth: false, title: '主页', index: 1}
    }
  ]
});

export default router;