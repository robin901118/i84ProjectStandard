import {removeStore} from '../assets/js/common';

export default {
    /*设置登录*/
    ['SET_LOGIN'](state,{userState,userPhone=""}){
      state.isLogin = userState;
      state.userMobile = userPhone;

      //登出
      if(!userState){
        removeStore('isLogin');
        removeStore('userPhone');
      }
    },
    /*设置loading状态*/
    ['SET_LOADING'](state,isloading){
        state.loadingShow = isloading;
    },
    /*设置通用提示弹窗*/
    ['SET_ERR_DIALOG'](state,{show,txt="",icon='cubeic-sad'}){
        state.errorDialogShow = show;
        if(show){
            state.errorDialogTxt=txt;
            state.errorDialogIcon=icon;
        }
    }
}