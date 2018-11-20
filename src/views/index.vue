<template>
    <div class="home">

        <!--上拉加载列表 开始-->
        <div class="scrollBox">
            <cube-scroll
                    ref="scroll"
                    :data="listData"
                    :options="scrollOption"
                    @pulling-up="onPullingUp">

                <div class="list"
                     flex="cross:center main:center"
                     v-for="item in listData">
                    {{item.text}}
                    <img v-lazy="item.img">
                </div>

            </cube-scroll>
        </div>
        <!--上拉加载列表 结束-->

    </div>
</template>

<script>
    import {imgArr} from "./img";

    export default {
    name: 'home',
    data(){
      return {
        scrollOption:{
          tap:true,
          scrollbar:true,
          click:true,
          pullUpLoad: true,
        },
        listData:[],
        imgArr:imgArr
      }
    },
    methods:{
      /*上拉加载*/
      onPullingUp(){
        let startNum = this.listData.length,
            newDataArr = [];
        setTimeout(()=>{
          for(let i=startNum;i<startNum+10;i++){
            let obj = {};
            obj['text'] = i;
            obj['img'] = imgArr[(startNum+10) - i];
            newDataArr.push(obj);
          }
          this.listData = this.listData.concat(newDataArr);
        },2000)
      }
    },
    mounted(){
      let arr=[];
      for(let i=0;i<=10;i++){
        let obj = {};
        obj['text'] = i;
        obj['img'] = imgArr[i];
        arr.push(obj);
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "./style/index.scss";
</style>
