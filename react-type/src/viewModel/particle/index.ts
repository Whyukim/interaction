import { useRef, useEffect } from "react";
import randomNumBetween from "../../utils/randomNumBetween";

function useParticleViewModel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const innerWidth = useRef<number>(window.innerWidth);
  const innerHeight = useRef<number>(window.innerHeight);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");
    const dpr = window.devicePixelRatio;
    const canvasWidth = innerWidth.current;
    const canvasHeight = innerHeight.current;

    canvas!.style.width = canvasWidth + "px";
    canvas!.style.height = canvasHeight + "px";

    canvas!.width = canvasWidth * dpr;
    canvas!.height = canvasHeight * dpr;
    ctx!.scale(dpr, dpr);

    class Particle {
      x: number;
      y: number;
      radius: number;
      vy: number;
      acc: number;
      constructor(x: number, y: number, radius: number, vy: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vy = vy;
        this.acc = 1.05;
      }

      update() {
        if (!this.vy) return;
        this.vy *= this.acc;
        this.y += this.vy;
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fillStyle = "#9ee3ee";
        ctx!.fill();
        ctx!.closePath();
      }
    }

    const particles: any[] = [];
    const TOTAL = 10;

    for (let i = 0; i < TOTAL; i++) {
      const x = randomNumBetween(0, canvasWidth);
      const y = randomNumBetween(0, canvasHeight);
      const radius = randomNumBetween(50, 100);
      const vy = randomNumBetween(1, 10);
      const particle = new Particle(x, y, radius, vy);
      particles.push(particle);
    }

    let interval = 1000 / 60;
    let now, delta;
    let then = Date.now();

    function animate() {
      window.requestAnimationFrame(animate);
      now = Date.now();
      delta = now - then;

      if (delta < interval) return;

      if (!ctx) return;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();

        if (particle.y - particle.radius > canvasHeight) {
          particle.y = -particle.radius;
          particle.x = randomNumBetween(0, canvasWidth);
          particle.radius = randomNumBetween(50, 100);
          particle.vy = randomNumBetween(1, 10);
        }
      });

      then = now - (delta % interval);
    }

    animate();
  }, [canvasRef]);

  return { canvasRef };
}

export default useParticleViewModel;
