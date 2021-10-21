import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import styled from "styled-components";
// import { generateDownload } from "../../utils/cropImage";
// import { useRef } from "react";

function Crop({ inputImg, open, setOpen }) {
  // const inputRef = useRef();
  // const triggerFileSelectPopup = () => inputRef.current.click();
  // eslint-disable-next-line no-unused-vars
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  // const onDownload = () => {
  //   generateDownload(inputImg, croppedArea);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  return (
    <>
      <Container>
        <CropperContainer>
          <Cropper
            image={inputImg}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </CropperContainer>
        <SliderContainer>
          <Slider
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e, zoom) => setZoom(zoom)}
          />
        </SliderContainer>
        <ContainerButton>
          <button>
            Save
          </button>
        </ContainerButton>
      </Container>
    </>
  );
}

export default Crop;

const SliderContainer = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  margin: auto;
  width: 60%;
  position: relative;
`;

const Container = styled.div`
  padding: 10px;
  height: 90%;
`;

const CropperContainer = styled.div`
  height: 90%;
  /* position: relative; */
`;

const ContainerButton = styled.div`
  border: 1px solid #f5f5f5;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: absolute;
  bottom: 0;
`;
