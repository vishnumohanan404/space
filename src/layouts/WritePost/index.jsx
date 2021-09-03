import React, { useRef, useState } from "react";
import styled from "styled-components";
import Avatar from "../../components/Avatar";
import { LoadingWrapper, UserNameText } from "../common";
import {
  IoCameraOutline,
  IoImageOutline,
  IoHappyOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Modal from "../Modal";
import { connect } from "react-redux";
import { addPost } from "../../redux";
import ClipLoader from "react-spinners/ClipLoader";
import _ from "lodash";
import { motion } from "framer-motion";

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

const PreviewRow = styled.div`
  width: 100%;
  height: 8em;
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  font-size: 14px;
  font-family: "Poppins", sans-serif;
  height: 30px;
  width: 70px;
  border-radius: 30px;
  border: none;
  box-shadow: 1px 1px 0px 2px rgba (0, 0, 0, 0.3);
  background: rgb(141, 217, 252);
  cursor: pointer;
  color: #626262;
`;

const Preview = styled.img`
  margin: 15px 15px 15px 0;
  height: 7rem;
  object-fit: cover;
  flex: 0 0 100px;
  border-radius: 4px;
`;

const ImgContainer = styled(motion.div)`
  position: relative;
  display: flex;
`;

const DeleteButton = styled.span`
  height: 16px;
  width: 16px;
  background-color: #bbb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100;
  &:hover {
    filter: brightness(1.2);
  }
`;

const IconStyle = { marginRight: "7", width: "30px", size: "50px" };

const validateFiles = (files) => {
  for (var i = 0; i < files.length; i++) {
    var ext = files[i].name.split(".").pop();
    if (ext !== "mp4" && ext !== "m4v" && ext !== "jpg") {
      alert("Invalid data");
      return false;
    }
    return true;
  }
};

const fnGetExtension = (file) => {
  var fileInput = file;
  var fileName = fileInput.name;
  var fileExtension = fileName.split(".").pop();
  return fileExtension;
};

function WritePost({
  postData,
  addPost,
  isLoading = postData?.addPostLoading,
}) {
  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState({ postContent: "" });
  const [imagePreview, setImagePreview] = useState([]);

  let form = new FormData();

  const handleFileChange = (event) => {
    let { files } = event.target;
    if (files > 2) {
      alert("You can select only 2 files");
    } else if (validateFiles(files)) {
      _.forEach(files, (file) => {
        console.log(file,"file ")
        form.append("files", file);
        
      });
    }
  };

  // const onImageRemove = (src) => {
  //   const newState = imagePreview.filter((item, stateIndex) => item !== src);
  //   setImagePreview(newState);
  //   var values = form.getAll("files[]");
  //   var index = values.indexOf(src)
  //   values.splice(index, 1);
  //   form.set("files[]", values);
  // };

  const handleInput = (event) => {
    setStatus({ postContent: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // for (var pair of form.entries()) {
    //   console.log("jheloo")
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    console.log(form.entries().next().done)

    form.append("PostContent", status.postContent);
    addPost(form);
  };

  const fileInput = useRef();
  const [isToggled, setToggle] = useState(false);

  return (
    <>
      <Modal isToggled={isToggled} setToggle={setToggle}>
        <img
          src="https://avatars.dicebear.com/api/human/vidshnu.svg"
          alt=""
        ></img>
      </Modal>

      <WritePostContainer>
        <PostForm onSubmit={handleSubmit}>
          <UserProfileContainer>
            <Avatar src={user.avatar} />
            <div>
              <UserNameText>{user.fullName}</UserNameText>
            </div>
          </UserProfileContainer>
          <PostInputContainer>
            <TextArea
              placeholder="What's on your mind"
              onChange={handleInput}
            ></TextArea>
            <AddPostLinksContainer>
              <input
                ref={fileInput}
                onChange={handleFileChange}
                type="file"
                multiple="multiple"
                name="files"
                style={{ display: "none" }}
              />
              <label onClick={() => fileInput.current.click()}>
                <IoImageOutline style={IconStyle} />
                Add Medias
              </label>
              <label href="#2">
                <IoCameraOutline style={IconStyle} />
                Add Video
              </label>
              <label href="#1">
                <IoHappyOutline style={IconStyle} />
                Capture Images
              </label>
              <Button>
                {isLoading ? (
                  <LoadingWrapper>
                    <ClipLoader loading color="#fff" size={20} />
                  </LoadingWrapper>
                ) : (
                  "Post"
                )}
              </Button>
            </AddPostLinksContainer>
            {!!imagePreview.length && (
              <PreviewRow>
                {imagePreview.map((src, index) => (
                  <ImgContainer
                    key={src}
                    // animate={{ scale: 1.1 }}
                    // transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <DeleteButton>
                      <IoCloseOutline />
                    </DeleteButton>
                    <Preview src={src} alt="imagePreviews" key={src} />
                  </ImgContainer>
                ))}
              </PreviewRow>
            )}
          </PostInputContainer>
        </PostForm>
      </WritePostContainer>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    postData: state.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (data) => dispatch(addPost(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WritePost);
