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
        height: 90px;
        background: #1c90db;
        color: white;
        padding: 0 32px;
        font-size: 40px;
    }
</style>