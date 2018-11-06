
export default {
    /*设置登录*/
    ['SET_LOGIN'](state,{userState,userPhone=""}){
        state.isLogin = true;
        state.userMobile = userPhone;
    },
    /*设置loading状态*/
    ['SET_LOADING'](state,isloading){
        state.loadingShow = isloading;
    },
    /*设置通用提示弹窗*/
    ['SET_ERR_DIALOG'](state,{show,icon='cubeic-sad',txt=""}){
        state.errorDialogShow = show;
        if(show){
            state.errorDialogTxt=txt;
            state.errorDialogIcon=icon;
        }
    }
}