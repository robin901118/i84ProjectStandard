<template>
    <div class="home">
        <myHeader></myHeader>
        <ul class="list border-top-1px" style="padding-bottom: 10vh">
            <li class="border-bottom-1px" flex="main:justify cross:center">
                <span>头像</span>
                <input type="file"
                       id="headFile"
                       @change="editorImage"
                       accept="image/*"
                       ref="file"/>
                <label class="headImg"
                       :style="{backgroundImage:'url('+cropImgSrc+')'}"
                       for="headFile"></label>
            </li>
            <li class="border-bottom-1px"
                flex="main:justify cross:center"
                @click="changeNickName">
                <span>真实姓名</span>
                <span class="value">周生生</span>
            </li>
            <li class="border-bottom-1px" flex="main:justify cross:center">
                <span>性别</span>
                <span class="value">男</span>
            </li>
            <li class="border-bottom-1px" flex="main:justify cross:center">
                <span>联系电话</span>
                <span class="value">13888888888</span>
            </li>
            <li flex="main:justify cross:center">
                <span>常驻地址</span>
                <span class="value">南山区华侨城</span>
            </li>
        </ul>

        <cube-button :primary="true" @click="keepAlive">keep-alive</cube-button>

        <!--头像编辑器 开始-->
        <imageEditor v-if="headImage"
                     :imageFile="headImage"
                     v-on:editorResult="editorResult($event)"/>
        <!--头像编辑器 结束-->

        <!--图像懒加载-->
        <lazy-img src="https://unsplash.it/879/200?image=10" aspect-ratio="1.5"/>
    </div>
</template>

<script>
  import myHeader from '../components/header/header';
  import {isWeixinOrAlipay} from '../assets/js/common';
  import EncAndDec from '../assets/js/EncAndDec';

  export default {
    name: 'home',
    data() {
      return {
        orientation: null,//图片元信息
        headImage: null,
        cropImgSrc:"",//裁剪好的图片
        jumpParams:{
          uname:"Lily",
          age:18,
          sex:"girl"
        }
      }
    },
    components: {myHeader},
    methods: {
      /**
       * 上传头像
       * */
      editorImage() {
        let files = this.$refs.file.files[0];
        if(!files) return;//在结束的时候清除file的value
        /*控制图片上传大小不超过1MB*/
        if (files.size > 8388608) {
          this.$store.commit('SET_TOAST', {show: true, txt: '图片不能超过1MB大小'});
          return false;
        }
        this.headImage = files;
      },


      /**
       * +++++++++++++++++++++++++++++++++++++
       * 编辑结束的回调
       * @param data 编辑后的base64值，如果为空则表示点击了取消
       * +++++++++++++++++++++++++++++++++++++
       * */
      editorResult(data){
        this.headImage = '';
        this.$refs.file.value = '';
        if(!data) return;//点击了取消

        //执行上传.....
        this.cropImgSrc = data;
      },

      /**
      * 修改昵称
      * */
      changeNickName(){
        this.dialog = this.$createDialog({
          type: 'prompt',
          title: '我是标题',
          prompt: {
            value: '',
            placeholder: '请输入'
          },
          onConfirm: (e, promptValue) => {
            this.$createToast({
              type: 'warn',
              time: 1000,
              txt: `Prompt value: ${promptValue || ''}`
            }).show()
          }
        }).show();
      },

      /**
      * 跳转keepAlive
      * */
      keepAlive(){
        this.$router.push({
          name:"keepAlive",
          query:this.jumpParams
        });
      }
    },
    async created() {
      /*HTTP请求实例*/
      try{
        //并发请求实例
        let result = await this.$http.all({
          requestArr:[
            {
              url:'/goodsData',
              method:"post",
              data:{pms:1}
            },
            {
              url:"/search",
              method:"post",
              data:{index:2}
            },
            {
              url:"/integral",
              method:"post"
            }
          ]
        });
      }catch (e) {
        //统一错误抛出处理
        console.log('并发请求失败',e);
        return false;
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "./style/index.scss";
</style>
