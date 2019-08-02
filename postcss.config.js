module.exports = {
  plugins: {
    /* 自动添加浏览器兼容前缀 */
    autoprefixer: {
      overrideBrowserslist: [
        'iOS >= 7',
        'Android >= 4'
      ]
    },
    /* px转vw配置 */
    'postcss-px-to-viewport': {
      viewportWidth: 750,
      viewportHeight: 1334,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false
    },
    /* cube-ui样式为1倍图，而我们设计稿为2倍图，特此兼容配置 */
    'postcss-design-convert': {
      multiple: 2,
      units: ['vw'],
      selector: /^\.cube-/
    }
  }
}
