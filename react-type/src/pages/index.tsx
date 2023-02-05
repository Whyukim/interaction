import { Link } from "react-router-dom";
import styled from "styled-components";

function Index() {
  return (
    <Wrapper>
      <Link to="/particle">particle</Link>
      <Link to="/fire">불꽃놀이</Link>
    </Wrapper>
  );
}

export default Index;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
