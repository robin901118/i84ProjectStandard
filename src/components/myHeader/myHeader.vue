<template>
    <div class="header" flex="cross:center main:center">
        {{this.$route.meta.title}}
    </div>
</template>

<script>
  export default {
    name: "myHeader"
  }
</script>

<style lang="scss" scoped>
    .header{
        height: 90px;
        background: #3a3434;
        color: white;
        padding: 0 32px;
        font-size: 40px;
    }
</style>