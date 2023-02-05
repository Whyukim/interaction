import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

function BasicLayout() {
  return (
    <Wrapper>
      <main>
        <Outlet />
      </main>
    </Wrapper>
  );
}

export default BasicLayout;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  main {
    flex: 1;
    min-height: calc(100vh - 441px); 
  }
`;
