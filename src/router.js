import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

/**
 * +++++++++++++++++++++++++++++++++++
 * 路由加载（懒加载）
 * +++++++++++++++++++++++++++++++++++
 * */
const Home = resolve => require(['@/views/index.vue'], resolve);


/**
 * +++++++++++++++++++++++++++++++++++
 * 路由配置
 * +++++++++++++++++++++++++++++++++++
 * */
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {requireAuth: false, title: '主页', index: 1}
    }
  ]
});


export default router;