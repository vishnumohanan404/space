import React from "react";
import styled from "styled-components";
// import { CircularContainer } from '../../layouts/common'

const MenuItem = styled.a`
height: 50px;
display: flex;
align-items: center;
border-radius: 8px;
transition:background 330ms;
&:hover{
    background-color: #525357;
}

`;

const Dropdown = styled.div`
  position: absolute;
  top: 58px;
  width: 300px;
  transform: translateX(-45%);
  background-color: #bbb;
  border: 1px solid #b9b9b9;
  border-radius: 8px;
  padding: 1rem;
  overflow: hidden;
  transition: height 500ms ease;
`;

const CircularContainer = styled.span`
  width: 30px;
  height: 30px;
  background-color: #484a4d;
  border-radius: 50%;
  padding: 5px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;
  &:hover {
    filter: brightness(1.2);
  }
`;

function DropdownMenu() {
  function DropdownItem(props) {
    return (
      <MenuItem>
        <CircularContainer>
          {props.children}
        </CircularContainer>
      </MenuItem>
    );
  }
  return <Dropdown>
    <DropdownItem>My Profile</DropdownItem>
  </Dropdown>;
}

export default DropdownMenu;
