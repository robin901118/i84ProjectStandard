<template>
    <div class="home">
        <input type="tel" v-model="tel" placeholder="输入手机号码"/>
        <input type="tel" v-model="code" placeholder="输入验证码"/>
        <button type="button" @click="getCode">获取验证码</button>
        <button type="button" @click="login">登录</button>
        <input type="file"
            accept="image/*"
            ref="file">
    </div>
</template>

<script>
  import {getCode,quickLogin} from '../assets/js/api';
  import {setStore} from '../assets/js/common';

  export default {
    name: "login",
    data() {
      return {
        tel: '',
        code: ""
      }
    },
    methods: {
      async getCode(){
        let result = await getCode({
          mobile:this.tel,
          type:2
        });

        if(!result) return;

        alert('获取验证码成功');
      },
      async login() {
        let result = await quickLogin({
          mobile:this.tel,
          code:this.code
        });
        if(!result) return;

        setStore('isLogin',this._Encrypt(1));
        setStore('userPhone',this._Encrypt(this.tel));
        alert('登录成功');
        this.$router.push(this.$route.query.redirect);
      }
    }
  }
</script>

<style scoped>
    .home {
        width: 100%;
        height: 100vh;
        background: #a2f2fa;
        color: #b5a1ff;
    }
</style>