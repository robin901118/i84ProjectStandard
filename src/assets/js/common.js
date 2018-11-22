/**
 * 判断浏览器是微信还是支付宝
 * @return {string}   weixin->微信  alipay->支付宝 other->其他
 */
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
 * 获取手机系统类型
 * */
const getPhoneSystem = () => {
  let ua = navigator.userAgent;
  if (ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) {
    return "Android"
  } else if (ua.indexOf('iPhone') > -1) {
    return "iPhone"
  }
};

/**
 * 根据参数名称从url中获取值
 * @param parameterName 参数名称
 * @param currentUrl 当前url
 * @param errorMsg 错误提示信息
 * @returns {*}
 */
const getQueryString = (parameterName, currentUrl, errorMsg) => {
  let rs = new RegExp("(^|[&,?])" + parameterName + "=([^\&]*)(\&|$)", "gi").exec(currentUrl), tmp;
  if (tmp = rs) return tmp[2];
  return errorMsg;
};

/**
 * 判断是否是json对象
 * @param obj 需要认定的参数
 * @return {Boolean}
 */
const isJson = obj => {
  return (typeof(obj) === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length && obj);
};

/**
 * 前端加密解密
 * AES加密
 * */
const CryptoJS = require('crypto-js'); //引用AES源码js
const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量

//加密
const encrypt = word => {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
  return encrypted.ciphertext.toString().toUpperCase();
};

//解密
const decrypt = word => {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};

/**
 * blob转换
 * @param base64Data String
 * */
const dataURItoBlob = base64Data =>{
  let byteString,mimeString,ia;

  if (base64Data.split(',')[0].indexOf('base64') >= 0){
    byteString = atob(base64Data.split(',')[1]);
  }else{
    // byteString = unescape(base64Data.split(',')[1]);
    byteString = decodeURI(base64Data.split(',')[1]);
  }

  mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
  ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {type: mimeString});
};

export {
  isWeixinOrAlipay,
  getQueryString,
  getPhoneSystem,
  isJson,
  decrypt,
  encrypt,
  dataURItoBlob
}
