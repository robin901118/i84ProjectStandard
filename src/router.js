import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

/**
 * +++++++++++++++++++++++++++++++++++
 * 路由加载（懒加载）
 * +++++++++++++++++++++++++++++++++++
 * */
const Home = resolve => require(['@/views/index.vue'], resolve);
const Login = resolve => require(['@/views/login.vue'], resolve);


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
      meta: {requireAuth: true, title: '主页', index: 1}
    },{
      path: '/',
      name: 'login',
      component: Login,
      meta: {requireAuth: false, title: '登录', index: 2}
    }
  ]
});


export default router;