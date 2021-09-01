import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Heading from "../../components/Heading";
import Request from "../../layouts/Request";
// import { PostContextProvider } from "../../context/PostContext/PostContext";
import Post from "../../layouts/Post";
import WritePost from "../../layouts/WritePost";
import { DeviceSize } from "../../components/responsive";
import Conversations from "../../layouts/Conversations";

const HomeContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: #ddf3fa;
  justify-content: space-around;
`;

const MainContent = styled.div`
  flex-basis: 47%;
  padding: 65px 0;
`;

const LeftSideBar = styled.div`
  flex-basis: 25%;
  position: sticky;
  top: 75px;
  align-self: flex-start;
  background: #fff;
  border-radius: 6px;
  padding: 20px;
`;

const RightSideBar = styled.div`
  flex-basis: 25%;
  position: sticky;
  top: 75px;
  align-self: flex-start;
  background: #fff;
  padding: 20px;
  border-radius: 6px;
`;

const SidebarDividion = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function Home() {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const isTablet = useMediaQuery({ maxWidth: DeviceSize.tablet });
  const isLaptop = useMediaQuery({ maxWidth: DeviceSize.laptop });
  const isDesktop = useMediaQuery({ maxWidth: DeviceSize.desktop });

  return (
    <HomeContainer>
      {!isMobile && (
        <LeftSideBar>
          <Heading title={"Nearby"} color={"#626262"} />
        </LeftSideBar>
      )}
      <MainContent>
          <WritePost />
          <Post />
      </MainContent>
      {!isMobile && (
        <RightSideBar>
          <Heading title={"Requests"} color={"#626262"} />
          <Request />
          <Heading
            title={"Conversations"}
            color={"#626262"}
            href={"#"}
            hrefContent={"Active"}
          />
          <Conversations />
        </RightSideBar>
      )}
    </HomeContainer>
  );
}

export default Home;
