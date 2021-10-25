import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Avatar from "../../components/Avatar";
import ProgressBar from "../../components/ProgressBar";
import { LoadingWrapper, UserNameText } from "../common";
import { IoHappy, IoCloseOutline } from "react-icons/io5";
import { addPost } from "../../redux";
import ClipLoader from "react-spinners/ClipLoader";
import _ from "lodash";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import { Marginer } from "../../components/Marginer";
import { validateFiles, fnGetExtension } from "../../utils/writePostUtils";
import CustomizedDialogs from "../../components/Dialog";
import { FcAddImage, FcCompactCamera } from "react-icons/fc";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const IconStyle = { marginRight: "7", width: "30px", size: "50px" };

function WritePost({ margin }) {
  const [status, setStatus] = useState({ postContent: "" });
  const [imagePreview, setImagePreview] = useState([]);
  const [formData, setFormData] = useState({});
  const [newFormData, setNewFormData] = useState({});
  const [videoPreview, setVideoPreview] = useState([]);
  const fileInput = useRef();
  const [videoPlayer, setVideoPlayer] = useState("");
  // redux states
  const { user } = useSelector((state) => state.user);
  const {addPostLoading, progress} = useSelector(state => state.writePostUI)
  const isLoading = addPostLoading
  // redux dispatch
  const dispatch = useDispatch();
  // render
  console.log("Write post rendered");
  
  let form = new FormData();
  let formArray;

  useEffect(() => {
    console.log("Wrtiepost-useeffect-1");
    let files = newFormData;
    if (files.length > 2) {
      console.log("useEffec-1 if-case");
      alert("You can select only 2 files");
    } else if (validateFiles(files)) {
      console.log("useEffec-1 else-case");
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
    console.log("Wrtiepost-useeffect-2");
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
  }, [addPostLoading]);

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
    if (!_.isEmpty(formData) || status.postContent.length > 0) {
      form.append("postContent", status.postContent);
      dispatch(addPost(form));
    }
    e.target.reset();
  };

  const playVideo = (src) => {
    console.log(`src`, src);
    setVideoPlayer(src);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = useCallback(() => {
    setOpen(false);
  },[]);
  return (
    <>
      <CustomizedDialogs
        open={open}
        title={"Preview"}
        handleClose={handleClose}
        children={<ReactPlayer url={videoPlayer} controls={true} />}
      />
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
                <FcAddImage style={IconStyle} size={40} />
                Add Medias
              </label>
              <label href="#2">
                <FcCompactCamera style={IconStyle} size={40} />
                Capture
              </label>
              <label href="#1">
                <IoHappy
                  style={{ ...IconStyle, color: " RGB(255,222,52)" }}
                  size={40}
                />
                Feelings
              </label>
              <Button>
                {isLoading ? (
                  <LoadingWrapper>
                    <ClipLoader loading color="#fff" size={20} />
                  </LoadingWrapper>
                ) : (
                  "POST"
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
                      handleClickOpen();
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
                    <VideoPreview src={src} alt="videoPreviews" key={src}>
                      <source src={src} type="audio/ogg" />
                    </VideoPreview>
                  </VideoContainer>
                ))}
            </PreviewRow>
          </PostInputContainer>
        </PostForm>
      </WritePostContainer>
    </>
  );
}

export default WritePost;

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
  /* width: 100%; */
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  font-size: 16px;
  font-weight: 800;
  font-family: "Poppins", sans-serif;
  height: 40px;
  width: 80px;
  border-radius: 30px;
  border: none;
  box-shadow: 1px 1px 0px 2px rgba (0, 0, 0, 0.3);
  background: #6262625c;
  cursor: pointer;
  color: #4e4e4ec3;
  transition: 0.8s;
  transition-property: background, color, transform;
  :hover {
    background: rgb(141, 217, 252);
    color: #626262;
    transform: scale(1.03);
  }
`;

const Preview = styled.img`
  display: block;
  margin: 15px 15px 15px 0;
  height: 7rem;
  min-width: 7rem;
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
