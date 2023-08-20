import { useEffect, useRef } from "react";
import {
  Bodies,
  Composite,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
} from "matter-js";

interface MatterProps {}

function Matter({}: MatterProps) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const cw = window.innerWidth;
    const ch = window.innerHeight;

    let engine: Engine, render, runner, mouse: Mouse, mouseConstraint;

    initScene();
    initMouse();
    initGound();

    canvas.addEventListener("mousewheel", createBox);

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
      const ground = Bodies.rectangle(cw / 2, ch, cw, 50, { isStatic: true });
      Composite.add(engine.world, ground);
    }

    function createBox() {
      const box = Bodies.rectangle(mouse.position.x, mouse.position.y, 50, 50);
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
