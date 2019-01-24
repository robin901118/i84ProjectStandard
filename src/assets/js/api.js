import {ajax} from './http';

/**
 * +++++++++++++++++++++++++++++++++++
 * api集合
 * +++++++++++++++++++++++++++++++++++
 * */
const isLoginApi = g => ajax('get', '/isLogin', g);//是否登录
const quickLogin = p => ajax('post','/quickLogin',p);//快捷登录
const publicApi = p => ajax('post','/api',p);//通用api，用这个接口通过参数action分类

export {
  isLoginApi,
  quickLogin,
  publicApi
}