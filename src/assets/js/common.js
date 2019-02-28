

/**
* 全局baseUrl
* */
const baseUrl = 'https://www.easy-mock.com/mock/5b502bb4645157291985a472/buslifemall';

/**
 * blob转换
 * @param base64Data String
 * */
const dataURItoBlob = base64Data =>{
  let byteString,mimeString,ia,byteLen;

  if (base64Data.split(',')[0].indexOf('base64') >= 0){
    byteString = atob(base64Data.split(',')[1]);
  }else{
    // byteString = unescape(base64Data.split(',')[1]);
    byteString = decodeURI(base64Data.split(',')[1]);
  }

  byteLen = byteString.length;
  mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
  ia = new Uint8Array(byteLen);
  for (let i = 0; i < byteLen; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {type: mimeString});
};

/**
 * 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
export const Debounce = (fn, t) => {
    let delay = t || 500;
    let timer;
    console.log(fn)
    console.log(typeof fn)
    return function () {
        let args = arguments;
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, args);
        }, delay);
    }
};

/**
 * 函数节流
 * @param fn
 * @param interval
 * @returns {Function}
 * @constructor
 */
export const Throttle = (fn, t) => {
    let last;
    let timer;
    let interval = t || 500;
    return function () {
        let args = arguments;
        let now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                last = now;
                fn.apply(this, args);
            }, interval);
        } else {
            last = now;
            fn.apply(this, args);
        }
    }
};

export {
  dataURItoBlob,
  baseUrl,
  Debounce,
  Throttle
}










