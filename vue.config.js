const path = require('path');
const baseUrl = process.env.NODE_ENV === 'production' ? './' : '/';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  /*build的时候打包成相对路径，dev时用绝对路径*/
  publicPath: baseUrl,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      },
      /*css中的图片分离*/
      css: {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 4192,
          name: path.posix.join(baseUrl)
        }
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: config => {

    let obj = {};

    /*以下控件通过CDN引入*/
    obj.externals = {
      'vue': 'Vue',
      'vue-router': 'VueRouter'
    };

    /*配置图片路径，在css中如果要引入背景图可以用~img即可*/
    obj.resolve = {
      alias: {
        'img': '@/assets/img',
      }
    };

    /*生产环境下禁止console.log*/
    if (process.env.NODE_ENV === 'production') {
      obj.plugins = [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true,
            }
          },
          sourceMap: false,
          parallel: true,
        })
      ]
    }
    return obj
  }



};
