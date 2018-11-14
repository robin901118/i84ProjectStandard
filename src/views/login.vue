<template>
    <div>
        登录页面
        <button type="button" @click="login">点击登录</button>
    </div>
</template>

<script>
    import {setStore} from "../assets/js/common";

    export default {
    name: "login",
    methods:{
      login(){
        setStore('isLogin',1);
        setStore('userPhone','18559893609');
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>

</style>