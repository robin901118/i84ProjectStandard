/**
 * blob转换
 * @param base64Data String
 * */
const dataURItoBlob = base64Data => {
  let byteString, mimeString, ia, byteLen;

  if (base64Data.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(base64Data.split(',')[1]);
  } else {
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
 * 判断微信或者支付宝
 * **/
const isWeixinOrAlipay = () => {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.indexOf('micromessenger') !== -1) {
    return "weixin";
  } else if (ua.indexOf('alipay') !== -1) {
    return "alipay";
  } else {
    return 'other';
  }
};

/**
 * 判断安卓或者ios
 * **/
const getPhoneSystem = () => {
  if (window.navigator.userAgent.indexOf('Android') > -1 || window.navigator.userAgent.indexOf('Linux') > -1) {
    return "Android"
  } else if (ua.indexOf('iPhone') > -1) {
    return "iPhone"
  } else {
    return "other";
  }
};

/**
 * 解析URL中的参数
 * @param parameterName 参数名称
 * @param currentUrl 当前url
 * @returns {*}
 */
const getQueryString = (parameterName, currentUrl,)=>{
  let rs = new RegExp("(^|[&,?])" + parameterName + "=([^\&]*)(\&|$)", "gi").exec(currentUrl), tmp;
  if (tmp = rs) return tmp[2];
  return null;
};


export {
  dataURItoBlob,
  isWeixinOrAlipay,
  getPhoneSystem,
  getQueryString
}










