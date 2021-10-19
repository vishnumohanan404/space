import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactPlayer from "react-player";

const PostImg = styled.img`
  width: 100%;
  border-radius: 4px;
  margin-bottom: 5px;
`;

function PostCarousel({
  mediaKeys,
  downloads,
  isLoading = downloads?.downLoading,
}) {

  return (
    <Carousel showIndicators={false} showThumbs={false}>
      {mediaKeys &&
        mediaKeys.map((key) => (
          <React.Fragment key={key}>
            {key.split(".").pop() === "mp4" ? (
                <ReactPlayer
                  controls={true}
                  url={`${process.env.REACT_APP_API_URL}/images/${key.slice(6)}`}
                  width="100%"
                  height="99%"
                  key={key}
                  />
            ) : (
                <PostImg
                src={`${process.env.REACT_APP_API_URL}/images/${key.slice(6)}`}
                  alt="post"
                  key={key}
                />
            )}
          </React.Fragment>
        ))}
    </Carousel>
  );
}

const mapStateToProps = (state) => {
  return {
    downloads: state.downloads,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCarousel);



// const ImagePlaceHolder = styled.div`
//   width: 677.4px;
//   border-radius: 4px;
//   margin-bottom: 5px;
//   height: 677.4px;
//   background-color: gray;
// `;
