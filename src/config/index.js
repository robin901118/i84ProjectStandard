

/**********  全局接口配置  **************/
const url = {
  //测试环境
  "test" : "http://bc.ngrok.i84.com.cn",
  //预发布环境
  "preRelease" : "https://www.easy-mock.com/mock/5b502bb4645157291985a472/buslifemall",
  //正式环境
  "production" : "https://www.easy-mock.com/mock/5b502bb4645157291985a472/buslifemall"
}

export const BASE_URL = url['test'];



/**********  吐司提示延迟关闭时间  **************/
export const TOAST_CLOSE_TIME = 3000;



/**********  loading延迟关闭时间  **************/
export const LOADING_CLOSE_TIME = 0;
