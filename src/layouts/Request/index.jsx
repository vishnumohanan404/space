import React, { useEffect } from "react";
import styled from "styled-components";
import { IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";
// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptRequest, rejectRequest, updateUser } from "../../redux/";
// import { NoValueHeader } from "../common";
import { Link } from "react-router-dom";

function Request() {
  const { user } = useSelector((state) => state.user);
  const socket = useSelector((state) => state.socket);
  // console.log(requests)
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(`socket`, socket);
    if (socket) {
      console.log("socket exist");
      socket.on("REQUEST_SENT_TO_CLIENT", (newUser) => {
        console.log(`REQUEST_SENT_TO_CLIENT`, newUser);
        dispatch(updateUser(newUser));
      });
    }
    return () => socket && socket.off("REQUEST_SENT_TO_CLIENT");
  }, [socket, dispatch]);

  const handleAccept = (id) => {
    dispatch(acceptRequest(id, socket));
  };

  const handleReject = (id) => {
    dispatch(rejectRequest(id, socket));
  };

  return (
    <RequestContainer>
      <Link to={`profile/${user.requestDetails[0]?._id}`} style={{textDecoration:'none',color:'black'}}>
        <UserCard>
          <img
            src="https://avatars.dicebear.com/api/human/vidshnu.svg"
            alt="thumbnail"
          ></img>
          <h4>{user.requestDetails[0]?.fullName}</h4>
          {/* <p>No mutual friends</p> */}
        </UserCard>
      </Link>
      <RightSide>
        <CircularContainer
          style={{ backgroundColor: "#a3e97484" }}
          onClick={() => handleAccept(user.requestDetails[0]._id)}
        >
          <IoCheckmarkOutline />
        </CircularContainer>
        <CircularContainer
          style={{ backgroundColor: "#e9747484" }}
          onClick={() => handleReject(user.requestDetails[0]._id)}
        >
          <IoCloseOutline />
        </CircularContainer>
      </RightSide>
    </RequestContainer>
  );
}

export default Request;

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
  display: flex;
  flex-direction: row;
  cursor: pointer;
  h4 {
    margin-left: 15px;
  }
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
