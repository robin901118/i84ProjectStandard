<template>
    <div class="home">
        <section v-for="(item,index) in inputGroup" :key="index">
            <div class="value">{{item.label}}</div>
            <cube-input v-model="item.value" :placeholder="item.placeholder"></cube-input>
        </section>
        <cube-button :primary="true" @click="gotoNextPage">去选择支付方式</cube-button>
    </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        inputGroup:{
          input1:{
            label:"数量",
            value:"",
            placeholder:"数量"
          },
          input2:{
            label:"单位",
            value:"",
            placeholder:"单位"
          },
          input3:{
            label:"颜色",
            value:"",
            placeholder:"颜色要求"
          },
          input4:{
            label:"大小",
            value:"",
            placeholder:"大小要求"
          }
        },
      }
    },
    methods:{
      gotoNextPage(){
        this.$router.push('/nextPage');
      }
    },
    async created(){
      try {
        //请求实例
        let result = await this.$http.ajax({
          url:'/goodsData',
          method:"post",
          data:{pms:1}
        });

        console.log('请求成功',result);
      }catch (e) {
      //统一错误抛出处理
      console.log('请求失败',e);
      return false;
    }

    }
  }
</script>

<style lang="scss" scoped>
    @import "./style/index.scss";
    .home{
        padding: 20px;
        section{
            margin-bottom: 20px;
            > div{margin-bottom: 10px;}
            &:last-of-type{margin-bottom: 20vh;}
        }
    }
</style>
