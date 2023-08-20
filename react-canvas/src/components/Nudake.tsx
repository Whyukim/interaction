import { useEffect, useRef } from "react";
import styled from "styled-components";

interface NudakeProps {}

function Nudake({}: NudakeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const canvasParent = canvas.parentNode as HTMLDivElement;
    const ctx = canvas.getContext("2d");

    let canvasWidth: number;
    let canvasHeight: number;

    function resize() {
      canvasWidth = canvasParent.clientWidth;
      canvasHeight = canvasParent.clientHeight;
      canvas.style.width = canvasWidth + "px";
      canvas.style.height = canvasHeight + "px";
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }

    let x = 0;
    let y = 0;
    let vx = 20;
    let vy = 20;
    let size = 200;
    let frameFlag: number;

    function frame() {
      frameFlag = requestAnimationFrame(frame);
      ctx?.clearRect(0, 0, canvasWidth, canvasHeight);

      if (x < 0) {
        x = 0;
        vx *= -1;
      } else if (x > canvasWidth - size) {
        x = canvasWidth - size;
        vx *= -1;
      } else if (y < 0) {
        y = 0;
        vy *= -1;
      } else if (y > canvasHeight - size) {
        y = canvasHeight - size;
        vy *= -1;
      }

      x += vx;
      y += vy;
      ctx?.fillRect(x, y, size, size);
    }

    window.addEventListener("resize", resize);
    resize();
    requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameFlag);
    };
  }, []);

  return (
    <Wrapper className="nudake">
      <canvas ref={canvasRef} />
    </Wrapper>
  );
}

export default Nudake;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: red;

  & > canvas {
    position: absolute;
  }
`;
