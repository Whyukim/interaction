import { useEffect, useRef } from "react";
import {
  Bodies,
  Composite,
  Engine,
  IChamferableBodyDefinition,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
} from "matter-js";

import image1 from "../assets/images/image1.jpg";

interface MatterProps {}

function Matter({}: MatterProps) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const cw = window.innerWidth;
    const ch = window.innerHeight;

    let engine: Engine, render: Render, runner, mouse: Mouse, mouseConstraint;

    initScene();
    initMouse();
    initGound();
    initImageBoxes();

    canvas.addEventListener("mousewheel", () => {
      addRect(mouse.position.x, mouse.position.y, 50, 50);
    });

    function initScene() {
      engine = Engine.create();
      render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
          width: cw,
          height: ch,
          wireframes: false,
          background: "skyblue",
        },
      });
      runner = Runner.create();

      Render.run(render);
      Runner.run(runner, engine);
    }

    function initMouse() {
      mouse = Mouse.create(canvas);
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
      });
      Composite.add(engine.world, mouseConstraint);
    }

    function initGound() {
      const segments = 16;
      const deg = (Math.PI * 2) / segments;
      const radius = cw / 3;
      const height = Math.tan(deg / 2) * radius * 2;

      for (let i = 0; i < segments; i++) {
        const theta = deg * i;
        const x = Math.cos(theta) * radius + cw / 2;
        const y = Math.sin(theta) * radius + ch / 2;

        addRect(x, y, 50, height, {
          isStatic: true,
          angle: theta,
          render: {
            lineWidth: 15,
            fillStyle: "red",
            strokeStyle: "blue",
          },
        });
      }
    }

    function initImageBoxes() {
      addRect(cw / 2, ch / 2, 300, 400, {
        render: { sprite: { texture: image1, yScale: 0.7, xScale: 0.7 } },
      });
    }

    function addRect(
      x: number,
      y: number,
      w: number,
      h: number,
      options: IChamferableBodyDefinition = {}
    ) {
      const box = Bodies.rectangle(x, y, w, h, options);
      Composite.add(engine.world, box);
    }
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Matter;
