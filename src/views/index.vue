<template>
    <div class="home">
        <div class="up"></div>
        <router-link to="/login" class="btt" flex="cross:center main:center">主页</router-link>
    </div>
</template>

<script>
  import {ajaxAll} from '../assets/js/http';

  export default {
    name: 'home',
    async created() {

    }
  }
</script>

<style scoped>
</style>
