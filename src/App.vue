<template>
    <div id="app">
        <transition :name="transitionName">
            <keep-alive>
                <router-view v-if="keepAliveIsReload" class="Router"></router-view>
            </keep-alive>
        </transition>
        <transition :name="transitionName">
            <router-view v-if="!keepAliveIsReload" class="Router"></router-view>
        </transition>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { TOAST_CLOSE_TIME, LOADING_CLOSE_TIME } from './config/index'




  export default {
    data () {
      return {
        transitionName: 'slide-right',
        loading: null,//loading单例组件
        diaLog: null,//弹窗单例组件
        toast: null,//吐司单例组件
        isRouterReload: true,//是否显示router-view(用于刷新)
      }
    },
    computed: {
      ...mapState([
        'publicLoadingShow',
        'publicArrDialogShow',
        'publicErrDialogTxt',
        'publicErrDialogIcon',
        'publicToastTxt',
        'publicToastShow',
        'publicToastType'
      ]),

      keepAliveIsReload () {
        return this.$route.meta.keepAlive && this.isRouterReload
      }
    },
    watch: {
      /**
       * +++++++++++++++++++++++++++++++++++
       * 加载loading
       * +++++++++++++++++++++++++++++++++++
       * */
      publicLoadingShow (nv) {
        if (nv) {
          this.loading = this.$createToast({
            mask: true,//蒙层
            time: LOADING_CLOSE_TIME//设置为0时需要手动关闭
          }).show()
        } else {
          this.loading && this.loading.hide()
        }
      },

      /**
       * +++++++++++++++++++++++++++++++++++
       * 错误弹窗提示
       * +++++++++++++++++++++++++++++++++++
       * */
      publicArrDialogShow (nv) {
        if (nv) {
          this.diaLog = this.$createDialog({
            mask: true,
            icon: this.publicErrDialogIcon,
            content: this.publicErrDialogTxt,
            onConfirm: () => this.$store.commit('SET_ERR_DIALOG', {show: false})
          }).show()
        } else {
          this.diaLog && this.diaLog.hide()
        }
      },

      /**
       * +++++++++++++++++++++++++++++++++++
       * toast提示
       * +++++++++++++++++++++++++++++++++++
       * */
      publicToastShow (nv) {
        if (nv) {
          this.toast = this.$createToast({
            time: TOAST_CLOSE_TIME,
            type: this.publicToastType,
            txt: this.publicToastTxt,
            onTimeout: () => this.$store.commit('SET_TOAST', {show: false})
          }).show()
        } else {
          this.toast && this.toast.hide()
        }
      },

      /**
       * +++++++++++++++++++++++++++++++++++
       * 路由前进后退
       * +++++++++++++++++++++++++++++++++++
       * */
      $route (to, from) {
        this.transitionName = to.meta.index > from.meta.index ? 'slide-left' : 'slide-right'

        // 关闭diaLog
        this.diaLog && this.$store.commit('SET_ERR_DIALOG', {show: false})

        // 关闭吐司提示
        this.toast && this.$store.commit('SET_TOAST', {show: false})

        // 取消请求
        window.cancelRequire && window.cancelRequire()
      }
    },
    methods: {
      /**  刷新页面 ,这种刷新方式只是重载组件 **/
      reload () {
        this.isRouterReload = false
        this.$nextTick(() => {
          this.isRouterReload = true
        })
      }
    },
    provide () {
      return {reload: this.reload}
    },
    created () {
      this.$store.commit('RESET_STATE');
    }
  }
</script>
<style lang="scss">
    @import "./assets/css/public";
</style>
