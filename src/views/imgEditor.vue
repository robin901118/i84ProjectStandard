<template>
    <div class="home">
        <div class="uploadBox">
            <!--主编辑器canvas-->
            <canvas id="canvas" :width="windowWidth" :height="windowWidth"></canvas>
            <!--蒙层canvas-->
            <canvas id="canvasMask" :width="windowWidth" :height="windowWidth"></canvas>
            <!--用于导出图片的canvas-->
            <canvas id="resultImg" width="160" height="160" style="display: none"></canvas>
            <label class="uploadBar" for="uploadInput" v-if="uploadBarShow">
                <input type="file"
                       style="display: none"
                       id="uploadInput"
                       accept="image/*"
                       ref="file"
                       @change="upLoadChange">
                <span>点击上传</span>
            </label>
        </div>
        <input type="button"
               v-if="!uploadBarShow"
               value="确定裁切"
               @click="crop"/>
    </div>
</template>

<script>
  require('../assets/plugin/hammer.min');//引入hammerJS
  import EXIF from 'exif-js';
  import {dataURItoBlob} from '../assets/js/common';

  export default {
    name: 'home',
    data() {
      return {
        orientation: null,//图片元信息
        degree: 0,//原图片旋转角度
        windowWidth: 0,//屏幕的宽度
        imgEl: null,
        imgWidth: 0,//图片的宽度
        imgHeight: 0,//图片的高度
        transWidth: 0,//改变后的图片宽度
        transHeight: 0,//改变后的图片高度
        initScale: 0,
        transformScale: 1,//初始缩放
        prevX: 0,//上一次的X轴
        prevY: 0,//上一次的Y轴
        translateX: 0,//平移X轴
        translateY: 0,//平移Y轴
        uploadBarShow: true,//上传按钮显示
        canvas: null,//canvas
        canvasMask: null,//canvas-mask
        canvasResult: null,//裁切图片canvas
      }
    },
    methods: {
      /**
       * +++++++++++++++++++++++++++++++++++++
       * 上传图片
       * +++++++++++++++++++++++++++++++++++++
       * */
      upLoadChange() {
        let files = this.$refs.file.files[0],
          self = this;
        /*控制图片上传大小不超过1MB*/
        if (files.size > 8388608) {
          alert('图片不能超过1MB大小');
          return false;
        }

        /*用EXIF获取图片元信息*/
        EXIF.getData(files, function () {
          self.orientation = EXIF.getTag(this, 'Orientation');
        });

        let fr = new FileReader();

        // 监听reader对象的的onload事件，当图片加载完成时，把base64编码賦值给预览图片
        fr.addEventListener("load", () => {
          if (this.orientation) {
            /*需要对ios做一下兼容*/
            this.getImgData(fr.result, this.orientation, data => {
              this.createCanvas(data);//初始化canvas
            });
          } else {
            this.createCanvas(fr.result);//初始化canvas
          }
        }, false);
        fr.readAsDataURL(files);
      },

      /**
       * +++++++++++++++++++++++++++++++++++++
       * 初始化canvas
       * +++++++++++++++++++++++++++++++++++++
       * */
      createCanvas(imgBase64) {
        this.imgEl = new Image();
        this.imgEl.src = imgBase64;

        this.imgEl.onload = () => {
          this.imgWidth = this.imgEl.width;//初始化图片的宽
          this.imgHeight = this.imgEl.height;//初始化图片的高

          // 画蒙层
          this.canvasMask.globalCompositeOperation = 'source-out';
          this.canvasMask.fillStyle = 'rgb(255,255,255)';
          this.canvasMask.arc(this.windowWidth / 2, this.windowWidth / 2, 80, 0, 2 * Math.PI);
          this.canvasMask.fill();
          this.canvasMask.fillStyle = 'rgba(0,0,0,0.7)';
          this.canvasMask.fillRect(0, 0, this.windowWidth, this.windowWidth);

          // 当图片比canvas小时不做任何改变
          if (this.imgEl.width < this.windowWidth && this.imgEl.height < this.windowWidth) {
            this.imgWidth = this.imgEl.width;
            this.imgHeight = this.imgEl.height;
          } else {
            //原图片宽高比例 大于 图片框宽高比例
            if (1 <= this.imgEl.width / this.imgEl.height) {
              this.imgWidth = this.windowWidth;   //以框的宽度为标准
              this.imgHeight = this.windowWidth * (this.imgEl.height / this.imgEl.width);
            } else {   //原图片宽高比例 小于 图片框宽高比例
              this.imgWidth = this.windowWidth * (this.imgEl.width / this.imgEl.height);
              this.imgHeight = this.windowWidth;   //以框的高度为标准
            }
          }

          this.canvas.translate(this.windowWidth / 2, this.windowWidth / 2);//把canvas原点移动到中心位置
          this.canvas.drawImage(this.imgEl, 0 - this.imgWidth / 2, 0 - this.imgHeight / 2, this.imgWidth, this.imgHeight);

          /*初始化hammer*/
          this.initHammer();
        }
      },

      /**
       * +++++++++++++++++++++++++++++++++++++
       * @param {string} img 图片的base64
       * @param {int} dir exif获取的方向信息
       * @param {function} next 回调方法，返回校正方向后的base64
       * +++++++++++++++++++++++++++++++++++++
       * */
      getImgData(img, dir, next) {
        let image = new Image();
        image.src = img;

        image.onload = function () {
          let degree = 0, drawWidth, drawHeight, width, height;
          drawWidth = image.naturalWidth;//暂存图片的宽
          drawHeight = image.naturalHeight;//暂存图片的高

          //以下改变一下图片大小
          let maxSide = Math.max(drawWidth, drawHeight);
          if (maxSide > 2048) {
            let minSide = Math.min(drawWidth, drawHeight);
            minSide = minSide / maxSide * 2048;
            maxSide = 2048;
            if (drawWidth > drawHeight) {
              drawWidth = maxSide;
              drawHeight = minSide;
            } else {
              drawWidth = minSide;
              drawHeight = maxSide;
            }
          }

          let canvas = document.createElement('canvas');
          canvas.width = width = drawWidth;
          canvas.height = height = drawHeight;
          let context = canvas.getContext('2d');
          //判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
          switch (dir) {
            //iphone横屏拍摄，此时home键在左侧
            case 3:
              degree = 180;
              drawWidth = -width;
              drawHeight = -height;
              break;

            //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
            case 6:
              canvas.width = height;
              canvas.height = width;
              degree = 90;
              drawWidth = width;
              drawHeight = -height;
              break;

            //iphone竖屏拍摄，此时home键在上方
            case 8:
              canvas.width = height;
              canvas.height = width;
              degree = 270;
              drawWidth = -width;
              drawHeight = height;
              break;
          }

          //使用canvas旋转校正
          context.rotate(degree * Math.PI / 180);
          context.drawImage(this, 0, 0, drawWidth, drawHeight);

          //返回校正图片
          next(canvas.toDataURL("image/jpeg"));
        }
      },

      /**
       * +++++++++++++++++++++++++++++++++++++
       * 初始化hammer
       * +++++++++++++++++++++++++++++++++++++
       * */
      initHammer() {
        //隐藏上传bar
        this.uploadBarShow = false;

        let hammer = new Hammer(document.querySelector('#canvasMask'));
        hammer.get('pinch').set({enable: true});

        /*缩放 */
        hammer.on('pinchmove pinchstart pinchin pinchout', e => {
          if (e.type === "pinchstart") {
            this.initScale = this.transformScale || 1;
          }
          this.transformScale = this.initScale * e.scale;
          this.canvas.clearRect(0 - this.windowWidth / 2, 0 - this.windowWidth / 2, this.windowWidth, this.windowWidth);
          this.transWidth = this.imgWidth * this.transformScale;
          this.transHeight = this.imgHeight * this.transformScale;
          this.canvas.drawImage(this.imgEl, this.translateX - this.transWidth / 2, this.translateY - this.transHeight / 2, this.transWidth, this.transHeight);
        });

        /*平移*/
        hammer.on('panstart panmove', e => {
          if (e.type === 'panstart') {
            this.prevX = this.translateX;
            this.prevY = this.translateY;
          }
          this.translateX = this.prevX + e.deltaX;
          this.translateY = this.prevY + e.deltaY;

          /*擦除canvas*/
          this.canvas.clearRect(0 - this.windowWidth / 2, 0 - this.windowWidth / 2, this.windowWidth, this.windowWidth);
          this.canvas.drawImage(this.imgEl, this.translateX - (this.transWidth || this.imgWidth) / 2, this.translateY - (this.transHeight || this.imgHeight) / 2, this.transWidth || this.imgWidth, this.transHeight || this.imgHeight);
        });
      },

      /**
       * +++++++++++++++++++++++++++++++++++++
       * 裁切
       * +++++++++++++++++++++++++++++++++++++
       * */
      crop() {
        let base64 = document.querySelector('#canvas').toDataURL("image/png");
        let nImg = new Image(), upLoadImg;
        nImg.src = base64;
        nImg.onload = () => {
          this.canvasResult.fillStyle = 'white';
          this.canvasResult.fillRect(0, 0, 160, 160);
          this.canvasResult.drawImage(nImg, -(this.windowWidth / 2 - 80), -(this.windowWidth / 2 - 80));
          /*最后导出裁切好的图片base64码*/
          upLoadImg = dataURItoBlob(document.querySelector('#resultImg').toDataURL("image/jpeg"));

          /**
           * +++++++
           * 开始上传
           * +++++++
           * */
          let formData = new FormData();
          formData.append('action', "edit_user_pic");//有些苹果不支持get方法，这里是个坑，所以用append
          formData.append('files', upLoadImg, 'image.jpeg');


          // axios({
          //   headers: {
          //     'Content-Type':'multipart/form-data'
          //   },
          //   method: 'post',
          //   url: '/api/fileApi',
          //   data: formData
          // }).then()
        }
      },
    },
    mounted() {
      let canvas = document.querySelector('#canvas'),
          canvasMask = document.querySelector('#canvasMask'),
          canvasRsut = document.querySelector('#resultImg');
      this.canvas = canvas.getContext('2d');
      this.canvasMask = canvasMask.getContext('2d');
      this.canvasResult = canvasRsut.getContext('2d');
      this.windowWidth = window.innerWidth;
    }
  }
</script>

<style lang="scss">
    @import "./style/imgEditor";
</style>
