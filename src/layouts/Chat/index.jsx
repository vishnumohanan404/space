import React, { useEffect, useState } from "react";
import {
  IoCall,
  IoCamera,
  IoCheckmarkDone,
  IoClose,
  IoHappyOutline,
  IoImage,
  IoRemoveOutline,
  IoThumbsUp,
  IoVideocam,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  clearChat,
  getMessages,
  sendMessage,
  setConvo,
  setOpenChat,
  setOpenBubble,
} from "../../redux/chat/chatActions";

function Chat() {
  const [message, setMessage] = useState("");
  const { chat } = useSelector((state) => state.conversations);
  const { user } = useSelector((state) => state.user);
  const { conversation, openBubble } = useSelector(
    (state) => state.conversations
  );
  const socket = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (conversation.conversation)
      dispatch(getMessages(conversation.conversation._id));
    return () => {
      dispatch(clearChat());
    };
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(setOpenChat(false));
    dispatch(setConvo(false));
  };

  const handleText = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (message.trim()) {
        dispatch(sendMessage(message, conversation, socket));
      }
      setMessage("");
    }
  };

  const handleBubble = () => {
    dispatch(setOpenBubble(!openBubble));
  };
  return (
    <div>
      <ChatHeader>
        <UserAvatar onClick={handleBubble}>
          <Link to={`/profile/${conversation._id}`}>
            <ImageContainer active={conversation.active}>
              <img src={conversation.avatar} height="35" width="35" alt="" />
            </ImageContainer>
          </Link>
          <UserStatusInfo>
            <Link to={`/profile/${conversation._id}`}>
              <button>{conversation.fullName}</button>
            </Link>
          {conversation.active &&  <p>Active now</p> }
          </UserStatusInfo>
        </UserAvatar>
        <ChatComm active={openBubble}>
          <nav>
            <button>
              <IoVideocam
                onMouseOver={({ target }) => (target.style.color = "#069")}
                onMouseOut={({ target }) => (target.style.color = "#BEC2C9")}
                style={IonicStyle}
                size={20}
              />
            </button>
            <button>
              <IoCall
                onMouseOver={({ target }) => (target.style.color = "#069")}
                onMouseOut={({ target }) => (target.style.color = "#BEC2C9")}
                style={IonicStyle}
                size={20}
              />
            </button>
            <button onClick={handleBubble}>
              <IoRemoveOutline
                onMouseOver={({ target }) => (target.style.color = "#069")}
                onMouseOut={({ target }) => (target.style.color = "#BEC2C9")}
                style={IonicStyle}
                size={20}
              />
            </button>
            <button onClick={handleClose}>
              <IoClose
                onMouseOver={({ target }) => (target.style.color = "#cc16169e")}
                onMouseOut={({ target }) => (target.style.color = "#BEC2C9")}
                style={IonicStyle}
                size={20}
              />
            </button>
          </nav>
        </ChatComm>
      </ChatHeader>
      <ChatBody>
        {chat &&
          chat.map((message) => (
            <React.Fragment key={message._id}>
              {message.recipient === user._id ? (
                <div>
                  <SenderOther>
                    <OtherMessage>{message.text}</OtherMessage>
                  </SenderOther>
                  <SeenAt>
                    {new Date(message.createdAt).toLocaleDateString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </SeenAt>
                </div>
              ) : (
                <SenderMe>
                  <MyMessage>{message.text}</MyMessage>
                  {message.read ? (
                    <IoCheckmarkDone style={IonicCheckmarkRead} />
                  ) : (
                    <IoCheckmarkDone style={IonicCheckmark} />
                  )}
                  <SeenAt>
                    {message.read && "Seen "}
                    {new Date(message.createdAt).toLocaleDateString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </SeenAt>
                </SenderMe>
              )}
            </React.Fragment>
          ))}
      </ChatBody>
      <ChatFooter>
        <input
          type="textarea"
          value={message}
          placeholder="Type a message..."
          onChange={handleText}
          onKeyPress={handleSubmit}
        />
        <ChatMedia>
          <nav>
            <span>
              <IoImage style={IonicFooterIcons} />
            </span>
            <span>
              <IoHappyOutline style={IonicFooterIcons} />
            </span>
            <span>
              <IoCamera style={IonicFooterIcons} />
            </span>
          </nav>
          <span>
            <IoThumbsUp style={IonicFooterIcons} />
          </span>
        </ChatMedia>
      </ChatFooter>
    </div>
  );
}

export default Chat;

const IonicFooterIcons = { width: "18px", color: "#bec2c9" };

const ChatMedia = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  span {
    text-decoration: none;
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
`;

const ChatFooter = styled.div`
  border-top: 1px solid #e4e4e4;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-top: 8px;
  input[type="textarea"] {
    width: 100%;
    border: none;
    padding: 0 8px;
  }
  input[type="textarea"]:focus {
    outline: none;
  }
`;

const IonicCheckmark = { width: "12px", marginRight: "4px" };
const IonicCheckmarkRead = {
  width: "12px",
  marginRight: "4px",
  color: "#34B7F1",
};

const SeenAt = styled.div`
  display: flex;
  align-items: center;
  color: #90949c;
  font-size: 10px;
  /* margin-top: 8px; */
`;

const MyMessage = styled.div`
  background-color: #3578e5;
  color: #fff;
  border-radius: 25px;
  padding: 8px 11px;
  font-size: 14px;
`;

const SenderMe = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const OtherMessage = styled.div`
  background-color: #f1f0f0;
  border-radius: 25px;
  padding: 8px 11px;
  font-size: 14px;
`;

const SenderOther = styled.div`
  display: flex;
  margin-bottom: 4px;
`;

const ChatBody = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding: 8px;
  overflow: auto;
  position: absolute;
  bottom: 80px;
  right: 0;
  left: 0;
  top: 60px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const UserStatusInfo = styled.div`
  button {
    background: none !important;
    border: none;
    padding: 0 !important;
    cursor: pointer;
    /*  */
    font-size: 13px;
    margin: 0;
    font-weight: 500;
    color: #464646;
    font-family: "Noto sans", sans-serif;
    :hover {
      text-decoration: underline;
    }
  }
  p {
    font-size: 11px;
    color: gray;
    margin: 0;
  }
`;
const ImageContainer = styled.div`
  position: relative;
  &:after {
    content: "";
    width: 10px;
    height: 10px;
    ${({ active }) => active ? `
    background-color: #1ba71b;
  ` :`
  background-color: #a8a4a4c9;
  
  `}
    position: absolute;
    right: 4px;
    bottom: 4px;
    border-radius: 50%;
    border: 2px solid #fff;
  }
`;
const UserAvatar = styled.div`
  display: flex;
  flex: 1;
  img {
    border-radius: 50%;
    margin-right: 8px;
  }
`;
const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 25px;
  z-index: 10;
  position: relative;
  padding: 8px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  background-color: #fff;
  transition: background-color 0.3s ease-in;
  &:hover {
    background-color: #f7f7f7;
  }
`;
const ChatComm = styled.div`
  button {
    background: none !important;
    border: none;
    padding: 0 !important;
    cursor: pointer;
    text-decoration: none;
    &:not(:last-of-type) {
      margin-right: 8px;
    }
  }
  ${({ active }) =>
    active
      ? `
    display: block;
    `
      : `
    display: none;
  `}
`;


const IonicStyle = {
  width: "22px",
  alignItems: "center",
  justifyContent: "center",
  color: "#BEC2C9",
};
