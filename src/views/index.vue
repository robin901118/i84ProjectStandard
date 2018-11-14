<template>
    <div class="home">
        <header>
            {{isLogin}}----{{phone}}
        </header>
        <article>
            <button type="button" @click="save">存储</button>
        </article>
        <footer></footer>
    </div>
</template>

<script>
    import {setStore,getStore} from '../assets/js/common';
  export default {
    name: 'home',
    data(){
      return {
        time:""
      }
    },
    methods:{
      save(){
        setStore('isLogin',1);
        setStore('phone','18559893609');
      }
    },
    computed:{
      isLogin(){
        return getStore('isLogin');
      },
      phone(){
        return getStore('phone');
      }
    }
  }
</script>

<style scoped>
    .home{height: 100%;}
    header{height: 20vw;background: #ff988c;}
    footer{height: 20vw;background: teal;}
    article{height: calc(100% - 40vw);background: darkgray;}
</style>
