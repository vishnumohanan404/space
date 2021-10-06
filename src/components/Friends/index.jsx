import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import Avatar from "../../components/Avatar";
import { IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";
import { acceptRequest, rejectRequest } from "../../redux";
function Friends() {
  const { userProfile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);
  const [friendsList, setFriendsList] = useState("All Friends");
  console.log(`friendsList`, user, userProfile);
  const socket = useSelector((state) => state.socket);
  // console.log(requests)
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(`socket`, socket);
  //   if (socket) {
  //     console.log("socket exist")
  //     socket.on("REQUEST_SENT_TO_CLIENT", (newUser) => {
  //       console.log(`REQUEST_SENT_TO_CLIENT`, newUser);
  //       dispatch(updateUser(newUser));
  //     });
  //   }
  //   return () => socket && socket.off("REQUEST_SENT_TO_CLIENT");
  // }, [socket, dispatch]);

  const handleAccept = (id) => {
    dispatch(acceptRequest(id, socket));
  };

  const handleReject = (id) => {
    dispatch(rejectRequest(id, socket));
  };
  return (
    <FriendsContainer>
      <TitleBox>
        <h3 onClick={() => setFriendsList("All Friends")}>All Friends</h3>
        <div>
          {user._id === userProfile._id && (
            <>
              <a
                href="#dummy"
                onClick={(e) => {
                  e.preventDefault();
                  setFriendsList("Requests");
                }}
              >
                Requests
              </a>
              <a
                href="#dummy"
                onClick={(e) => {
                  e.preventDefault();
                  setFriendsList("Blocked");
                }}
              >
                Blocked Users
              </a>
            </>
          )}
        </div>
      </TitleBox>
      {friendsList === "All Friends" && (
        <FriendsBox>
          {userProfile.friends &&
            userProfile.friends.map((friend) => {
              return (
                <Link
                  to={`/profile/${friend._id}`}
                  key={friend._id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div>
                    <img src={friend.avatar} alt="" />
                    <p style={{ fontSize: "12px" }}>{friend.fullName}</p>
                  </div>
                </Link>
              );
            })}
        </FriendsBox>
      )}
      {user._id === userProfile._id && friendsList === "Requests" && (
        <RequestBox>
          {user.requestDetails.map((request) => {
            return (
              <RequestContainer>
                <UserCard>
                  <Avatar
                    // marginTop={"15px"}
                    src={request.avatar}
                  ></Avatar>
                  <h4>{request.fullName}</h4>
                  {/* <p>No mutual friends</p> */}
                </UserCard>
                <RightSide>
                  <CircularContainer
                    style={{ backgroundColor: "#a3e97484" }}
                    onClick={() => handleAccept(request._id)}
                  >
                    <IoCheckmarkOutline />
                  </CircularContainer>
                  <CircularContainer
                    style={{ backgroundColor: "#e9747484" }}
                    onClick={() => handleReject(request._id)}
                  >
                    <IoCloseOutline />
                  </CircularContainer>
                </RightSide>
              </RequestContainer>
            );
          })}
          
        </RequestBox>
        
      )}
      {user._id === userProfile._id && friendsList === "Blocked" && (
        <FriendsBox>Blocked users</FriendsBox>
      )}
    </FriendsContainer>
  );
}

export default Friends;

const FriendsContainer = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  padding-top: 10px;
  /* margin-top: 1.5%; */
  color: #626262;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  a {
    text-decoration: none;
    color: #1876f2;
    font-size: 14px;
    margin-left: 15px;
  }
  h3 {
    margin: 0;
    cursor: pointer;
  }
`;

const FriendsBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 10px;
  margin-top: 15px;
  div img {
    width: 100%;
    cursor: pointer;
    object-fit: cover;
    border-radius: 4px;
    height: 90px;
    width: 90px;
    padding-bottom: 20px;
  }
  h3 {
    margin: 0;
  }
  div {
    position: relative;
  }
  p {
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0;
  }
`;

const RequestBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2);
  grid-gap: 10px;
  margin-top: 15px;
`;

const RequestContainer = styled.div`
  display: flex;
  font-size: 14px;
  margin: 10px 0;
  border-radius: 10px;
  min-height: 30px;
  justify-content: space-between;
  align-self: flex-start;
  &:hover{

    background-color: #d3cdcd7f;
  }
  padding: 10px;
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
