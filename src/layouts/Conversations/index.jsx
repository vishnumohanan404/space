import React, { useEffect } from "react";
import styled from "styled-components";
import Avatar from "../../components/Avatar";
// import Heading from "../../components/Heading";
import { UserNameText } from "../common";
import {
  IoCall,
  IoChatbubble,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  clearConversations,
  getUserChatFriends,
  setActiveInConvo,
  setConvo,
  setMessageSuccess,
  setOpenChat,
} from "../../redux/chat/chatActions";

function Conversations() {
  const { friendsConversations } = useSelector((state) => state.conversations);
  const { openChat } = useSelector((state) => state.conversations);
  const { user } = useSelector((state) => state.user);
  const socket = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserChatFriends());
    return async () => {
      await dispatch(clearConversations());
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("SEND_MESSAGE_TO_CLIENT", (message) => {
        // console.log(`new message to client`, message);
        try {
          dispatch(setMessageSuccess(message));
        } catch (error) {
          console.log(`error`, error);
        }
      });
    }
    return () => socket && socket.off("SEND_MESSAGE_TO_CLIENT");
  }, [socket, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("SET_ACTIVE_CLIENT", (user) => {
        // console.log(`new user active to client`, user);
        try {
          dispatch(setActiveInConvo(user));
        } catch (error) {
          console.log(`error`, error);
        }
      });
    }
    return () => socket && socket.off("SET_ACTIVE_CLIENT");
  }, [socket, dispatch]);

  const handleConversation = (conversation) => {
    dispatch(setOpenChat(!openChat));
    dispatch(setConvo(conversation));
  };

  return (
    <Container>
      {friendsConversations.map((friend, index) => (
        <React.Fragment key={index}>
          <UserProfileContainer
            onClick={(e) => {
              e.stopPropagation();
              return handleConversation(friend);
            }}
          >
            <LeftSide>
              <Avatar src={friend.avatar} />
              <div>
                <UserNameText>
                  {friend.fullName}{" "}
                  <span>{friend.active ? "Online" : "Offline"}</span>
                </UserNameText>
                {friend.conversation && (
                  <LastText>
                    <LastMsg>
                      {friend.conversation.author === user._id
                        ? "Me"
                        : friend.fullName}
                      {"  "}:{"  "}
                      {friend.conversation.text}
                    </LastMsg>
                  </LastText>
                )}
              </div>
            </LeftSide>
            <RightSide>
              <IonicContainer onClick={(e) => e.stopPropagation()}>
                <IoCall style={IonicStyle} size={20} />
              </IonicContainer>

              <IonicContainer
                onClick={(e) => {
                  e.stopPropagation();
                  return handleConversation(friend);
                }}
              >
                <IoChatbubble style={IonicStyle} size={20} />
              </IonicContainer>
            </RightSide>
          </UserProfileContainer>
          <Hr />
        </React.Fragment>
      ))}
    </Container>
  );
}

export default Conversations;

const LastText = styled.div`
  display: inline;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0;
  }
  span {
    font-size: 12px;
    padding-left: 5px;
    margin: 0;
  }
  div {
    display: flex;
    flex-direction: column;
  }
`;

const LastMsg = styled.span`
  color: #005b80;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  background: #fff;
  height: calc(45vh);
  min-height: calc(60vh);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  margin: 0.1em 0;
  p {
    /* margin-bottom: -4px; */
    padding-left: 5px;
    font-weight: 500;
    color: #626262;
  }
  small {
    font-size: 12px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const IonicContainer = styled.div`
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin-left: 5px;
  transition: 0.3s;
  :hover {
    background-color: #bbbaba9e;
  }
`;
const Hr = styled.hr`
  border: 0;
  height: 0;
  border-top: 0.4px solid #bdbdbd7b;
`;

const IonicStyle = {
  alignItems: "center",
  justifyContent: "center",
  color: "#BEC2C9",
};
