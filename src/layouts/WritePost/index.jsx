import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Avatar from "../../components/Avatar";
import ProgressBar from "../../components/ProgressBar";
import { LoadingWrapper, UserNameText } from "../common";
import {
  IoCameraOutline,
  IoImageOutline,
  IoHappyOutline,
  IoCloseOutline,
} from "react-icons/io5";
import Modal from "../Modal";
import { connect } from "react-redux";
import { addPost } from "../../redux";
import ClipLoader from "react-spinners/ClipLoader";
import _ from "lodash";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import { useClickOutside } from "react-click-outside-hook";
import { Marginer } from "../../components/Marginer";

const IconStyle = { marginRight: "7", width: "30px", size: "50px" };

const validateFiles = (files) => {
  for (var i = 0; i < files?.length; i++) {
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
  userData,
  user = userData.user,
  isLoading = postData?.addPostLoading,
  progress = postData?.progress,
  margin
}) {
  const [status, setStatus] = useState({ postContent: "" });
  const [imagePreview, setImagePreview] = useState([]);
  const [formData, setFormData] = useState({});
  const [newFormData, setNewFormData] = useState({});
  const [videoPreview, setVideoPreview] = useState([]);
  const fileInput = useRef();
  const [videoPlayer, setVideoPlayer] = useState("");
  let form = new FormData();
  let formArray;

  useEffect(() => {
    let files = newFormData;
    if (files.length > 2) {
      alert("You can select only 2 files");
    } else if (validateFiles(files)) {
      _.forEach(files, (file) => {
        const fileType = fnGetExtension(file);
        switch (fileType) {
          case "jpg":
            setImagePreview((prevState) => [
              ...prevState,
              URL.createObjectURL(file),
            ]);
            break;
          case "mp4":
            setVideoPreview((prevState) => [
              ...prevState,
              URL.createObjectURL(file),
            ]);
            break;
          default:
            break;
        }
      });
    }
  }, [newFormData]);

  useEffect(() => {
    if (progress === 100) {
      setFormData({});
      setNewFormData({});
      setVideoPreview([]);
      setImagePreview([]);
      for (var key of form.keys()) {
        // here you can add filtering conditions
        form.delete(key);
      }
       // eslint-disable-next-line react-hooks/exhaustive-deps
      formArray = [];
      setFormData({});
      setStatus({ postContent: "" });
    }
  }, [postData]);

  const handleFileChange = (event) => {
    let { files } = event.target;
    formArray = Array.from(files);
    // form state has to be set separately on for preview and one for appending new formData
    setFormData(formArray);
    setNewFormData(formArray);
  };

  const onImageRemove = (src, index) => {
    const newState = imagePreview.filter((item, stateIndex) => item !== src);
    const newFilesState = formData.filter(
      (file, stateIndex) => stateIndex !== index
    );
    setFormData(newFilesState);
    setImagePreview(newState);
    var values = form.getAll("files[]");
    // eslint-disable-next-line no-redeclare
    var index = values.indexOf(src);
    values.splice(index, 1);
    form.set("files[]", values);
  };

  const onVideoRemove = (event, src, index) => {
    const newState = videoPreview.filter((item, stateIndex) => item !== src);
    const newFilesState = formData.filter(
      (file, stateIndex) => stateIndex !== index
    );
    setFormData(newFilesState);
    setVideoPreview(newState);
    var values = form.getAll("files[]");
    // eslint-disable-next-line no-redeclare
    var index = values.indexOf(src);
    values.splice(index, 1);
    form.set("files[]", values);
  };

  const handleInput = (event) => {
    setStatus({ postContent: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!_.isEmpty(formData))
      formData.forEach((value, index) => {
        form.append("files", value);
      });
    // console.log(form.entries().next().done, "populated");
    // console.log(status.postContent.length, "postcontent");
    // console.log(`_.isEmpty(formData)`);
    if (!_.isEmpty(formData) || status.postContent.length > 0) {
      form.append("postContent", status.postContent);
      addPost(form);
    }
    e.target.reset();
  };

  const [isToggled, setToggle] = useState(false);

  const playVideo = (src) => {
    setVideoPlayer(src);
    setToggle(true);
  };

  const closeContainer = () => {
    setToggle(false);
    // if (inputRef.current) inputRef.current.value = "";
  };

  const [parentRef, isClickedOutside] = useClickOutside();
  useEffect(() => {
    closeContainer();
  }, [isClickedOutside]);

  return (
    <>
      <Modal
        isToggled={isToggled}
        setToggle={setToggle}
        closeContainer={closeContainer}
        parentRef={parentRef}
        isClickedOutside={isClickedOutside}
      >
        <ReactPlayer url={videoPlayer} controls={true} />
      </Modal>

      <WritePostContainer style={margin}>
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
                Capture Images
              </label>
              <label href="#1">
                <IoHappyOutline style={IconStyle} />
                Feelings
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
            <Marginer direction="vertical" margin={10} />
            {isLoading && imagePreview && progress && (
              <ProgressBar
                progress={progress}
                height={30}
                bgcolor={"#99ccff"}
              />
            )}
            <PreviewRow>
              {!!imagePreview.length &&
                imagePreview.map((src, index) => (
                  <ImgContainer
                    key={src}
                    // animate={{ scale: 1.1 }}
                    // transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    // whileTap={{ scale: 0.9 }}
                  >
                    <DeleteButton onClick={() => onImageRemove(src, index)}>
                      <IoCloseOutline />
                    </DeleteButton>
                    <Preview src={src} alt="imagePreviews" key={src} />
                  </ImgContainer>
                ))}
              {!!videoPreview.length &&
                videoPreview.map((src, index) => (
                  <VideoContainer
                    key={src}
                    // animate={{ scale: 1.1 }}
                    // transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    // whileTap={{ scale: 0.9 }}
                    onClick={(event) => {
                      console.log(event.target, "event");
                      console.log(event.currentTarget, "current event");
                      // if (event.target !== event.currentTarget) return false;
                      playVideo(src);
                    }}
                  >
                    <DeleteButton
                      onClick={(event) => {
                        event.stopPropagation();
                        console.log(event.target, this, "event and this");
                        onVideoRemove(event, src, index);
                      }}
                    >
                      <IoCloseOutline />
                    </DeleteButton>
                    <VideoPreview src={src} alt="videoPreviews" key={src} />
                  </VideoContainer>
                ))}
            </PreviewRow>
          </PostInputContainer>
        </PostForm>
      </WritePostContainer>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    postData: state.posts,
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (data) => dispatch(addPost(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WritePost);

const WritePostContainer = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  padding-top: 10px;
  /* margin-top: 1.5%; */
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
    cursor: pointer;
  }
`;

const PreviewRow = styled.div`
  width: 100%;
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

const VideoPreview = styled.video`
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

const VideoContainer = styled(motion.div)`
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
