interface Utils {
  x: number;
  y: number;
}
// 두 점 사이의 거리
export function getDistance(p1: Utils, p2: Utils) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  return Math.sqrt(dx * dx + dy * dy);
}

// 두 점 사이의 각도
export function getAngle(p1: Utils, p2: Utils) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  return Math.atan2(dy, dx);
}

// 전체 그림중 몇퍼센트가 비워지는지 확인
export function getOpacityPercent(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  const pixels = ctx.getImageData(0, 0, width, height);
  const gap = 128;
  const total = pixels.data.length / gap;
  let count = 0;

  for (let i = 0; i < pixels.data.length - 3; i += gap) {
    if (pixels.data[i + 3] === 0) count++;
  }

  return Math.round((count / total) * 100);
}

// background image cover 효과 주기
export function drawImageCenter(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement
) {
  const cw = canvas.width;
  const ch = canvas.height;

  const iw = image.width;
  const ih = image.height;

  const ir = ih / iw;
  const cr = ch / cw;

  let sx: number;
  let sy: number;
  let sw: number;
  let sh: number;

  if (ir >= cr) {
    sw = iw;
    sh = sw * (ch / cw);
  } else {
    sh = ih;
    sw = sh * (cw / ch);
  }

  sx = iw / 2 - sw / 2;
  sy = ih / 2 - sh / 2;

  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, cw, ch);
}
