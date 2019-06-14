module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        'iOS >= 7',
        'Android >= 4'
      ]
    },
    'postcss-px-to-viewport': {
      viewportWidth: 750,
      viewportHeight: 1334,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false
    },
    'postcss-design-convert':{
      multiple: 2,
      units: ['vw'],
      selector: /^\.cube-/
    }
  }
}
