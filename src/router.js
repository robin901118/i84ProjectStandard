import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

/*按需加载*/
const Home = resolve => require(['@/views/index.vue'], resolve);
const Login = resolve => require(['@/views/login.vue'], resolve);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {requireAuth: false, title: '主页',index:1}
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {requireAuth: false, title: '登录',index:2}
        }
    ]
});


export default router;