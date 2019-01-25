<template>
    <div class="home">
        支付页面
        <cube-button :primary="true" @click="goBack">返回</cube-button>
    </div>
</template>

<script>
  export default {
    methods:{
      goBack(){
        this.$router.go(-1);
      }
    },
    created(){
      console.log('nextPage');
    }
  }
</script>

<style lang="scss" scoped>
    @import "./style/index.scss";
</style>
