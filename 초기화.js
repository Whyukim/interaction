const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio || 1;

const fps = 60;
const interval = 1000 / fps;
let now, delta;
let then = Date.now();

let canvasWidth, canvasHeight;

function init() {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;

  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);

  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
}

function render() {
  requestAnimationFrame(render);
  now = Date.now();
  delta = now - then;
  if (delta < interval) return;

  ctx.fillRect(100, 100, 200, 200);

  then = now - (delta % interval);
}

window.addEventListener("load", () => {
  init();
  render();
});

window.addEventListener("resize", () => {
  init();
});

// class 초기화

// export default class CanvasOption {
//   constructor() {
//     this.canvas = document.querySelector("canvas");
//     this.ctx = this.canvas.getContext("2d");
//     this.dpr = devicePixelRatio > 1 ? 2 : 1;
//     this.fps = 60;
//     this.interval = 1000 / this.fps;
//     this.canvasWidth = innerWidth;
//     this.canvasHeight = innerHeight;
//     this.bgColor = "#000000";
//   }
// }

// import CanvasOptions from "./js/CanvasOption.js";

// class Canvas extends CanvasOptions {
//   constructor() {
//     super();
//   }

//   init() {
//     this.canvasWidth = innerWidth;
//     this.canvasHeight = innerHeight;

//     this.canvas.width = this.canvasWidth * this.dpr;
//     this.canvas.height = this.canvasHeight * this.dpr;
//     this.ctx.scale(this.dpr, this.dpr);

//     this.canvas.style.width = this.canvasWidth + "px";
//     this.canvas.style.height = this.canvasHeight + "px";
//   }

//   render() {
//     let now, delta;
//     let then = Date.now();

//     const frame = () => {
//       requestAnimationFrame(frame);

//       now = Date.now();
//       delta = now - then;
//       if (delta < this.interval) return;

//       this.ctx.fillRect(100, 100, 200, 200);

//       then = now - (delta % this.interval);
//     };

//     requestAnimationFrame(frame);
//   }
// }

// const canvas = new Canvas();

// window.addEventListener("load", () => {
//   canvas.init();
//   canvas.render();
// });

// window.addEventListener("resize", () => {
//   canvas.init();
// });
