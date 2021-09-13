import React, { useEffect } from "react";
import styled from "styled-components";
import Post from "../../layouts/Post";
import WritePost from "../../layouts/WritePost";
import ProfileInfo from "../../layouts/ProfileInfo";
import ProfileDetails from "../../layouts/ProfileDetails";
import { useParams } from "react-router-dom";
import { IoPencil } from "react-icons/io5";
import { connect } from "react-redux";
import { getProfile } from "../../redux/user/UserAction";

function Profile({
  profiles,
  userProfiles = profiles.userProfile,
  getProfileData,
  currentUser,
}) {
  const { id } = useParams();
  useEffect(() => {
    getProfileData(id, currentUser.user._id);
  }, [id]);
  console.log(`userProfiles._id === currentUser._id`, userProfiles._id , currentUser._id)
  return (
    <ProfileContainer>
      {
        <>
          <Cover>
            <CoverImg src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"></CoverImg>
            <Overlay>
              <IoPencil />
            </Overlay>
          </Cover>
        </>
      }
      <ProfileDetailsContainer>
        <ProfileDetails
          user={userProfiles}
          currentUser={currentUser}
          id={id}
          profiles={profiles}
          request={profiles.request}
        />
      </ProfileDetailsContainer>
      <ProfileInfoContainer>
        <ProfileInfo user={userProfiles} />
        <PostCol>
          {userProfiles._id === currentUser.user._id && <WritePost />}
          <Post user={userProfiles} />
        </PostCol>
      </ProfileInfoContainer>
    </ProfileContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    profiles: state.profile,
    currentUser: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfileData: (id, user) => dispatch(getProfile(id, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const ProfileContainer = styled.div`
  width: 100%;
  background-color: #ddf3fa;
  /* overflow-y: auto; */
  /* height: inherit; */
  /* height: 100%; */
  min-height: 100vh;
  padding: 65px 15%;
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
  justify-content: space-between;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  align-self: flex-start;
  justify-content: space-between;
  margin-top: 20px;
`;

const PostCol = styled.div`
  flex-basis: 65%;
`;
