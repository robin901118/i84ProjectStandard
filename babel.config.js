const plugins = [
  ['syntax-dynamic-import'],
  "@babel/plugin-proposal-optional-chaining",//可选链  ES2020插件 .?
  "@babel/plugin-proposal-nullish-coalescing-operator"//非undefined或者非null  ES2020插件 ??
];

//正式环境去除console.log
if(process.env.NODE_ENV === 'production'){
  plugins.push("transform-remove-console")
}

module.exports = {
  presets: [
    '@vue/app',
  ],
  plugins: plugins
}
