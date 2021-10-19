import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo.png";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.div`
  width: 38px;
  height: 38px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const LogoText = styled.h2`
  font-size: 22px;
  margin: 0;
  margin-left: 4px;
  font-weight: 800;
  color: #E84C64;
  font-family: "Nunito", sans-serif;
  /* background: linear-gradient(
    90deg,
    rgba(225, 43, 107, 1) 0%,
    rgba(253, 159, 41, 1) 50%,
    rgba(248, 29, 89, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
`;

export default function Logo(props) {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <LogoWrapper>
        <LogoImg>
          <img src={logo} alt="space" />
        </LogoImg>
        <LogoText>SPACE</LogoText>
      </LogoWrapper>
    </Link>
  );
}
