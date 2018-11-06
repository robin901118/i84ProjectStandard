const path = require('path');
const baseUrl = process.env.NODE_ENV === 'production' ? './' : '/';

module.exports = {
  /*build的时候打包成相对路径，dev时用绝对路径*/
  baseUrl: baseUrl,
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
  }
}
