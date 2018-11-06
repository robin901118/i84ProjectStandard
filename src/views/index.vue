<template>
    <div class="home">
        <div class="up"></div>
        <router-link to="/login" class="btt" flex="cross:center main:center">主页</router-link>
        <input type="text" v-model="aa">
    </div>
</template>

<script>

    export default {
        name: 'home',
        data(){
            return {
                aa:""
            }
        },
        async mounted(){

        },
        beforeRouteLeave(to,from,next){
            next();
        }
    }
</script>
<style scoped>
    .up{background: salmon;height: 100vh}
    .btt{background: #8de6fa;color: white;height:30vh;font-size: 30px;}
    input{height: 45px;width: 100%;padding-left: 15px;}
</style>
