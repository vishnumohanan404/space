import React from "react";
import styled from "styled-components";

const ProgressBar = ({ bgcolor, progress, height }) => {
  const ParentDiv = styled.div`
    height: ${height};
    width: "100%";
    background-color: "whitesmoke";
    border-radius: 40;
    margin: 50;
  `;
  const ChildDiv = styled.div`
    height: "100%";
    width: ${progress}%;
    background-color: ${bgcolor};
    border-radius: 40px;
    text-align: "right";
    `

  const ProgressText = styled.span`
    padding: 0 10px ;
    color: "black";
    font-weight: 900;
  `

  return (
    <ParentDiv>
      <ChildDiv>
        <ProgressText>{`${progress}%`}</ProgressText>
      </ChildDiv>
    </ParentDiv>
  );
};

export default ProgressBar;
