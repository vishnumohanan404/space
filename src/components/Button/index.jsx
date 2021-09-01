import React from "react";
import styled from "styled-components";

const ButtonClass = styled.button`
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  height: 30px;
  width: 70px;
  border-radius: 30px;
  border: none;
  box-shadow: 1px 1px 0px 2px rgba (0, 0, 0, 0.3);
  background: rgb(141, 217, 252);
  cursor: pointer;
  color: #626262;
`;

function Button(props) {
  return <ButtonClass>{props.content}</ButtonClass>;
}

export default Button;
