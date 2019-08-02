/**
 * blob转换
 * @param base64Data String
 * */
const dataURItoBlob = base64Data => {
  let byteString = ''
  let mimeString = ''

  if (base64Data.split(',')[0].indexOf('base64') >= 0) {
    byteString = window.atob(base64Data.split(',')[1])
  } else {
    byteString = decodeURI(base64Data.split(',')[1])
  }

  const byteLen = byteString.length
  mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]
  const ia = new Uint8Array(byteLen)
  for (let i = 0; i < byteLen; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new window.Blob([ia], { type: mimeString })
}

/**
 * 判断微信或者支付宝
 * **/
const isWeixinOrAlipay = () => {
  const ua = window.navigator.userAgent.toLowerCase()
  if (ua.indexOf('micromessenger') !== -1) {
    return 'weixin'
  } else if (ua.indexOf('alipay') !== -1) {
    return 'alipay'
  } else {
    return 'other'
  }
}

/**
 * 判断安卓或者ios
 * **/
const getPhoneSystem = () => {
  const ua = window.navigator.userAgent
  if (ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) {
    return 'Android'
  } else if (ua.indexOf('iPhone') > -1) {
    return 'iPhone'
  } else {
    return 'other'
  }
}

/**
 * 解析URL中的参数
 * @param parameterName 参数名称
 * @param currentUrl 当前url
 * @returns {*}
 */
const getQueryString = (parameterName, currentUrl) => {
  const rs = new RegExp('(^|[&,?])' + parameterName + '=([^&]*)(&|$)', 'gi').exec(currentUrl)
  if (rs) return rs[2]
  return null
}

export {
  dataURItoBlob,
  isWeixinOrAlipay,
  getPhoneSystem,
  getQueryString
}
