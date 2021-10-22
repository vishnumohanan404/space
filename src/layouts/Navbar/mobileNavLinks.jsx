import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Notifications from "../../components/Notifications";
import { logOut } from "../../redux";
// import { Accessibility } from "./accessibility";
import { MenuToggle } from "./menuToggle";

export function MobileNavLinks(props) {
  const [isOpen, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  return (
    <NavLinksContainer>
      <Notifications/>
      <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
      {isOpen && (
        <LinksWrapper>
          <LinkItem>
            <Link style={LinkStyle} to={`/profile/${user._id}`}>Profile</Link>
          </LinkItem>
          <LinkItem>
            <Link style={LinkStyle} to="/">Home</Link>
          </LinkItem>
          <LinkItem>
            <Link style={LinkStyle} to={'conversations'}>Chat</Link>
          </LinkItem>
          <LinkItem>
            <Link style={LinkStyle}  to={"/"}>Settings</Link>
          </LinkItem>
          <LinkItem>
            <span style={LinkStyle} onClick={()=>dispatch(logOut())}>Logout</span>
          </LinkItem>
          <Marginer />
          {/* <Accessibility /> */}
        </LinksWrapper>
      )}
    </NavLinksContainer>
  );
}

// sc
const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const LinksWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  height: 100%;
  list-style: none;
  background-color: #fff;
  width: 100%;
  flex-direction: column;
  position: fixed;
  top: 75px;
  left: 0;
  display: flex;
  justify-content: center;
  align-self: center;
`;

const LinkItem = styled.li`
  width: 100%;
  padding: 0 1.1em;
  color: #222;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  &:focus{
    background-color: #ddf3fa;
    opacity:0;
    z-index:30;
    position:fixed;
    margin-left:249px; 
    margin-top:-5px; 
    border:1px solid #000; 
    width:230px; 
    height:299px;
        -webkit-transition: opacity 0.5s ease-in-out;
    -moz-transition: opacity 0.5s ease-in-out;
    -ms-transition: opacity 0.5s ease-in-out;
    -o-transition: opacity 0.5s ease-in-out;
    transition: opacity 0.5s ease-in-out;
  }
`;

const LinkStyle = {textDecoration: "none",
  color: "inherit",
  fontSize: "26px"}

const Marginer = styled.div`
  height: 2em;
`;
