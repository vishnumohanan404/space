import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Chat from "../../layouts/Chat";
import Conversations from "../../layouts/Conversations";

const ConversationsPage = () => {
  const { openBubble } = useSelector((state) => state.conversations);
  const { openChat } = useSelector((state) => state.conversations);
  return (
    <Container>
      {openChat ? (
        <ChatBubble active={openBubble}>
          <Chat />
        </ChatBubble>
      ) : (
        <Conversations />
      )}
    </Container>
  );
};

export default ConversationsPage;

const Container = styled.div`
  flex-basis: 47%;
  position: sticky;
  top: 105px;
  align-self: flex-start;
  background: #fff;
  padding: 6rem 3rem ;
  border-radius: 6px;
  
`;

const ChatBubble = styled.div`
  height: 55px;
  overflow: hidden;
  min-width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  right: 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 1px solid #e4e4e4;
  ${({ active }) =>
    active &&
    `
    min-height:87%
    `}
`;
