import { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpeg";
import {
  drawImageCenter,
  getAngle,
  getDistance,
  getOpacityPercent,
} from "../utils/utils";
import throttle from "lodash/throttle";

function Nudake2() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const canvasParent = canvas.parentNode as HTMLDivElement;
    const ctx = canvas.getContext("2d");

    const images = [image1, image2];
    const loadedImages: HTMLImageElement[] = [];
    let currentIamge = 0;
    let isChange = false;
    let prevPos: { x: number; y: number } | null = { x: 0, y: 0 };

    let canvasWidth: number;
    let canvasHeight: number;

    function reSize() {
      canvasWidth = canvasParent.clientWidth;
      canvasHeight = canvasParent.clientHeight;
      canvas.style.width = canvasWidth + "px";
      canvas.style.height = canvasHeight + "px";
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      preloadImages().then(() => {
        drawImage();
      });
    }

    function preloadImages() {
      return new Promise<void>((resolve, reject) => {
        let loaded = 0;
        images.forEach((src) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loaded += 1;
            loadedImages.push(img);
            if (loaded === loadedImages.length) return resolve();
          };
        });
      });
    }

    function drawImage() {
      isChange = true;
      // ctx?.clearRect(0, 0, canvasWidth, canvasHeight);
      const image = loadedImages[currentIamge];
      const firstDrawing = ctx?.globalCompositeOperation === "source-over";

      gsap.to(canvas, {
        opacity: 0,
        duration: firstDrawing ? 0 : 1,
        onComplete: () => {
          canvas.style.opacity = "1";

          ctx!.globalCompositeOperation = "source-over";
          // ctx?.drawImage(image, 0, 0, canvasWidth, canvasHeight);
          drawImageCenter(canvas, ctx!, image);

          const nextImage = images[(currentIamge + 1) % images.length];
          canvasParent.style.backgroundImage = `url(${nextImage})`;

          prevPos = null;
          isChange = false;
        },
      });
    }

    function mouseDown(e: MouseEvent) {
      if (isChange) return;
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);

      prevPos = { x: e.offsetX, y: e.offsetY };
    }

    function mouseUp() {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseleave", mouseUp);
      window.removeEventListener("mouseup", mouseUp);
    }

    function mouseMove(e: MouseEvent) {
      if (isChange) return;
      drawCircle(e);
      checkPercent();
    }

    function drawCircle(e: MouseEvent) {
      const nextPos = { x: e.offsetX, y: e.offsetY };
      if (!prevPos) prevPos = nextPos;
      const dist = getDistance(prevPos, nextPos);
      const angle = getAngle(prevPos, nextPos);
      for (let i = 0; i < dist; i++) {
        const x = prevPos.x + Math.cos(angle) * i;
        const y = prevPos.y + Math.sin(angle) * i;

        ctx!.globalCompositeOperation = "destination-out";
        ctx?.beginPath();
        ctx?.arc(x, y, 50, 0, Math.PI * 2);
        ctx?.fill();
        ctx?.closePath();
      }

      prevPos = nextPos;
    }

    const checkPercent = throttle(() => {
      const percent = getOpacityPercent(ctx!, canvasWidth, canvasHeight);

      if (percent > 50) {
        currentIamge = (currentIamge + 1) % images.length;
        drawImage();
      }
    }, 500);

    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("resize", reSize);
    reSize();

    return () => {
      window.removeEventListener("resize", reSize);
    };
  }, []);

  return (
    <Wrapper className="nudake">
      <canvas ref={canvasRef} />
    </Wrapper>
  );
}

export default Nudake2;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: pink;

  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  & > canvas {
    position: absolute;
  }
`;
