/**
 * 公共工具类
 * isWeixinOrAlipay()  =>  判断浏览器是微信还是支付宝
 * getPhoneSystem()  =>  获取手机系统类型
 * getQueryString()  =>  根据参数名称从url中获取值
 * isJson()  =>  判断是否是json对象
 * encrypt()  =>  加密
 * decrypt()  =>  解密
 **/
class Tool {
  constructor() {
    this.winNav = window.navigator.userAgent;
    this.CryptoJS = require('crypto-js'); //引用AES源码js
    this.key = this.CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
    this.iv = this.CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量
  }

  isWeixinOrAlipay() {
    let ua = this.winNav.toLowerCase();
    if (ua.indexOf('micromessenger') !== -1) {
      return "weixin";
    } else if (ua.indexOf('alipay') !== -1) {
      return "alipay";
    } else {
      return 'other';
    }
  };

  getPhoneSystem(){
    if (this.winNav.indexOf('Android') > -1 || this.winNav.indexOf('Linux') > -1) {
      return "Android"
    } else if (ua.indexOf('iPhone') > -1) {
      return "iPhone"
    } else {
      return "other";
    }
  };

  /**
   * @param parameterName 参数名称
   * @param currentUrl 当前url
   * @returns {*}
   */
  getQueryString(parameterName, currentUrl,) {
    let rs = new RegExp("(^|[&,?])" + parameterName + "=([^\&]*)(\&|$)", "gi").exec(currentUrl), tmp;
    if (tmp = rs) return tmp[2];
    return null;
  };

  /**
   * @param obj 需要认定的参数
   * @return {Boolean}
   */
  isJson(obj) {
    return (typeof(obj) === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length && obj);
  };

  /**
   * @param word 加密的数据
   * */
  encrypt(word) {
    let srcs = this.CryptoJS.enc.Utf8.parse(word);
    let encrypted = this.CryptoJS.AES.encrypt(
      srcs,
      this.key,
      {
        iv: this.iv,
        mode: this.CryptoJS.mode.CBC,
        padding: this.CryptoJS.pad.Pkcs7
      });
    return encrypted.ciphertext.toString().toUpperCase();
  };

  /**
   *  @param  word 需要解密的数据
   * */
  decrypt(word) {
    let encryptedHexStr = this.CryptoJS.enc.Hex.parse(word);
    let srcs = this.CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = this.CryptoJS.AES.decrypt(
      srcs,
      this.key,
      {
        iv: this.iv,
        mode: this.CryptoJS.mode.CBC,
        padding: this.CryptoJS.pad.Pkcs7
      });
    let decryptedStr = decrypt.toString(this.CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  };

  /**
   *  打乱数组（数组随机排序）
   *  @param array 数组
   * */
  derangedArray(array) {
    for (let j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x) ;
    return array;
  };

  /**
   * 将一个数组分成几个同等长度的数组
   * @param array [分割的原数组]
   * @param size [每个子数组的长度]
   */
  sliceArray(array, size) {
    let result = [];
    for (let x = 0; x < Math.ceil(array.length / size); x++) {
      let start = x * size;
      let end = start + size;
      result.push(array.slice(start, end));
    }
    return result;
  }
}
export default new Tool();