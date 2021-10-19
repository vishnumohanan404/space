import React, { useEffect } from "react";
import styled from "styled-components";
import Post from "../../layouts/Post";
import WritePost from "../../layouts/WritePost";
import ProfileInfo from "../../layouts/ProfileInfo";
import ProfileDetails from "../../layouts/ProfileDetails";
import { useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../redux/user/UserAction";
import { MoonLoader } from "react-spinners";
import Tabs from "../../layouts/Tabs";
import Friends from "../../components/Friends";
import About from "../../components/About";
import Photos from "../../components/Photos";
import Settings from "../../layouts/Settings";
import Chat from "../../layouts/Chat";
import { getUserChatFriends, setOpenChat } from "../../redux/chat/chatActions";
import CustomizedDialogs from "../../components/Dialog";
import EditForm from "../../layouts/EditForm";

function Profile({
  profile,
  userProfile = profile.userProfile,
  isLoading = profile.isLoading,
  getProfileData,
  currentUser,
}) {
  const { id } = useParams();
  const socket = useSelector((state) => state.socket);
  const profileData = useSelector((state) => (!state.profile.updateLoading && state.profile));
  const { tab } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { openChat, openBubble } = useSelector((state) => state.conversations);

  if (userProfile) userProfile.posts = userProfile.userPosts;
  useEffect(() => {
    getProfileData(id, currentUser.user._id);
    return () => {
      dispatch(setOpenChat(false));
    };
  }, [id]);
  useEffect(() => {
    dispatch(getUserChatFriends());
  }, [id]);
  useEffect(() => {
    if (socket)
      socket.on("REJECT_REQUEST_TO_CLIENT", (updatedProfile) => {
        console.log(`REJECT_REQUEST_TO_CLIENT`, updatedProfile);
        dispatch(updateProfile(updatedProfile));
      });
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
      {!isLoading ? (
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
          <Tabs />
          <ProfileInfoContainer>
            <ProfileInfo user={userProfile} handleClickOpen={handleClickOpen} />
            {tab === 0 && (
              <PostCol>
                {/* <PostContainer> */}
                {userProfile._id === currentUser.user._id && <WritePost />}
                {profileData.posts && (
                  <Post user={userProfile} postData={profileData} />
                )}
                {/* </PostContainer> */}
              </PostCol>
            )}
            {tab === 1 && (
              <PostCol>
                <About handleClose={handleClose} handleClickOpen={handleClickOpen} open={open}/>
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
      ) : (
        <LoadingWrapper>
          <MoonLoader size={50} />
        </LoadingWrapper>
      )}
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

const PostContainer = styled.div`
  width: 100%;
  /* background: #fff; */
  border-radius: 6px;
  /* padding: 20px; */
  /* padding-top: 10px; */
  /* margin-top: 1.5%; */
  color: #626262;
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
`;

const CoverImg = styled.img`
  width: 100%;
  border-radius: 6px;
  margin-bottom: 14px;
  height: 300px;
  object-fit: cover;
  transition: background 0.5s ease;
`;
const Cover = styled.div`
  right: 0;
  top: 0;
  &:hover div {
    display: block;
  }
`;

const Overlay = styled.div`
  padding-top: 7px;
  padding-right: 7px;
  position: absolute;
  right: 0;
  top: 0;
  display: none;
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
`;

const PostCol = styled.div`
  margin-top: 50px;
  flex-basis: 65%;
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10%;
`;
