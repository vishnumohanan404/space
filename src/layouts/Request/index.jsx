import React from "react";
import styled from "styled-components";
import { IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";
import { useEffect } from "react";
// import { NoValueHeader } from "../common";

const RequestContainer = styled.div`
  display: flex;
  font-size: 14px;
  margin: 10px 0;
  border-radius: 10px;
  min-height: 30px;
  justify-content: space-between;
  img {
    height: 60px;
    width: 60px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid #e6e6e6;
  }
  p {
    font-size: 12px;
    margin: 0;
  }
  h4 {
    margin: 0;
    margin-top: 2px;
  }
`;


// const NoValueContainer = styled.div`
//   display: flex;
//   margin: 10px 0;
//   border-radius: 10px;
//   min-height: 30px;
//   justify-content: center;
// `;

const UserCard = styled.div`
  align-items: center;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CircularContainer = styled.a`
  height: 46px;
  width: 46px;
  border-radius: 50%;
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;

  &:hover {
    filter: brightness(1.2);
  }
`;
function Request({requests}) {
  console.log(requests)
  useEffect(()=>{

  },[])

  return (
     <RequestContainer>
      <img
        src="https://avatars.dicebear.com/api/human/vidshnu.svg"
        alt="thumbnail"
      ></img>
      <UserCard>
        <h4>Vishnu</h4>
        <p>No mutual friends</p>
      </UserCard>
      <RightSide>
        <CircularContainer style={{backgroundColor: "#a3e97484"}}>
          <IoCheckmarkOutline />
        </CircularContainer>
        <CircularContainer style={{backgroundColor: "#e9747484"}}>
            <IoCloseOutline/>
        </CircularContainer>
      </RightSide>
    </RequestContainer>
  );
}

export default Request;
