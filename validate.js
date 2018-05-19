class Validate {
  /**
   * @description 检验手机号
   * @param {any} val - {
   * 移动号段：
   * 134 135 136 137 138 139 147 150 151 152 157 158 159 172 178 182 183 184 187 188
   * 联通号段：
   * 130 131 132 145 155 156 171 175 176 185 186
   * 电信号段：
   * 133 149 153 173 177 180 181 189
   * 虚拟运营商:
   * 170
   * }
   */
  checkPhone = (text) => {
    // 如果text为空
    if (text) return;

    const reg = /^(13[0-9]|14[579]|15[0-35-9]|17[01235678]|18[0-9])[0-9]{8}$/;
    return !reg.test(text) ? false : true;
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

  // 数组中的最大值
  maxArr = (arr) => {
    return Math.max(...arr);
    // 或者return Math.max.apply(null, arr);
  }

  /**
   * @description 检验val的值的长度是否与len相等
   * @param {any} val - 值 
   * @param {number} len - 长度
   */
  checkLengthEqual(val, len) {
    return val.length !== len ? false : true;
  }

  /**
   * @description 检验val的长度是否在min和max之间
   * @param {any} val - 值
   * @param {number} min - 最小长度
   * @param {number} max - 最大长度
   */
  checkLength(val, min, max) {
    if (max === undefined) {
      return (val.length < min) ? false : true;
    }
    return (val.length < min || val.length > max) ? false : true;
  }

  /**
   * @description 格式化千分位
   * @param {number} val - 值
   */
  formatThousandth(val) {
    let reg = /(\d)(?=(\d{3})+(?:\.\d+)?$)/g;
    if (!!val) {
      return val.replace(reg, '$1,');
    } else {
      return val;
    }
  }

  /**
   * @description 将千分位的','去掉
   * @param {number} val - 值
   */
  parseThousandth(val) {
    return val.replace(/,/g, '');
  }

  /**
   * @description 检验身份证号
   * @param {number} val - 值
   */
  checkCardID(val) {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return !reg.test(val) ? false : true;
  }

  /**
   * @description 检验银行卡号
   * @param {number} val - 银行卡 
   */
  checkBankCard(val) {
    let reg = /^\d{16}|\d{19}$/;
    return !reg.test(val) ? false : true;
  }

  /**
   * @description 检验邮箱
   * @param {any} val - 值 
   */
  checkEmail(val) {
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return !reg.test(val) ? false : true;
  }
}

export default new Validate;