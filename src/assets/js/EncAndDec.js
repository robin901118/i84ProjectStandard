/**
 * encrypt()  =>  加密
 * decrypt()  =>  解密
 **/
class EncAndDec {
  constructor() {
    this.CryptoJS = require('crypto-js'); //引用AES源码js
    this.key = this.CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
    this.iv = this.CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量
  }
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
}
export default new EncAndDec();