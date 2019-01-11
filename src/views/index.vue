<template>
    <div class="home">
        <myHeader></myHeader>
        <ul class="list border-top-1px">
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
            <li class="border-bottom-1px" flex="main:justify cross:center">
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


        <!--头像编辑器 开始-->
        <imageEditor v-if="headImage"
                     :imageFile="headImage"
                     v-on:editorResult="editorResult($event)">
        </imageEditor>
        <!--头像编辑器 结束-->
    </div>
</template>

<script>
  import myHeader from '../components/header/header';
  import imageEditor from '../components/imageEditor/imageEditor';

  export default {
    name: 'home',
    data() {
      return {
        orientation: null,//图片元信息
        headImage: null,
        cropImgSrc:"",//裁剪好的图片
      }
    },
    components: {myHeader, imageEditor},
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
      }


    },
    async created() {
      // let arr = [];
      // for (let i = 0; i < 10; i++) {
      //   arr.push(i);
      // }
      // this.listData=[...arr];
      //
      // try{
      //   let res = await getData();
      //   console.log('成功');
      //   console.log(res);
      //   /*继续执行语句*/
      //
      // }catch (e) {
      //   /*有错误，直接return出去*/
      //   console.log('失败');
      //   return false;
      // }

    }
  }
</script>

<style lang="scss" scoped>
    @import "./style/index.scss";
</style>
