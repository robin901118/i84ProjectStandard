import axios from 'axios';
import QS from 'qs';
import store from '../../store';
import {Dialog} from 'cube-ui';
import {baseUrl} from "./common";
import router from '../../router';

const CancelToken = axios.CancelToken;

/**
 * +++++++++++++++++++++++++++++++++++
 * 封装的请求类
 * ajax()  =>  单个请求方法
 * all()  =>  并发请求方法
 * +++++++++++++++++++++++++++++++++++
 * */
class Http {
  constructor(publicPath) {
    this.$http = axios.create();
    this.$http.defaults.baseURL = publicPath;
    this.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    /*请求拦截*/
    this.$http.interceptors.request.use(
      config => {
        if (config.method === 'post') {
          config.data = QS.stringify(config.data);//序列化参数
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  /**通用错误数据处理**/
  publicError(error) {
    /*返回错误信息*/
    let message = '连接服务器失败';
    if (error.response) {
      switch (error.response.status) {
        case 400:
          message = '错误请求';
          break;

        case 403:
          message = '拒绝访问';
          break;

        case 404:
          message = "啊哦,接口404...";
          break;

        case 405:
          message = '请求方法未允许';
          break;

        case 408:
          message = '请求超时';
          break;

        case 500:
          message = '服务器端出错';
          break;

        case 501:
          message = '网络未实现';
          break;

        case 502:
          message = '网络错误';
          break;

        case 503:
          message = '服务不可用';
          break;

        case 504:
          message = '网络超时';
          break;

        case 505:
          message = 'http版本不支持该请求';
          break;

        default:
          message = `错误代码:${error.response.status}`;
      }
    }
    store.commit('SET_ERR_DIALOG', {show: true, txt: message});
  }

  /**
   * +++++++++++++++++++++++++++++++++++
   * @param url 请求链接
   * @param data 请求参数
   * @param loading 是否需要loading default true
   * @param method 请求方式 default 'get'
   * +++++++++++++++++++++++++++++++++++
   * */
  ajax({url, data, loading = true, method = 'get'}) {
    return new Promise((resolve, reject) => {
      //打开loading
      if (loading) store.commit("SET_LOADING", true);

      //开始请求
      this.$http({
        url: url,
        method: method,
        data: data,
        /*取消请求，如果有页面需要用到取消当前请求，则直接调用window.cancelRequire方法*/
        cancelToken: new CancelToken(c => {
          window.cancelRequire = c;
        })
      })

      /*正确返回*/
        .then(res => {
          /** 关闭loading **/
          if (loading) store.commit("SET_LOADING", false);

          /** 状态判断 **/
          if (res['data']["_code"] === '99999') {
            //成功
            resolve(res['data']['_result'] || "success");
          } else if (res['data']['_code'] === "20001") {
            //session失效
            Dialog.$create({
              type: 'alert',
              content: res['data']['_msg'] ,
              icon: 'cubeic-sad',
              onConfirm: () => {
                //执行登出操作
                console.log('执行登出操作');
                console.log('当前页面的路由：',router.history.current.fullPath);
              }
            }, false).show();
            reject(false);
          } else {
            //其他错误
            store.commit('SET_ERR_DIALOG', {show: true, txt: res['data']['_msg']});
            reject(false);
          }
        })

        /*错误处理*/
        .catch(error => {
          if (loading) store.commit("SET_LOADING", false);
          this.publicError(error);
          reject(false);
        })
    });
  }

  /**
   * +++++++++++++++++++++++++++++++++++
   * @param requestArr 并发请求数组
   * @param loading 是否需要loading default true
   * +++++++++++++++++++++++++++++++++++
   * */
  all({requestArr, loading = true}) {
    //打开loading
    if (loading) store.commit("SET_LOADING", true);


    //处理数据
    let requests = requestArr.map(item => {
      return this.$http(item)
    });

    //返回数据
    return new Promise((resolve, reject) => {
      Promise.all(requests)
        .then(res => {
          let resultArr = [], flag = true;

          /** 循环遍历请求状态 **/
          for (let i = 0, len = res.length; i < len; i++) {
            if (res[i]['data']['_code'] === '99999') {
              //成功
              resultArr.push(res[i]['data']['_result'] || "success");
            } else if (res[i]['data']['_code'] === '20001') {
              //未登录
              Dialog.$create({
                type: 'alert',
                content: res[i]['data']['_msg'],
                icon: 'cubeic-sad',
                onConfirm: () => {
                  //执行登出操作
                  console.log('执行登出操作');
                  console.log('当前页面的路由：',router.history.current.fullPath);
                }
              }, false).show();
              flag = false;
              break;
            } else {
              store.commit('SET_ERR_DIALOG', {show: true, txt: res[i]['data']['_msg']});
              flag = false;
              break;
            }
          }
          if (loading) store.commit("SET_LOADING", false);//关闭loading
          flag ? resolve(resultArr) : reject(false);//返回结果
        })
        .catch(error => {
          if (loading) store.commit("SET_LOADING", false);
          this.publicError(error, loading);
          reject(false);
        });
    })
  }
}

export default new Http(baseUrl);