import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Heading from "../../components/Heading";
import Request from "../../layouts/Request";
import Post from "../../layouts/Post";
import WritePost from "../../layouts/WritePost";
import { DeviceSize } from "../../constants/responsive";
import Conversations from "../../layouts/Conversations";
import { connect, useDispatch, useSelector } from "react-redux";
import Chat from "../../layouts/Chat";
import { setOpenChat } from "../../redux/chat/chatActions";
import { Switch } from "@material-ui/core";
import { setActive } from "../../redux";
import { Nearby } from "../../layouts/Nearby";

function Home({ userData }) {
  // const isMobile = useMediaQuery({ maxWidth: DeviceSize.smallMobile });
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const posts = useSelector((state) => state.posts);
  const { openBubble } = useSelector((state) => state.conversations);
  const { openChat } = useSelector((state) => state.conversations);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setOpenChat(false));
    };
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleActive = () => {
    dispatch(setActive(!user.online));
  };

  return (
    <HomeContainer>
      {!isMobile && (
        <LeftSideBar>
          <Heading title={"Nearby"} color={"#626262"} />
          <Nearby/>
        </LeftSideBar>
      )}
      <MainContent>
        <WritePost margin={homeWriteStyle} />
        <Post postData={posts} />
        {openChat && (
          <ChatBubble active={openBubble}>
            <Chat />
          </ChatBubble>
        )}
      </MainContent>
      {!isMobile && (
        <RightSideBar>
          {!!userData.friendRequests.length && (
            <>
              <Heading title={"Requests"} color={"#626262"} />
              <Request userData={userData} />
            </>
          )}
          <Heading
            title={"Conversations"}
            color={"#626262"}
            href={"#"}
            button={
              <Switch
                checked={user.online}
                onChange={handleActive}
                inputProps={{ "aria-label": "controlled" }}
                color="primary"
              />
            }
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
  };
};

export default connect(mapStateToProps)(Home);

const ChatBubble = styled.div`
  height: 55px;
  overflow: hidden;
  min-width: 320px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  right: 405px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 1px solid #e4e4e4;
  ${({ active }) =>
    active &&
    `
    min-height:350px
    `}
`;

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
