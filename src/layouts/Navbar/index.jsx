import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Logo from "../../components/Logo";
import { DeviceSize } from "../../components/responsive";
import SearchBar from "../../components/SearchBar";
import { Accessibility } from "./accessibility";
import { MobileNavLinks } from "./mobileNavLinks";
import { NavLinks } from "./NavLinks";

const NavBarContainer = styled.nav`
  width: 100%;
  height: 60px;
  box-shadow: 0 1px 3px rgba(15, 15, 15, 0.13);
  display: flex;
  align-items: center;
  padding: 0 1.5em;
  position: fixed;
  top: 0;
  z-index: 100;
  background: #fff;
  justify-content: space-between;
`;

const LeftSection = styled.div`
  display: flex;
`;

const MiddleSection = styled.div`
  display: flex;
  flex: 2;
  height: 100%;
  justify-content: center;
`;

const RightSection = styled.div`
  display: flex;
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export function Navbar(props) {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  return (
    <NavBarContainer>
      <LeftSection>
        <Logo />
      </LeftSection>
      <MiddleSection>
        {/* {!isMobile && <NavLinks />} */}
        {!isMobile && <SearchContainer>
          <SearchBar />
        </SearchContainer>}
      </MiddleSection>
      <RightSection>
        {!isMobile && <Accessibility />}
        {isMobile && <MobileNavLinks />}
      </RightSection>
    </NavBarContainer>
  );
}
