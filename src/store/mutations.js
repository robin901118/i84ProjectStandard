import goodStorage from 'good-storage';

export default {
  /*设置登录*/
  ['SET_LOGIN'](state, {userState, userPhone = ""}) {
    state.isLogin = userState;
    state.userMobile = userPhone;

    //登出
    if (!userState) {
      goodStorage.remove('isLogin');
      goodStorage.remove('userPhone');
    }
  },
  /*设置loading状态*/
  ['SET_LOADING'](state, isloading) {
    state.loadingShow = isloading;
  },
  /*设置通用提示弹窗*/
  ['SET_ERR_DIALOG'](state, {show, txt = "", icon = 'cubeic-sad'}) {
    state.errorDialogShow = show;
    if (show) {
      state.errorDialogTxt = txt;
      state.errorDialogIcon = icon;
    }
  },
  /*设置吐司提示*/
  ['SET_TOAST'](state, {show, txt = "", type = 'warn'}) {
    state.toastShow = show;
    state.toastTxt = txt;
    state.toastType = type;
  },
}