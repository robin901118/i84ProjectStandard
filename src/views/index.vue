<template>
    <div class="home">
        <!--页头开始-->
        <header flex="cross:center main:center dir:top">
            <p>页头</p>
            <p>页头</p>
        </header>
        <!--页头结束-->

        <!--列表开始-->
        <section>
            <cube-scroll ref="scroll" :data="listData">
                <ul class="list">
                    <li v-for="item in listData">
                        <p>我是青蛙</p>
                        <p>
                            <span style=" letter-spacing: 2em; margin-right: -2em;">青蛙</span>:哈哈哈哈
                        </p>
                    </li>
                </ul>
            </cube-scroll>
        </section>
        <!--列表结束-->

        <!--页脚开始-->
        <footer flex="cross:center main:center">
            页脚
        </footer>
        <!--页脚结束-->
    </div>
</template>

<script>

    import {getData} from '../assets/js/api';

    export default {
    name: 'home',
    data() {
      return {
        listData: [],
        actionSheet:null
      }
    },
    methods:{},
    async created() {
      let arr = [];
      for (let i = 0; i < 10; i++) {
        arr.push(i);
      }
      this.listData=[...arr];

      try{
        let res = await getData();
        console.log('成功');
        console.log(res);
        /*继续执行语句*/

      }catch (e) {
        /*有错误，直接return出去*/
        console.log('失败');
        return false;
      }

    }
  }
</script>

<style lang="scss" scoped>
    @import "./style/index.scss";
</style>
