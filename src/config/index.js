/**
 * +++++++++++++++++++++++++++++++++++
 * 环境变量
 * @value: test             --->   测试环境
 * @value: ready          --->   预发布环境
 * @value: production  --->   正式环境
 * +++++++++++++++++++++++++++++++++++
 * */
const PACKING_CONDITION = 'test'

/**
 * +++++++++++++++++++++++++++++++++++
 * 接口配置
 * test             --->   测试环境
 * ready          --->   预发布环境
 * production  --->   正式环境
 * +++++++++++++++++++++++++++++++++++
 * */
export const BASE_URL = (function () {
  const url = {
    test: 'http://bc.ngrok.i84.com.cn',
    ready: 'https://www.easy-mock.com/mock/5b502bb4645157291985a472/buslifemall',
    production: 'https://www.easy-mock.com/mock/5b502bb4645157291985a472/buslifemall'
  }

  if (PACKING_CONDITION) {
    return url[PACKING_CONDITION]
  } else {
    return url.test
  }
})()

/**
 * +++++++++++++++++++++++++++++++++++
 * 开启vconsole调试框（需要安装vconsole后）
 * +++++++++++++++++++++++++++++++++++
 * */
export const SHOW_VCONSOLE = true

/**
 * +++++++++++++++++++++++++++++++++++
 * 吐司提示延迟关闭时间
 * +++++++++++++++++++++++++++++++++++
 * */
export const TOAST_CLOSE_TIME = 3000

/**
 * +++++++++++++++++++++++++++++++++++
 * loading延迟关闭时间
 * +++++++++++++++++++++++++++++++++++
 * */
export const LOADING_CLOSE_TIME = 0
