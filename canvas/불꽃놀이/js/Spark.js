import CanvasOption from "./CanvasOption.js";

export default class Spark extends CanvasOption {
  constructor(x, y, vx, vy, opacity, colorDeg) {
    super();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.opacity = opacity;
    this.colorDeg = colorDeg;
  }

  update() {
    this.opacity -= 0.01;
    this.x += this.vx;
    this.y += this.vy;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI);
    this.ctx.fillStyle = `hsla(${this.colorDeg}, 100%, 65%, ${this.opacity})`;
    this.ctx.fill();
    this.ctx.closePath();

    // this.ctx.beginPath();
    // this.ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI);
    // this.ctx.fillStyle = "gold";
    // this.ctx.fill();
    // this.ctx.closePath();
  }
}
