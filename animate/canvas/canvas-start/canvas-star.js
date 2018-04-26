/**
 * @description 该动画为转动的星图
 * 
 * 使用时在html中设置一个<canvas id="canvas" />的元素，然后在调用的时候需要import，然后canvasStar.init()就能显示了。
 */

const canvasStar = {
  init() {
    // 设置canvas的id值
    const canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      w = canvas.width = window.innerWidth,
      h = canvas.height = window.innerHeight,

      hue = 217,
      stars = [],
      maxStars = 1400;
    let count = 0;

    // Thanks @jackrugile for the performance tip! http://codepen.io/jackrugile/pen/BjBGoM
    // Cache gradient
    const canvas2 = document.createElement('canvas'),
      ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;

    const half = canvas2.width / 2,
      gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#fff');
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

    // End cache

    function random(min, max) {
      if (arguments.length < 2) {
        max = min;
        min = 0;
      }

      if (min > max) {
        let hold = max;
        max = min;
        min = hold;
      }

      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const Star = function () {

      this.orbitRadius = random(0, w / 2 - 50);
      this.radius = random(100, this.orbitRadius) / 10;
      this.orbitX = w / 2;
      this.orbitY = h / 2;
      this.timePassed = random(0, maxStars);
      this.speed = random(0, this.orbitRadius) / 900000;
      this.alpha = random(2, 10) / 10;

      count++;
      stars[count] = this;
    };

    Star.prototype.draw = function () {
      const x = Math.sin(this.timePassed + 1) * this.orbitRadius + this.orbitX,
        y = Math.cos(this.timePassed) * this.orbitRadius / 2 + this.orbitY,
        twinkle = random(0, 10);

      if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
      } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
      }

      ctx.globalAlpha = this.alpha;
      ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
      this.timePassed += this.speed;
    };

    for (let i = 0; i < maxStars; i++) {
      new Star();
    }

    function animation() {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      for (let i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
      }

      window.requestAnimationFrame(animation);
    }

    animation();
  }
};

export default canvasStar;