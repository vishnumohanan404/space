import React, { useEffect, useState } from "react";
import {
  IoChatbubble,
  IoEllipsisHorizontal,
  IoPersonAddOutline,
  IoPencil,
} from "react-icons/io5";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { friendRequest } from "../../redux/user/UserAction";
import ClipLoader from "react-spinners/ClipLoader";

function ProfileDetails({
  user,
  currentUser,
  friendRequest,
  request,
  profiles,
}) {
  const [friends, setFriends] = useState(false);

  useEffect(() => {
    if (currentUser.user.friends.includes(user._id)) {
      setFriends(true);
    }
  }, []);
  const handleRequest = (id) => {
    friendRequest(id);
  };

  return (
    <>
      <div className="pd-left">
        <ProfileDetailsRow>
          <ProfileImage src={user.avatar}></ProfileImage>
          <div>
            <h3>{user.fullName}</h3>
            {user.friends && <p>{user.friends?.length} friends</p>}
            {user.friends &&
              user.friends.map((friend) => {
                return (
                  <Link to={`/profile/${friend._id}`} key={friend._id}>
                    <img src={friend.avatar} alt=""></img>
                  </Link>
                );
              })}
          </div>
        </ProfileDetailsRow>
      </div>
      <ProfileDetailsRight>
        {user._id === currentUser.user._id ? (
          <>
            <button type="submit">
              <IoPencil style={buttonStyle} />
              Edit Profile
            </button>
          </>
        ) : (
          <>
            {friends ? (
              <button type="button">
                <IoPersonAddOutline style={buttonStyle} />
                Unfriend
              </button>
            ) : profiles.friendRequestLoading ? (
              <button
                type="button"
                style={{ paddingTop: "5px", paddingBottom: "8.5px" }}
              >
                <LoadingWrapper2>
                  <ClipLoader loading size={18.49} />
                </LoadingWrapper2>
              </button>
            ) : request ? (
              <button type="submit" onClick={() => handleRequest(user._id)}>
                <IoPersonAddOutline style={buttonStyle} />
                Cancel Request
              </button>
            ) : (
              <button type="submit" onClick={() => handleRequest(user._id)}>
                <IoPersonAddOutline style={buttonStyle} />
                Sent Request
              </button>
            )}
            <button type="button">
              <IoChatbubble style={buttonStyle} /> Message
            </button>
          </>
        )}
        <br />
        <a href="#dummy">
          <IoEllipsisHorizontal style={{ width: "20px" }} />
        </a>
      </ProfileDetailsRight>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    friendRequest: (id) => {
      dispatch(friendRequest(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(ProfileDetails);

const ProfileDetailsRow = styled.div`
  display: flex;
  align-items: flex-start;
  div h3 {
    font-size: 25px;
    font-weight: 600;
    margin: 0;
  }
  div p {
    font-size: 13px;
    padding: 0;
    margin: 0;
  }
  div img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-top: 12px;
    object-fit: cover;
    margin-right: 5px;
  }
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 6px;
`;

const buttonStyle = { height: "15px", marginRight: "10px" };

const ProfileDetailsRight = styled.div`
  text-align: right;
  button {
    background: #1876f2;
    border: 0;
    outline: 0;
    padding: 6px 10px;
    display: inline-flex;
    align-items: center;
    color: #fff;
    border-radius: 3px;
    margin-left: 10px;
    cursor: pointer;
    font-family: inherit;
    font-weight: 400;
  }
  button img {
    height: 15px;
    margin-right: 10px;
  }
  button:first-child {
    background: #e4e6eb;
    color: black;
  }
  a {
    background: #e4e6eb;
    border-radius: 3px;
    padding: 12px;
    display: inline-flex;
    margin-top: 30px;
  }
  a img {
    width: 20px;
  }
`;

const LoadingWrapper2 = styled.div`
  width: 130px;
  height: 100%;
  display: flex;
  justify-content: center;
`;
