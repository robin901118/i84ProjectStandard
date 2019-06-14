<template>
    <div class="header" flex="cross:center main:justify">
        <i class="cubeic-back"></i>
        个人中心
        <span>保存</span>
    </div>
</template>

<script>
  export default {
    name: "header"
  }
</script>

<style lang="scss" scoped>
    .header{
        height: 45px;
        background: #1c90db;
        color: white;
        padding: 0 16px;
        font-size: 20px;
    }
</style>