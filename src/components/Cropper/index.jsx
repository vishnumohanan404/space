import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { IoClose } from "react-icons/io5";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import { generateDownload } from "../../utils/cropImage";
import { useRef } from "react";

function Crop({ inputImg, open, setOpen }) {
  const inputRef = useRef();
  const triggerFileSelectPopup = () => inputRef.current.click();
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onDownload = () => {
    generateDownload(inputImg, croppedArea);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open}>
        <DialogTitle>
          <TitleBox>
            <Title>Edit Avatar</Title>
          </TitleBox>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <IoClose />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
        <Cropper
								image={inputImg}
								crop={crop}
								zoom={zoom}
								aspect={1}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={onCropComplete}
							/>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Crop;
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

const Title = styled.h3`
  color: #fff;
  position: absolute;
  z-index: 1000;
  display: flex;
  justify-content: center;
`;
