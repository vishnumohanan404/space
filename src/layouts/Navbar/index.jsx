// import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Logo from "../../components/Logo";
import { DeviceSize } from "../../constants/responsive";
import SearchBar from "../../components/SearchBar";
import Accessibility from "./accessibility";
import { MobileNavLinks } from "./mobileNavLinks";
// import { useDispatch } from "react-redux";
// import { authVerify } from "../../redux";
// import { NavLinks } from "./NavLinks";

export function Navbar(props) {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  return (
    <Container>
      <NavBarContainer>
        {!isMobile ? (
          <LeftSection>
            <Logo />
          </LeftSection>
        ) : (
          <Logo />
        )}
        <RightSection>
          {!isMobile && <Accessibility />}
          {isMobile && (
            <>
              {/* <AccessibilityContainer>
            <Notifications />
          </AccessibilityContainer> */}
              <MobileNavLinks />
            </>
          )}
        </RightSection>
      </NavBarContainer>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  /* display: flex; */
  position: fixed;
  top: 0;
  z-index: 1000;
  /* height: 30px; */
`;

const NavBarContainer = styled.nav`
  width: 100%;
  height: 60px;
  box-shadow: 0 1px 3px rgba(15, 15, 15, 0.13);
  display: flex;
  align-items: center;
  padding: 0 1.5em;
  position: fixed;
  /* top: 30; */
  z-index: 100;
  /* background: #fff; */
  justify-content: space-between;
  @media only screen and (min-width: 400px) {
    padding: 0 0.5em;
  }
  @media only screen and (min-width: 768px) {
    padding: 0 1.5em;
  }
  @media only screen and (min-width: 992px) {
    padding: 0 1.5em;
  }
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
