import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Request from "../../layouts/Request";
import Post from "../../layouts/Post";
import WritePost from "../../layouts/WritePost";
import { DeviceSize } from "../../constants/responsive";
import Conversations from "../../layouts/Conversations";
import { useDispatch } from "react-redux";
import { setOpenChat } from "../../redux/chat/chatActions";
import { Nearby } from "../../layouts/Nearby";

function Home() {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  console.log("home rendered");

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setOpenChat(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HomeContainer>
      {!isMobile && (
        <LeftSideBar>
          <Nearby />
        </LeftSideBar>
      )}
      <MainContent>
        <WritePost margin={homeWriteStyle} />
        <Post />
      </MainContent>
      {!isMobile && (
        <RightSideBar>
          <Request />
          <Conversations />
        </RightSideBar>
      )}
    </HomeContainer>
  );
}


export default Home;

const homeWriteStyle = { marginTop: "1.5%" };

const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  background-color: #ddf3fa;
  justify-content: space-around;
  /* overflow-y: auto; */
  /* height: inherit; */
  /* height: 100%; */
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex-basis: 47%;
  padding: 75px 0;
  @media only screen and (min-width: 400px) {
    flex-basis: 98%;
    overflow: hidden;
  }
  @media only screen and (min-width: 768px) {
    flex-basis: 47%;

  }
  @media only screen and (min-width: 992px) {
    flex-basis: 47%;
  }
`;

const LeftSideBar = styled.div`
  flex-basis: 25%;
  position: sticky;
  top: 85px;
  align-self: flex-start;
  background: #fff;
  border-radius: 6px;
  padding: 20px;
`;

const RightSideBar = styled.div`
  flex-basis: 25%;
  position: sticky;
  top: 85px;
  align-self: flex-start;
  background: #fff;
  padding: 20px;
  border-radius: 6px;
`;

// const SidebarDividion = styled.div`
//   display: flex;
//   flex-wrap: wrap;
// `;

// screen size
// const isTablet = useMediaQuery({ maxWidth: DeviceSize.tablet });
// const isLaptop = useMediaQuery({ maxWidth: DeviceSize.laptop });
// const isDesktop = useMediaQuery({ maxWidth: DeviceSize.desktop });
