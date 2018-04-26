var Validate = {
  // 验证手机号码是否正确
  isPhone: function (text) {
    // 如果text为空
    if (text) return;

    const reg = /^(139|176)[0-9]{8}$/;
    return reg.test(text);
  },

  // new Date转化为yyyy-MM-dd HH:mm:ss
  dateToFormat: function (date) {
    return date.toLocaleString('zh-CN', {
        hour12: false
      })
      .replace(/\//g, '-').replace(/\b\d\b/g, '0$&');
  },

  // new Date转化为yyyy-MM-dd
  dateToDate: function (date) {
    return this.dateToFormat(date).split(' ')[0];
  },

  // new Date转化为HH:mm:ss
  dateToTime: function (date) {
    return this.dateToFormat(date).split(' ')[1];
  },

  // 日期转化为毫秒数
  forMatToTime: function (date) {
    return new Date(date).getTime();
  },

  // 数组去重
  changeReArr: function (arr) {
    let newArr = [];
    if (!arr.length) return [];

    arr.forEach(function (item, index) {
      newArr.indexOf(item) > -1 ? '' : newArr.push(item);
    });

    return newArr;
  },

  // 数组排序，升序
  orderArr: function (arr) {
    arr.sort((a, b) => {
      return a - b;
    });
  },

  // 数组中的最大值
  maxArr: function (arr) {
    return Math.max(...arr);
    // 或者return Math.max.apply(null, arr);
  }

}