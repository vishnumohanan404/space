import React, { useEffect, useState } from "react";
import {
  IoChatbubble,
  IoPersonAddOutline,
  IoPencil,
  IoCamera,
} from "react-icons/io5";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { friendRequest } from "../../redux/user/UserAction";
import { unfriend } from "../../redux";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "../Modal";
import { useClickOutside } from "react-click-outside-hook";
import { useRef } from "react";
import Crop from "../../components/Cropper";
import {
  getUserChatFriends,
  setConvo,
  setOpenChat,
} from "../../redux/chat/chatActions";
import CustomizedDialogs from "../../components/Dialog";

function ProfileDetails({ friendRequest, profiles, handleClickOpen, ...rest }) {
  const [friends, setFriends] = useState(false);
  const socket = useSelector((state) => state.socket);
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.userProfile);
  const { request } = useSelector((state) => state.profile);
  const [toggle, setToggle] = useState(false);
  const [modal, setModal] = useState();
  const fileInput = useRef();
  const [inputImg, setInputImg] = useState("");

  // friend request func
  useEffect(() => {
    if (currentUser.user.friends.includes(user._id)) {
      setFriends(true);
    } else {
      setFriends(false);
    }
  }, [currentUser, user]);

  const handleRequest = (id) => {
    friendRequest(id, socket);
  };

  const handleUnfriend = (id) => {
    dispatch(unfriend(id, socket));
  };

  // Modal for avatar
  const openModal = (src) => {
    setModal(src);
    setToggle(true);
  };

  const closeContainer = () => {
    setToggle(false);
  };

  const [parentRef, isClickedOutside] = useClickOutside();
  // const [modalRef, isClickedOutsideModal] = useClickOutside();
  useEffect(() => {
    closeContainer();
  }, [isClickedOutside]);

  // cropper
  const onInputChange = (e) => {
    // convert image file to base64 string
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        setInputImg(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
    setOpen(true);
  };

  const [open, setOpen] = useState(false);

  // chat in profile

  const { friendsConversations } = useSelector((state) => state.conversations);
  const { openChat } = useSelector((state) => state.conversations);
  const handleChatOpen = () => {
    const conversation = friendsConversations.filter(
      (friend) => friend._id === user._id
    );
    console.log(
      `conversation,user._id,friendsConversations`,
      conversation,
      user._id,
      friendsConversations
    );
    dispatch(setOpenChat(!openChat));
    dispatch(setConvo(conversation[0]));
  };


  return (
    <>
      <input
        type="file"
        id="imgupload"
        style={{ display: "none" }}
        ref={fileInput}
        onChange={onInputChange}
        accept="image/*"
      />
      <Modal
        isOpen={toggle}
        setOpen={setToggle}
        closeContainer={closeContainer}
        parentRef={parentRef}
        isClickedOutside={isClickedOutside}
      >
        <img src={modal} alt="" height="500px" width="500px" />
      </Modal>
      <div className="pd-left">
        {inputImg && (
          <CropperContainer>
            <CustomizedDialogs
              open={open}
              title={"Avatar"}
              handleClose={() => setOpen(false)}
            >
              <Crop inputImg={inputImg} open={open} setOpen={setOpen} />
            </CustomizedDialogs>
          </CropperContainer>
        )}
        <ProfileDetailsRow>
          {/* <EditIcon
            onClick={(e) => {
              e.stopPropagation();
              return fileInput.current.click();
            }}
          >
            <IoCamera />
          </EditIcon> */}
          <ProfileImage
            src={user.avatar}
            onClick={(e) => {
              e.stopPropagation();
              return openModal(user.avatar);
            }}
          ></ProfileImage>
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
            <button type="submit" onClick={handleClickOpen}>
              <IoPencil style={buttonStyle} />
              Edit Profile
            </button>
          </>
        ) : (
          <>
            {friends ? (
              <button type="button" onClick={() => handleUnfriend(user._id)}>
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
            <button type="button" onClick={handleChatOpen}>
              <IoChatbubble style={buttonStyle} /> Message
            </button>
          </>
        )}
        <br />
        {/* <a href="#dummy">
          <IoEllipsisHorizontal style={{ width: "20px" }} />
        </a> */}
      </ProfileDetailsRight>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    friendRequest: (id, socket) => {
      dispatch(friendRequest(id, socket));
    },
  };
};

export default connect(null, mapDispatchToProps)(ProfileDetails);

const CropperContainer = styled.div`
  position: relative;
`;

const EditIcon = styled.div`
  background-color: #8d8a8a90;
  color: #000;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 6px;
  display: none;
  z-index: 100;
  cursor: pointer;
`;

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
  &:hover ${EditIcon} {
    display: flex;
  }
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 6px;
  cursor: pointer;
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
