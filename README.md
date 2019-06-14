# 通用H5框架标准
该框架是结合本公司需求进行优化的框架，底层用了滴滴的cube-ui，框架内继承了一些比较常用的插件，封装了请求方法，开箱即用。

## 安装依赖
```
yarn install
npm install
```

### 开发环境
```
yarn run serve
npm run serve
```

### 生产环境
```
yarn run build
npm run build
```

### 单个请求实例
```
let result = await this.$http.ajax({
  url:'/api',
  method:'post',
  data:{
    action:"scan",
    groupNo:"tttt"
  }
});

console.log('页面返回',result)
```

### 并发请求实例
```
let result = await this.$http.all({
  requestArr:[
    {
      url:'/goodsData',
      method:"post",
      data:{pms:1}
    },
    {
      url:"/search",
      method:"post",
      data:{index:2}
    },
    {
      url:"/integral",
      method:"post"
    }
  ]
});
```

### 日期格式化
```
this.$day('2018-10-10 15:24').format('YYYY mm:ss')
详细参考day.js
```

### storage
```
this.$storage.getStorage(key)
this.$storage.setStorage(key,value)
详细参考goodstorage
```

### UI组件
```
详细参考cube-ui官方文档
```

### keep-alive
```
详细参考vue-navigation
```

### 图片懒加载
```
详细参考vue-lazy-image-loading
```

### 图片编辑器
```
详细参考lb-image-editor
```