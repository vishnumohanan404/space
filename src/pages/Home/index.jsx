import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Heading from "../../components/Heading";
import Request from "../../layouts/Request";
import Post from "../../layouts/Post";
import WritePost from "../../layouts/WritePost";
import { DeviceSize } from "../../components/responsive";
import Conversations from "../../layouts/Conversations";
import { connect } from "react-redux";



function Home({ userData,socket }) {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  console.log(socket,"socket")

  const handleSocket = ()=>{
    socket.io.emit("join_room")
  }

  console.log(userData, "userData");
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
          <Heading title={"Requests"} color={"#626262"} handle={handleSocket}/>
          <Request
            requests={
              userData.friendRequests[userData.friendRequests.length - 1]
            }
          />
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

const mapStateToProps = (state) => {
  return {
    userData: state.user.user,
    socket: state.socket
  };
};

export default connect(mapStateToProps)(Home);

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

// const SidebarDividion = styled.div`
//   display: flex;
//   flex-wrap: wrap;
// `;


// screen size
// const isTablet = useMediaQuery({ maxWidth: DeviceSize.tablet });
// const isLaptop = useMediaQuery({ maxWidth: DeviceSize.laptop });
// const isDesktop = useMediaQuery({ maxWidth: DeviceSize.desktop });
