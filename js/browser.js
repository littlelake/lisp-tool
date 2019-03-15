/**
 * @description 判断客户端是pc端还是移动端
 * @return {boolean} isAndroid - 是否是安卓
 * @return {boolean} isFireFox - 是否是火狐
 * @return {boolean} isChrome - 是否是chrome
 * @return {boolean} isPc - 是否是pc端
 * @return {boolean} isPhone - 是否是IOS
 */

var browser = function () {
  var ua = navigator.userAgent;

  var isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isPhone = /(?:iPhone)|(?:iPad)|(?:iPod)|(?:iOS)/.test(ua),
    isPc = !isPhone && !isAndroid;

  return {
    isAndroid,
    isFireFox,
    isChrome,
    isPhone,
    isPc
  };
};