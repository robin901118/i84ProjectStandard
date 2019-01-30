

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
export {
  dataURItoBlob,
  baseUrl
}










