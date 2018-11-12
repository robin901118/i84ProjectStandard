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
 * 根据参数名称从url中获取值
 * @param parameterName 参数名称
 * @param currentUrl 当前url
 * @param errorMsg 错误提示信息
 * @returns {*}
 */
const GetQueryString = (parameterName, currentUrl, errorMsg) => {
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
 * 支付宝支付
 * @param String groupNo 组合订单号
 */
import {baseUrl} from './http';

const callAliPay = groupNo => {
  window.location.replace(`${baseUrl}/auth/alipayto?groupNo=${groupNo}&returnUrl=/h5/followBuy/payProxy.html?groupNo=${groupNo}`);
};

/**
 * 存储localStorage
 */
const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
};

/**
 * 获取localStorage
 */
const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name)
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

export {
  isWeixinOrAlipay,
  GetQueryString,
  isJson,
  callAliPay,
  setStore,
  getStore,
  removeStore,
  decrypt,
  encrypt
}
