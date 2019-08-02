export default {
  /* 设置loading状态 */
  'SET_LOADING' (state, isloading) {
    state.loadingShow = isloading
  },
  /* 设置通用提示弹窗 */
  'SET_ERR_DIALOG' (state, { show, txt = '', icon = 'cubeic-sad' }) {
    state.errorDialogShow = show
    if (show) {
      state.errorDialogTxt = txt
      state.errorDialogIcon = icon
    }
  },
  /* 设置吐司提示 */
  'SET_TOAST' (state, { show, txt = '', type = 'warn' }) {
    state.toastShow = show
    state.toastTxt = txt
    state.toastType = type
  }
}
