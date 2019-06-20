import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
Vue.use(Vuex);


/**
 * +++++++++++++++++++++++++++++++++++
 * 全局store状态
 * +++++++++++++++++++++++++++++++++++
 * */
const state = {
  baseURL:"https://www.easy-mock.com/mock/5b502bb4645157291985a472/buslifemall",//接口前缀
  loadingShow: false,//loadingShow
  errorDialogShow: false,//错误弹窗显示/隐藏
  errorDialogTxt: "",//错误弹窗信息
  errorDialogIcon: "",//错误弹窗图标
  toastTxt: "",//吐司提示文本
  toastShow: false,//吐司提示显示
  toastType: '',//吐司类型
};


export default new Vuex.Store({
  state,
  mutations
})




