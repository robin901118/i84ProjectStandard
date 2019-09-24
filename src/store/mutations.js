import {loadedNeedRestState} from './index';

export default {
  /* 刷新页面重置state */
  'RESET_STATE':function(state){
    Object.keys(loadedNeedRestState).forEach(key=>{
      state[key] = loadedNeedRestState[key]
    });
  },
  /* 设置loading状态 */
  'SET_LOADING': function (state, isloading) {
    state.publicLoadingShow = isloading
  },
  /* 设置通用提示弹窗 */
  'SET_ERR_DIALOG': function (state, {show, txt = '', icon = 'cubeic-sad'}) {
    state.publicArrDialogShow = show;
    if (show) {
      state.publicErrDialogTxt = txt
      state.publicErrDialogIcon = icon
    }
  },
  /* 设置吐司提示 */
  'SET_TOAST': function (state, {show, txt = '', type = 'warn'}) {
    state.publicToastShow = show
    state.publicToastTxt = txt
    state.publicToastType = type
  }
}
