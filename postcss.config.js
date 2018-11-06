module.exports = {
    plugins: {
        autoprefixer: {
            browsers: [
                'iOS >= 7',
                'Android >= 4'
            ]
        },
        'postcss-px-to-viewport': {
            viewportWidth: 375,
            viewportHeight: 667,
            unitPrecision: 5,
            viewportUnit: 'vw',
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false
        }
    }
}
