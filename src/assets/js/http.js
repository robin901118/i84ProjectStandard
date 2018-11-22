import axios from 'axios';
import QS from 'qs';
import {isJson} from "./common.js";
import store from '../../store/'

/*
    'http://chentzc.i84.com.cn:8080';//测试 -陈天柱
    "http://hongsjd.i84.com.cn:8085";  // 测试 -洪澍珺
    "http://clife.ngrok.i84.com.cn";  // 测试
    "http://tujfc.i84.com.cn:8080";//涂建飞
  */
const baseUrl = 'http://clife.ngrok.i84.com.cn';
const CancelToken = axios.CancelToken;
axios.defaults.baseURL = baseUrl;


/**
 * +++++++++++++++++++++++++++++++++++
 * 请求拦截
 * +++++++++++++++++++++++++++++++++++
 * */
axios.interceptors.request.use(
  config => {
    /*post请求头*/
    config.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    if (config.method === 'post') {
      /*在发送请求之前如果是post请求则序列化参数*/
      config.data = QS.stringify(config.data);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });


/**
 * +++++++++++++++++++++++++++++++++++
 * 响应拦截
 * +++++++++++++++++++++++++++++++++++
 * */
axios.interceptors.response.use(
  response => {
    return response["data"];
  },
  /*服务器错误状态*/
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求';
          break;

        case 403:
          error.message = '拒绝访问';
          break;

        case 404:
          error.message = "啊哦,页面丢失了...";
          break;

        case 405:
          error.message = '请求方法未允许';
          break;

        case 408:
          error.message = '请求超时';
          break;

        case 500:
          error.message = '服务器端出错';
          break;

        case 501:
          error.message = '网络未实现';
          break;

        case 502:
          error.message = '网络错误';
          break;

        case 503:
          error.message = '服务不可用';
          break;

        case 504:
          error.message = '网络超时';
          break;

        case 505:
          error.message = 'http版本不支持该请求';
          break;

        default:
          error.message = `连接错误${error.response.status}`;
      }
      return Promise.reject(error.message);
    }
  }
);

/**
 * +++++++++++++++++++++++++++++++++++
 * 通用ajax请求封装函数
 * @param type String 请求方式
 * @param url  String API地址
 * @param pms  Object 请求参数
 * +++++++++++++++++++++++++++++++++++
 * */
export async function ajax(type = 'get', url, pms) {
  try {
    store.commit("SET_LOADING", true);//打开loading
    let resData = await axios({
      url: url,
      method: type,
      data: pms,
      /*取消请求，如果有页面需要用到取消当前请求，则直接调用window.cancelRequire方法*/
      cancelToken: new CancelToken(c => {
        window.cancelRequire = c;
      })
    });

    /*服务端异常信息验证*/
    if (typeof resData === "string") throw resData;
    if (!isJson(resData)) throw "系统正在维护,请稍后再试!";
    if (resData["_code"] !== '99999') throw resData["_msg"];
    store.commit("SET_LOADING", false);

    /*抛出data*/
    return Promise.resolve(resData["_result"]);
  } catch (e) {
    /*服务端异常信息处理*/
    store.commit("SET_LOADING", false);
    let error = e;
    if (typeof e !== "string") error = e.toString();
    store.commit('SET_ERR_DIALOG', {show: true, txt: error});
    return false;
  }
}

export {baseUrl};
















