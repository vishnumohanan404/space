import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FriendComponent = styled.div`
  width: 100%;
  height: 6em;
  display: flex;
  border-bottom: 1px solid #d8d8d852;
  padding: 6px 8px;
  align-items: center;
`;

const Thumbnail = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex: 0.4;
  img {
    width: auto;
    height: 100%;
  }
`;

const Name = styled.h3`
  font-size: 20px;
  color: #000;
  margin-left: 10px;
  flex: 2;
  display: flex;
`;



export default function SearchResult(props) {
  const { thumbnailSrc, name, id, collapseContainer } = props;
  return (
    <Link to={`/profile/${id}`} onClick={collapseContainer} style={{textDecoration:"none"}}>
      <FriendComponent>
        <Thumbnail>
          <img src={thumbnailSrc} alt="searchResultThumb"></img>
        </Thumbnail>
        <Name>{name}</Name>
      </FriendComponent>
    </Link>
  );
}
