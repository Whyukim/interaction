import styled from "styled-components";
import Nudake2 from "./components/Nudake2";
import MorphSvg from "./components/MorphSvg";
import Matter from "./components/Matter";

function App() {
  return (
    <div>
      <Section>
        {/* <Nudake2 /> */}
        <Matter />
      </Section>
    </div>
  );
}

export default App;

const Section = styled.section`
  height: 100vh;
`;
