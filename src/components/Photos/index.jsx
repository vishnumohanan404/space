import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useClickOutside } from "react-click-outside-hook";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Modal from "../../layouts/Modal";

function Photos() {
  const { userProfile } = useSelector((state) => state.profile);
  const [toggle, setToggle] = useState(false);
  const [modal, setModal] = useState();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    let photos = [];
    userProfile.userPosts?.forEach((post) => {
      post.medias?.forEach((media) => {
        if (media.split(".").pop(1) === "jpeg") {
          media = media.split("/").pop(1);
          photos = [...photos, media];
        }
      });
    });
    photos = photos.slice(0, 9);
    setPhotos(photos);
  }, [userProfile]);

  // Modal
  const openModal = (src) => {
    setModal(src);
    setToggle(true);
  };

  const closeContainer = () => {
    setToggle(false);
  };

  const [parentRef, isClickedOutside] = useClickOutside();
  useEffect(() => {
    closeContainer();
  }, [isClickedOutside]);
  return (
    <>
      <Modal
        isToggled={toggle}
        setToggle={setToggle}
        closeContainer={closeContainer}
        parentRef={parentRef}
        isClickedOutside={isClickedOutside}
      >
        <img
          src={`http://localhost:5000/api/images/${modal}`}
          alt=""
          height="500px"
        />
      </Modal>
      <Photoscontainer>
        <TitleBox style={{display:"none"}}>
          <h3>Photos</h3>
        </TitleBox>
        <PhotoBox>
          {photos &&
            photos.map((src) => {
              return (
                <div key={src} onClick={() => openModal(src)}>
                  <img src={`http://localhost:5000/api/images/${src}`} alt="" />
                </div>
              );
            })}
        </PhotoBox>
      </Photoscontainer>
    </>
  );
}

export default Photos;

const Photoscontainer = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  padding-top: 10px;
  /* margin-top: 1.5%; */
  color: #626262;
`;

const PhotoBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-gap: 8px;
  margin-top: 10px;
  h3 {
    margin: 0;
  }
  img {
    width: 100%;
    cursor: pointer;
    object-fit: cover;
    height: 150px;
    width: 150px;
    border-radius: 4px;
  }
  p {
    font-size: 14px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: #1876f2;
    font-size: 14px;
  }
  h3 {
    margin: 0;
  }
`;
