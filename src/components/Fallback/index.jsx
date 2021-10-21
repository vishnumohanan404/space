import React from "react";
import { MoonLoader } from "react-spinners";
import styled from "styled-components";

const FallbackUI = () => {
  return (
    <Container>
      <MoonLoader />
    </Container>
  );
};

export default FallbackUI;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddf3fa;
`;
