class Validate {
  // 验证手机号码是否正确
  isPhone = (text) => {
    // 如果text为空
    if (text) return;

    const reg = /^(139|176)[0-9]{8}$/;
    return reg.test(text);
  }

  // new Date转化为yyyy-MM-dd HH:mm:ss
  dateToFormat = (date) => {
    return date.toLocaleString('zh-CN', {
        hour12: false
      })
      .replace(/\//g, '-').replace(/\b\d\b/g, '0$&');
  }

  // new Date转化为yyyy-MM-dd
  dateToDate = (date) => {
    return this.dateToFormat(date).split(' ')[0];
  }

  // new Date转化为HH:mm:ss
  dateToTime = (date) => {
    return this.dateToFormat(date).split(' ')[1];
  }

  // 日期转化为毫秒数
  forMatToTime = (date) => {
    return new Date(date).getTime();
  }

  // 数组去重
  changrReArr = (arr) => {
    return Array.from(new Set(arr));
    // 或者 return [...new Set(arr)];
  }

  // 数组排序，升序
  orderArr = (arr) => {
    arr.sort((a, b) => {
      return a - b;
    });
  }

}

export default new Validate;