import {ajax} from './http';

/**
 * +++++++++++++++++++++++++++++++++++
 * api集合
 * +++++++++++++++++++++++++++++++++++
 * */
const isLoginApi = g => ajax('get', '/isLogin', g);//是否登录
const quickLogin = p => ajax('post','/quickLogin',p);//快捷登录
const getData = p => ajax('post','/getData',p);//测试api

export {
  isLoginApi,
  quickLogin,
  getData
}