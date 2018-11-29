// import Vue from 'vue'
// import Router from 'vue-router'

Vue.use(VueRouter);

/**
 * +++++++++++++++++++++++++++++++++++
 * 路由加载（懒加载）
 * +++++++++++++++++++++++++++++++++++
 * */
const Home = resolve => require(['@/views/index.vue'], resolve);
const notFind = resolve => require(['@/views/404.vue'], resolve);
const imgEditor = resolve => require(['@/views/imgEditor.vue'], resolve);


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
    },
    {
      path: '/imgEditor',
      name: 'imgEditor',
      component: imgEditor,
      meta: {requireAuth: false, title: '修改头像', index: 2}
    }
  ]
});

export default router;