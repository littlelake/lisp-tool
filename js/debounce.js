/**
 * @description 防抖
 * @author lisp
 */

function debounce(fn, wait) {
  let timeout = null;
  return function () {
    const context = this;
    const args = arguments;
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn.apply(context, args);
    }, wait);
  }
}

function saySomething() {
  console.log('say hi');
}

const inp = document.querySelector('.debounce');
inp.addEventListener('input', debounce(saySomething, 1000))

