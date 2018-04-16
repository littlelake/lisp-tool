var test = {
  dateToFormat: function (date) {
    return date.toLocaleString('zh-CN', {
        hour12: false
      })
      .replace(/\//g, '-').replace(/\b\d\b/g, '0$&');
  },
  dateToDate: function(date) {
    return test.dateToFormat(date).split(' ')[0];
  },
  dateToTime: function(date) {
    return test.dateToFormat(date).split(' ')[1];
  },
  forMatToTime: function(date) {
    return new Date(date).getTime();
  },
  changeReArr: function(arr) {
    return Array.from(new Set(arr));
  }
}

// dateToFormat
// console.log(test.dateToFormat(new Date()));
// dateToDate
// console.log(test.dateToDate(new Date()));
// console.log(test.dateToTime(new Date()));
console.log(test.changeReArr([1,2,3,4,3,1,2,44,21]));