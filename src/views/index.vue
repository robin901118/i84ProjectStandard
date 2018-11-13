<template>
    <div class="home">
        {{time}}
        <router-link to="/login" class="btt" flex="cross:center main:center">主页</router-link>
    </div>
</template>

<script>

  export default {
    name: 'home',
    data(){
      return {
        time:""
      }
    },
    created(){
      this.time = this.$moment('2011-11-11 15:00:26').format('YYYY/MM/DD HH:mm:ss');
    }
  }
</script>

<style scoped>
</style>
