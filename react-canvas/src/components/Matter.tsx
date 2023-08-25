import { useEffect, useRef } from "react";
import {
  Bodies,
  Composite,
  Engine,
  Events,
  IChamferableBodyDefinition,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
} from "matter-js";

import image1 from "../assets/images/image1.jpg";
import styled from "styled-components";

interface MatterProps {}

function Matter({}: MatterProps) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const cw = window.innerWidth;
    const ch = window.innerHeight;

    const gravitryPower = 0.5;
    let gravityDeg = 0;
    let observer: IntersectionObserver;

    let engine: Engine,
      render: Render,
      runner: Runner,
      mouse: Mouse,
      mouseConstraint: MouseConstraint;

    initScene();
    initMouse();
    initIntersectionObserver();
    initGound();
    initImageBoxes();

    Events.on(mouseConstraint!, "mousedown", () => {
      console.log(mouseConstraint.body);
    });

    Events.on(runner!, "tick", () => {
      gravityDeg += 1;
      // engine.world.gravity.x =
      //   gravitryPower * Math.cos((Math.PI / 180) * gravityDeg);
      // engine.world.gravity.y =
      //   gravitryPower * Math.sin((Math.PI / 180) * gravityDeg);

      engine.world.bodies.forEach((body) => {
        if (body.position.y > ch || body.position.y < 0)
          Composite.remove(engine.world, body);
        if (body.position.x > cw || body.position.x < 0)
          Composite.remove(engine.world, body);
      });

      console.log(engine.world.bodies.length);
    });

    canvas.addEventListener("mousewheel", () => {
      addRect(mouse.position.x, mouse.position.y, 50, 50);
    });

    function initScene() {
      engine = Engine.create({
        enableSleeping: true,
      });
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

    function initIntersectionObserver() {
      const options = {
        threshold: 0.1,
      };
      observer = new IntersectionObserver((entries) => {
        const canvasEntry = entries[0];
        if (canvasEntry.isIntersecting) {
          runner.enabled = true;
          Render.run(render);
        } else {
          runner.enabled = false;
          Render.stop(render);
        }
      }, options);

      observer.observe(canvas);
    }

    function initGound() {
      const segments = 8;
      const deg = (Math.PI * 2) / segments;
      const radius = cw / 5;
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
      const xScale = 0.7;
      const yScale = 0.7;
      addRect(cw / 2, ch / 2, 300 * xScale, 400 * yScale, {
        label: "hello",
        render: { sprite: { texture: image1, yScale: xScale, xScale: yScale } },
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

    return () => {
      observer.unobserve(canvas);

      Composite.clear(engine.world, true);
      Mouse.clearSourceEvents(mouse);
      Runner.stop(runner);
      Render.stop(render);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div>
      <Hello></Hello>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Matter;
const Hello = styled.div`
  background-color: pink;
  height: 200vh;
`;
