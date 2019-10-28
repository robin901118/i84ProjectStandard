<template>
    <div class="home">
        <myHeader/>
        <article flex="dir:top cross:center main:center">
            <img :src="logoSrc" class="logo">
            <p>hello 爱巴士~</p>
        </article>
    </div>
</template>

<script>
  import myHeader from '../components/myHeader/myHeader';
  import logo from '../assets/img/i84-logo.png';

  export default {
    name: 'home',
    data() {
      return {
        logoSrc:logo
      }
    },
    components: {myHeader},
    async mounted(){
      try{
        await this.$http.ajax({
          url:"/api",
          method:"POST",
          data:{
            userId:6112
          },
          loading:true
        });

      }catch (e) {
        console.error(e);
        return false;
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "./style/index.scss";
</style>
