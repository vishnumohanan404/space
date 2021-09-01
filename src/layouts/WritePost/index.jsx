import React, { useRef, useState } from "react";
import styled from "styled-components";
import Avatar from "../../components/Avatar";
import { UserNameText } from "../common";
import {
  IoCameraOutline,
  IoImageOutline,
  IoHappyOutline,
} from "react-icons/io5";
import Button from "../../components/Button";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Modal from "../Modal";

const WritePostContainer = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  padding-top: 10px;
  margin-top: 1.5%;
  color: #626262;
  box-shadow: 0px 2px 12px 3px rgba(34, 34, 34, 0.103);
`;

const PostForm = styled.form``;

const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  p {
    /* margin-bottom: -4px; */
    padding-left: 5px;
    font-weight: 500;
    color: #626262;
  }
  small {
    font-size: 12px;
  }
`;

const PostInputContainer = styled.div`
  padding-left: 47px;
  /* padding-top: 10px; */
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 0;
  outline: 0;
  border-bottom: 1px solid #ccc;
  resize: none;
  background: #adadad65;
  border-radius: 6px;
  padding: 20px;
  color: #626262;
`;

const AddPostLinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  label {
    text-decoration: none;
    display: flex;
    align-items: center;
    color: #626262;
    margin-right: 30px;
    font-size: 14px;
  }
`;

const IconStyle = { marginRight: "7", width: "30px", size: "50px" };

function WritePost() {
  const { user } = useContext(AuthContext);
  const handleFileUpload = (event) => {
    alert(event.target.files[0].name);
  };
  const fileInput = useRef();

  console.log(user);
  const [isToggled, setToggle] = useState(false)
  return (
    <>
    <Modal isToggled={isToggled} setToggle={setToggle}>
      <img src="https://avatars.dicebear.com/api/human/vidshnu.svg" alt="" ></img>
    </Modal>
      <WritePostContainer>
        <PostForm>
          <UserProfileContainer>
            <Avatar src={user.avatar} />
            <div>
              <UserNameText>{user.fullName}</UserNameText>
            </div>
          </UserProfileContainer>
          <PostInputContainer>
            <TextArea placeholder="What's on your mind"></TextArea>
            <AddPostLinksContainer>
              <input
                ref={fileInput}
                onChange={handleFileUpload}
                type="file"
                style={{ display: "none" }}
              />
              <label onClick={() => fileInput.current.click()}>
                <IoImageOutline style={IconStyle} />
                Add Media
              </label>
              <label href="#2">
                <IoCameraOutline style={IconStyle} />
                Capture Images
              </label>
              <label href="#1">
                <IoHappyOutline style={IconStyle} />
                Feelings
              </label>
              <Button content="Post" />
            </AddPostLinksContainer>
          </PostInputContainer>
        </PostForm>
      </WritePostContainer>
    </>
  );
}

export default WritePost;
