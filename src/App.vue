<template>
    <div id="app">
        <transition :name="transitionName">
            <navigation>
                <router-view v-if="$route.meta.keepAlive && isRouterReload" class="Router"></router-view>
            </navigation>
        </transition>
        <transition :name="transitionName">
            <router-view v-if="!$route.meta.keepAlive && isRouterReload" class="Router"></router-view>
        </transition>
    </div>
</template>

<script>
  import {mapState} from "vuex";
  import initHybridBridge from './assets/js/hybrid-bridge';
  import {getQueryString} from './assets/js/common';

  export default {
    data() {
      return {
        transitionName: 'slide-right',
        loading: null,//loading单例组件
        diaLog: null,//弹窗单例组件
        toast: null,//吐司单例组件
        isRouterReload:true,//是否显示router-view(用于刷新)
      }
    },
    computed: {
      ...mapState([
        'loadingShow',
        'errorDialogShow',
        'errorDialogTxt',
        'errorDialogIcon',
        'toastTxt',
        'toastShow',
        'toastType'
      ])
    },
    watch: {
      /**
       * +++++++++++++++++++++++++++++++++++
       * 加载loading
       * +++++++++++++++++++++++++++++++++++
       * */
      loadingShow(nv) {
        if (nv) {
          /*单例模式，参考cube-ui toast配置*/
          this.loading = this.$createToast({
            mask: true,//蒙层
            time: 0//设置为0时需要手动关闭
          }).show();
        } else {
          if (!this.loading) return;
          this.loading.hide();
        }
      },


      /**
       * +++++++++++++++++++++++++++++++++++
       * 错误弹窗提示
       * +++++++++++++++++++++++++++++++++++
       * */
      errorDialogShow(nv) {
        if (nv) {
          this.diaLog = this.$createDialog({
            mask: true,
            icon: this.errorDialogIcon,
            content: this.errorDialogTxt,
            onConfirm: () => {
              this.$store.commit('SET_ERR_DIALOG', {show: false});
            }
          }).show();
        } else {
          if (!this.diaLog) return;
          this.diaLog.hide();
        }
      },


      /**
       * +++++++++++++++++++++++++++++++++++
       * toast提示
       * +++++++++++++++++++++++++++++++++++
       * */
      toastShow(nv) {
        if (nv) {
          this.toast = this.$createToast({
            time: 3000,
            type: this.toastType,
            txt: this.toastTxt,
            onTimeout: () => {
              this.$store.commit('SET_TOAST', {show: false});
            }
          }).show();
        } else {
          if (!this.toast) return;
          this.toast.hide();
        }
      },


      /**
       * +++++++++++++++++++++++++++++++++++
       * 路由前进后退
       * +++++++++++++++++++++++++++++++++++
       * */
      $route(to, from) {
        to.meta.index > from.meta.index ? this.transitionName = 'slide-left' : this.transitionName = 'slide-right';

        /*关闭diaLog*/
        this.diaLog && this.$store.commit('SET_ERR_DIALOG', {show: false});

        /*关闭吐司提示*/
        this.toast && this.$store.commit('SET_TOAST', {show: false});

        /*取消请求*/
        window.cancelRequire && window.cancelRequire();
      }
    },
    methods:{
      /**  刷新页面 ,这种刷新方式不会清除vuex中的状态 **/
      reload(){
        this.isRouterReload=false;
        this.$nextTick(()=>{
          this.isRouterReload = true;
        })
      }
    },
    provide(){
      return {reload:this.reload}
    },
    mounted(){
      /**  初始化hybrid-bridge **/
      let deviceType = getQueryString('appType', window.location);
      initHybridBridge.init(deviceType);
    }
  }
</script>
<style lang="scss">
    @import "./assets/css/public";
</style>
