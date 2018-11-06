import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex);


/*状态*/
const state = {
    isLogin: false,//是否登录
    userMobile:"",//用户手机号
    loadingShow:false,//loadingShow
    errorDialogShow:false,//错误弹窗显示/隐藏
    errorDialogTxt:"",//错误弹窗信息
    errorDialogIcon:"",//错误弹窗图标
};


export default new Vuex.Store({
    state,
    mutations
})




