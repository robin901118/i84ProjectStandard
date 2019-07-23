<template>
    <div class="home">
        <myHeader></myHeader>
        <article flex="dir:top cross:center main:center">
            <img :src="logoSrc" class="logo">
            <p>hello 爱巴士~</p>
        </article>
    </div>
</template>

<script>
  import myHeader from '../components/header/header';
  import logo from '../assets/img/i84-logo.png';

  export default {
    name: 'home',
    data() {
      return {
        logoSrc:logo
      }
    },
    components: {myHeader},
  }
</script>

<style lang="scss" scoped>
    @import "./style/index.scss";
</style>
