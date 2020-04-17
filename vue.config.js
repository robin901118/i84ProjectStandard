const baseUrl = process.env.NODE_ENV === 'production' ? './' : '/'

const devServe = ()=>{
  if(process.env.VUE_APP_CURRENTMODE === "mock"){
    return {
      port: 9090,
      proxy: {
        '/proxyApi': {
          target: process.env.VUE_APP_BASEURL,//这里后台的地址模拟的;应该填写你们真实的后台接口
          ws: true,
          changOrigin: true,//允许跨域
          pathRewrite: {
            '^/proxyApi': ''//请求的时候使用这个api就可以
          }
        }
      }
    }
  }else{
    return {
      port: 9090
    }
  }
};

module.exports = {
  /* build的时候打包成相对路径，dev时用绝对路径 */
  publicPath: baseUrl,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [
          './src/theme'
        ]
      },
      sass:{
        prependData:'@import "@/assets/css/_family.scss";@import "@/assets/css/_theme.scss";'
      }
    }
  },
  transpileDependencies: [
    'vuex-along'
  ],
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: config => {
    const obj = {}

    /* 配置图片路径，在scss中如果要引入背景图可以用~img即可 */
    obj.resolve = {
      alias: {
        img: '@/assets/img'
      }
    }

    return obj
  },
  devServer: devServe()
}
