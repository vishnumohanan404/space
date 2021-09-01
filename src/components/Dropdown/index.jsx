import React, { useState } from "react";
import styled from "styled-components";
import { IoCaretDownOutline } from "react-icons/io5";

const CircularContainer = styled.a`
  height: 36px;
  width: 36px;
  background-color: #bbb;
  border-radius: 50%;
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;

  &:hover {
    filter: brightness(1.2);
  }
`;
function Dropdown(props) {
  const [open, setOpen] = useState(false);
  return (
    <CircularContainer onClick={() => setOpen(!open)}>
      <IoCaretDownOutline />
      {open && props.children}
    </CircularContainer>
  );
}

export default Dropdown;
