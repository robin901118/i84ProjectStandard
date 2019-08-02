/**
 * encrypt()  =>  加密
 * decrypt()  =>  解密
 **/
class EncAndDec {
  constructor () {
    this.CryptoJS = require('crypto-js') // 引用AES源码js
    this.key = this.CryptoJS.enc.Utf8.parse('1234123412ABCDEF') // 十六位十六进制数作为密钥
    this.iv = this.CryptoJS.enc.Utf8.parse('ABCDEF1234123412') // 十六位十六进制数作为密钥偏移量
  }

  /**
   * @param word 加密的数据
   * */
  encrypt (word) {
    const srcs = this.CryptoJS.enc.Utf8.parse(word)
    const encrypted = this.CryptoJS.AES.encrypt(
      srcs,
      this.key,
      {
        iv: this.iv,
        mode: this.CryptoJS.mode.CBC,
        padding: this.CryptoJS.pad.Pkcs7
      })
    return encrypted.ciphertext.toString().toUpperCase()
  };

  /**
   *  @param  word 需要解密的数据
   * */
  decrypt (word) {
    const encryptedHexStr = this.CryptoJS.enc.Hex.parse(word)
    const srcs = this.CryptoJS.enc.Base64.stringify(encryptedHexStr)
    const decrypt = this.CryptoJS.AES.decrypt(
      srcs,
      this.key,
      {
        iv: this.iv,
        mode: this.CryptoJS.mode.CBC,
        padding: this.CryptoJS.pad.Pkcs7
      })
    const decryptedStr = decrypt.toString(this.CryptoJS.enc.Utf8)
    return decryptedStr.toString()
  };
}
export default new EncAndDec()
