import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import createVuexAlong from 'vuex-along'
Vue.use(Vuex)


/***** 刷新页面的时候需要重置的状态 *****/
export const loadedNeedRestState = {
  publicLoadingShow: false, // loadingShow
  publicArrDialogShow: false, // 错误弹窗显示/隐藏
  publicErrDialogTxt: '', // 错误弹窗信息
  publicErrDialogIcon: '', // 错误弹窗图标
  publicToastTxt: '', // 吐司提示文本
  publicToastShow: false, // 吐司提示显示
  publicToastType: ''// 吐司类型
}

/***** 其他状态 *****/
const otherState = {
  hello:"word"
}

const state = Object.assign({},loadedNeedRestState,otherState);

export default new Vuex.Store({
  state,
  mutations,
  plugins: [
    createVuexAlong({
      session: { list: () => Object.keys(state) },
      justSession: true
    })
  ]
})
