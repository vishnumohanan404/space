import React, { useEffect } from "react";
import styled from "styled-components";
import Post from "../../layouts/Post";
import WritePost from "../../layouts/WritePost";
import ProfileInfo from "../../layouts/ProfileInfo";
import ProfileDetails from "../../layouts/ProfileDetails";
import { useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../redux/user/UserAction";
import Tabs from "../../layouts/Tabs";
import Friends from "../../components/Friends";
import About from "../../components/About";
import Photos from "../../components/Photos";
import Settings from "../../layouts/Settings";
import Chat from "../../layouts/Chat";
import { getUserChatFriends, setOpenChat } from "../../redux/chat/chatActions";
import CustomizedDialogs from "../../components/Dialog";
import EditForm from "../../layouts/EditForm";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../constants/responsive";
import Skeleton from "react-loading-skeleton";

function Profile({
  profile,
  userProfile = profile.userProfile,
  isLoading = profile.isLoading,
  getProfileData,
  currentUser,
}) {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

  const { id } = useParams();
  const socket = useSelector((state) => state.socket);
  const profileData = useSelector(
    (state) => !state.profile.updateLoading && state.profile
  );
  const { tab } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { openChat, openBubble } = useSelector((state) => state.conversations);

  if (userProfile) userProfile.posts = userProfile.userPosts;
  useEffect(() => {
    getProfileData(id, currentUser.user._id);
    return () => {
      dispatch(setOpenChat(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    dispatch(getUserChatFriends());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    if (socket)
      socket.on("REJECT_REQUEST_TO_CLIENT", (updatedProfile) => {
        console.log(`REJECT_REQUEST_TO_CLIENT`, updatedProfile);
        dispatch(updateProfile(updatedProfile));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // console.log(`profileData`, profileData)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ProfileContainer>
      <div>
        {/* { true ?
            <Cover>
              <CoverImg src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"></CoverImg>
              <Overlay>
                <IoPencil />
              </Overlay>
            </Cover> : <Cover>

              Add a Cover picture
            </Cover>
          } */}
        {!isLoading ? (
          <ProfileDetailsContainer>
            <ProfileDetails
              user={userProfile}
              // currentUser={currentUser}
              // id={id}
              profiles={profile}
              request={profile.request}
              open={open}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
            />
          </ProfileDetailsContainer>
        ) : (
          <ProfileDetailsContainerLoading>
            <Skeleton count={4} />
          </ProfileDetailsContainerLoading>
        )}
        {!isLoading ? (
          <Tabs />
        ) : (
          <TabsContainer>
            <Skeleton count={1} />
          </TabsContainer>
        )}
        <ProfileInfoContainer>
          {!isMobile &&
            (!isLoading ? (
              <ProfileInfo
                user={userProfile}
                handleClickOpen={handleClickOpen}
              />
            ) : (
              <InfoCol>
                <ProfileIntro>
                  <Skeleton count={10} />
                </ProfileIntro>
                <ProfileIntro>
                  <Skeleton count={10} />
                </ProfileIntro>
              </InfoCol>
            ))}
          {tab === 0 &&
            (!isLoading ? (
              <PostCol>
                {/* <PostContainer> */}
                {userProfile._id === currentUser.user._id && <WritePost />}
                {profileData.posts && (
                  <Post user={userProfile} postData={profileData} />
                )}
                {/* </PostContainer> */}
              </PostCol>
            ) : (
              <PostColLoading>
                <PostContainer>
                  <Skeleton count={8} />
                </PostContainer>
                <PostContainer>
                  <Skeleton count={8} />
                </PostContainer>
                <PostContainer>
                  <Skeleton count={8} />
                </PostContainer>
              </PostColLoading>
            ))}
          {tab === 1 && (
            <PostCol>
              <About
                handleClose={handleClose}
                handleClickOpen={handleClickOpen}
                open={open}
              />
            </PostCol>
          )}
          {tab === 2 && (
            <PostCol>
              <Friends />
            </PostCol>
          )}
          {tab === 3 && (
            <PostCol>
              <Photos />
            </PostCol>
          )}
          {tab === 4 && (
            <PostCol>
              <Settings />
            </PostCol>
          )}
        </ProfileInfoContainer>
        {openChat && (
          <ChatBubble active={openBubble}>
            <Chat />
          </ChatBubble>
        )}
      </div>
      <CustomizedDialogs open={open} title={"Edit"} handleClose={handleClose}>
        <EditForm
          handleClose={handleClose}
          title={"Edit Title"}
          // content={}
        />
      </CustomizedDialogs>
    </ProfileContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    currentUser: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfileData: (id, user) => dispatch(getProfile(id, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const TabsContainer = styled.div`
  background-color: #fff;
  /* padding: 15px 5px; */
  border-radius: 0 0 6px 6px;
  position: absolute;
  left: 39.5%;
  width: 45.5%;
  top: 32%;
  height: 50px;
  display: flex;
  align-items: center;
  margin-top: 0;
  list-style: none;
  padding: 0;
  @media only screen and (min-width: 400px) {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 13px;
  }
  @media only screen and (min-width: 768px) {
    position: absolute;
    left: 39.5%;
    width: 45.5%;
    top: 32%;
    font-size: 16px;
  }
  @media only screen and (min-width: 992px) {
    position: absolute;
    left: 39.5%;
    width: 45.5%;
    top: 32%;
    font-size: 16px;
  }
`;
const InfoCol = styled.div`
  flex-basis: 33%;
`;

const ProfileIntro = styled.div`
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  h3 {
    font-weight: 600;
    margin: 0;
  }
  hr {
    border: 0;
    height: 1px;
    background: #ccc;
    margin: 24px 0;
  }
  ul li {
    list-style: none;
    font-size: 15px;
    margin: 15px 0;
    display: flex;
    align-items: center;
  }
  ul {
    padding: 0;
  }
`;

const ProfileDetailsContainerLoading = styled.div`
  min-height: 140px;
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  /* flex-direction: column; */
`;

const PostContainer = styled.div`
  margin-top: 60px;
  width: 100%;
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  padding-top: 10px;
  color: #626262;
  margin: 20px 0;
  object-fit: contain;
`;

const ChatBubble = styled.div`
  height: 55px;
  overflow: hidden;
  min-width: 320px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  right: 15px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 1px solid #e4e4e4;
  ${({ active }) =>
    active &&
    `
    min-height:350px
    `}
`;

const ProfileContainer = styled.div`
  width: 100%;
  background-color: #ddf3fa;
  /* overflow-y: auto; */
  /* height: inherit; */
  /* height: 100%; */
  min-height: 100vh;
  padding: 90px 15%;
  /* overflow-y: auto !important;  */
  /* position: relative; */
  @media only screen and (min-width: 400px) {
    /* flex-basis: 98%; */
    overflow: hidden;
    padding: 90px 10px;
  }
  @media only screen and (min-width: 768px) {
    padding: 90px 15%;
  }
  @media only screen and (min-width: 992px) {
    padding: 90px 15%;
  }
`;

const ProfileDetailsContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  display: flex;
  align-items: flex-start;
  /* flex-direction: column; */
  justify-content: space-between;
  /* flex-direction: column; */
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  align-self: flex-start;
  justify-content: space-between;
  margin-top: 20px;
  @media only screen and (min-width: 400px) {
    margin: 0;
  }
  @media only screen and (min-width: 768px) {
    margin-top: 20px;
  }
  @media only screen and (min-width: 992px) {
    margin-top: 20px;
  }
`;

const PostCol = styled.div`
  margin-top: 50px;
  flex-basis: 65%;
  @media only screen and (min-width: 400px) {
    margin-top: 20px;
    flex-basis: 100%;
  }
  @media only screen and (min-width: 768px) {
    margin-top: 50px;
    flex-basis: 65%;
  }
  @media only screen and (min-width: 992px) {
    margin-top: 50px;
    flex-basis: 65%;
  }
`;
const PostColLoading = styled.div`
  margin-top: 40px;
  flex-basis: 65%;
  @media only screen and (min-width: 400px) {
    flex-basis: 100%;
    margin-top: 20px;
  }
  @media only screen and (min-width: 768px) {
    flex-basis: 65%;
    margin-top: 40px;
  }
  @media only screen and (min-width: 992px) {
    flex-basis: 65%;
    margin-top: 40px;
  }
`;
