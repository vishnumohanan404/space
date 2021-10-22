import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Logo from "../../components/Logo";
import { DeviceSize } from "../../constants/responsive";
import SearchBar from "../../components/SearchBar";
import Accessibility from "./accessibility";
import { MobileNavLinks } from "./mobileNavLinks";
import Notifications from "../../components/Notifications";
// import { NavLinks } from "./NavLinks";

export function Navbar(props) {
  console.log("Initial render of navbar");
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  return (
    <Container>
      <AnnouncementBar>
        <span>
          📢 This <a href="https://github.com/KingKong26/space">project</a> is
          still under development so, some features might be broke
        </span>
      </AnnouncementBar>
      <NavBarContainer>
        <LeftSection>
          <Logo />
        </LeftSection>
        <MiddleSection>
          {/* {!isMobile && <NavLinks />} */}
          <SearchContainer>
            <SearchBar />
          </SearchContainer>
        </MiddleSection>
        <RightSection>
          {!isMobile && <Accessibility />}
          {isMobile &&<>
          {/* <AccessibilityContainer>
            <Notifications />
          </AccessibilityContainer> */}
          <MobileNavLinks />
          </>
          }
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
  background: #fff;
  justify-content: space-between;
  @media only screen and (min-width: 768px) {
    padding: 0;
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
const AnnouncementBar = styled.div`
  padding: 0;
  margin: 0;
  width: 100%;
  height: 16px;
  /* background-color: #e84c64; */
  display: flex;
  justify-content: center;
  background: rgb(232, 76, 100);
  background: linear-gradient(
    90deg,
    rgba(232, 76, 100, 1) 0%,
    rgba(253, 159, 41, 1) 50%,
    rgba(248, 29, 89, 1) 100%
  );
  span {
    padding: 0;
    margin: 0;
    color: blue;
    font-size: 12px;
    font-weight: 600;
    a {
      color: #ffffff;
    }
  }
`;
