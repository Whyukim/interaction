import { FC } from "react";
import styled from "styled-components";
import useParticleViewModel from "../viewModel/particle";

const ParticleForm: FC = () => {
  const viewModel = useParticleViewModel();

  return (
    <>
      <Cavnas ref={viewModel.canvasRef}></Cavnas>
      <svg>
        <defs>
          <filter id="gooey">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="40"
              result="blur1"
            />
            <feColorMatrix
              in="blur1"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 100 -23"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default ParticleForm;

const Cavnas = styled.canvas`
  filter: url("#gooey");
`;
