<template>
    <div class="home">
        支付页面
        <cube-button :primary="true" @click="goBack" style="margin-bottom: 20px;">返回</cube-button>
        <cube-button :primary="true" @click="refreshPage">刷新页面</cube-button>
    </div>
</template>

<script>
  export default {
    inject:['reload'],//对应app.vue的provide.reload
    methods:{
      goBack(){
        this.$router.go(-1);
      },

      refreshPage(){
        this.reload();//直接调用刷新页面
      }
    },
    mounted(){
      console.log('测试刷新');
    }
  }
</script>

<style lang="scss" scoped>
    @import "./style/index.scss";
</style>
