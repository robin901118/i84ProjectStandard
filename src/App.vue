<template>
    <div id="app">
        <transition :name="transitionName">
            <router-view class="Router"/>
        </transition>
    </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    data() {
      return {
        transitionName: 'slide-right', // 默认动态路由变化为slide-right
        loading: null,//loading单例组件
        diaLog: null//弹窗单例组件
      }
    },
    computed: {
      ...mapState([
        'loadingShow',
        'errorDialogShow',
        'errorDialogTxt',
        'errorDialogIcon'
      ])
    },
    watch: {
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
      /*错误弹窗*/
      errorDialogShow(nv) {
        if (nv) {
          this.diaLog = this.$createDialog({
            mask: true,
            icon: this.errorDialogIcon,
            content: this.errorDialogTxt,
            onConfirm: () => {
              this.$store.commit('SET_ERR_DIALOG', {show: false});//隐藏dialog
            }
          }).show();
        }
      },
      /*路由前进后退*/
      $route(to, from) {
        if (to.meta.index > from.meta.index) {
          this.transitionName = 'slide-left';
        } else {
          this.transitionName = 'slide-right';
        }
      }
    },
  }
</script>
<style lang="scss">
    @import "./assets/css/public";
</style>
