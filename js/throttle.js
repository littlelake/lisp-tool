/**
 * @description 节流
 * @author lisp
 */

function throttle(fn, delay) {
  let timer = null;
  return function () {
    const context = this;
    const args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(context, args);
        timer = null;
      }, delay);
    }
  }
}

function saySomething() {
  console.log('say hi');

}

window.addEventListener('scroll', throttle(saySomething, 1000));