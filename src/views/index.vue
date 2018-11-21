<template>
    <div class="home">
        <!--页头开始-->
        <header flex="cross:center main:center">
            页头
        </header>
        <!--页头结束-->

        <!--列表开始-->
        <section>
            <cube-scroll ref="scroll" :data="listData">
                <ul class="list">
                    <li v-for="item in listData">{{item}}</li>
                </ul>
            </cube-scroll>
        </section>
        <!--列表结束-->

        <!--页脚开始-->
        <footer flex="cross:center main:center" @click="add">
            页脚
        </footer>
        <!--页脚结束-->
    </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        listData: []
      }
    },
    methods:{
      add(){
        let newArr = [132456];
        this.listData = this.listData.concat(newArr);
      }
    },
    created() {
      let arr = [];
      for (let i = 0; i < 10; i++) {
        arr.push(i);
      }
      this.listData=[...arr];
    }
  }
</script>

<style lang="scss" scoped>
    @import "./style/index.scss";
</style>
