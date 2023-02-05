import styled from "styled-components";
import ParticleForm from "../components/Particle";

function Particle() {
  return (
    <Wrapper>
      <ParticleForm></ParticleForm>
    </Wrapper>
  );
}

export default Particle;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
