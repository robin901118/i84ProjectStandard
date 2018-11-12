import {ajax} from './http';

/**
 * +++++++++++++++++++++++++++++++++++
 * api集合
 * +++++++++++++++++++++++++++++++++++
 * */
const isLoginApi = g => ajax('get', '/isLogin', g);//是否登录
const loginOut = g => ajax('get', '/userLogout', g);//登出
const getCode = p => ajax('post', '/register/sendCodeByVerify', p);//获取验证码
const quickLogin = p => ajax('post','/quickLogin',p);//快捷登录

export {
  isLoginApi,
  loginOut,
  getCode,
  quickLogin
}