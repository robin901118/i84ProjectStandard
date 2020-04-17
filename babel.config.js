const plugins = [
  ['syntax-dynamic-import'],
  "@babel/plugin-proposal-optional-chaining"
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
