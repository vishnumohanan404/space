import React from "react";
import styled from "styled-components";
import Avatar from "../../components/Avatar";
import Heading from "../../components/Heading";
import { UserNameText } from "../common";
import { IoCallOutline, IoChatbubbleOutline } from "react-icons/io5";

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
  justify-content: space-evenly;
  background-color: #e4e1e186;
  border-radius: 8px;
  padding: 5px 0;
  margin: 0.5em 0;
  p {
    /* margin-bottom: -4px; */
    padding-left: 5px;
    font-weight: 500;
    color: #626262;
  }
  small {
    font-size: 12px;
  }
`;

const IonicContainer = styled.div`
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: #bfbfbf;
  width: 36px;
  height: 36px;
`;

const IonicStyle = { alignItems: "center", justifyContent: "center" };

function Conversations() {
  return (
    <Container>
      <UserProfileContainer>
        <Avatar src={"https://avatars.dicebear.com/api/human/vidshnu.svg"} />
        <UserNameText>Vishnu Mohan</UserNameText>
        <IonicContainer>
          <IoCallOutline style={{ IonicStyle }} />
        </IonicContainer>
        <IonicContainer>
          <IoChatbubbleOutline style={IonicStyle} />
        </IonicContainer>
      </UserProfileContainer>
      <UserProfileContainer>
        <Avatar src={"https://avatars.dicebear.com/api/human/vidshnu.svg"} />
        <UserNameText>Vishnu Mohan</UserNameText>
        <IonicContainer>
          <IoCallOutline style={{ IonicStyle }} />
        </IonicContainer>
        <IonicContainer>
          <IoChatbubbleOutline style={IonicStyle} />
        </IonicContainer>
      </UserProfileContainer>
      <UserProfileContainer>
        <Avatar src={"https://avatars.dicebear.com/api/human/vidshnu.svg"} />
        <UserNameText>Vishnu Mohan</UserNameText>
        <IonicContainer>
          <IoCallOutline style={{ IonicStyle }} />
        </IonicContainer>
        <IonicContainer>
          <IoChatbubbleOutline style={IonicStyle} />
        </IonicContainer>
      </UserProfileContainer>
      <UserProfileContainer>
        <Avatar src={"https://avatars.dicebear.com/api/human/vidshnu.svg"} />
        <UserNameText>Vishnu Mohan</UserNameText>
        <IonicContainer>
          <IoCallOutline style={{ IonicStyle }} />
        </IonicContainer>
        <IonicContainer>
          <IoChatbubbleOutline style={IonicStyle} />
        </IonicContainer>
      </UserProfileContainer>
      <UserProfileContainer>
        <Avatar src={"https://avatars.dicebear.com/api/human/vidshnu.svg"} />
        <UserNameText>Vishnu Mohan</UserNameText>
        <IonicContainer>
          <IoCallOutline style={{ IonicStyle }} />
        </IonicContainer>
        <IonicContainer>
          <IoChatbubbleOutline style={IonicStyle} />
        </IonicContainer>
      </UserProfileContainer>
      <UserProfileContainer>
        <Avatar src={"https://avatars.dicebear.com/api/human/vidshnu.svg"} />
        <UserNameText>Vishnu Mohan</UserNameText>
        <IonicContainer>
          <IoCallOutline style={{ IonicStyle }} />
        </IonicContainer>
        <IonicContainer>
          <IoChatbubbleOutline style={IonicStyle} />
        </IonicContainer>
      </UserProfileContainer>
      <UserProfileContainer>
        <Avatar src={"https://avatars.dicebear.com/api/human/vidshnu.svg"} />
        <UserNameText>Vishnu Mohan</UserNameText>
        <IonicContainer>
          <IoCallOutline style={{ IonicStyle }} />
        </IonicContainer>
        <IonicContainer>
          <IoChatbubbleOutline style={IonicStyle} />
        </IonicContainer>
      </UserProfileContainer>
      <UserProfileContainer>
        <Avatar src={"https://avatars.dicebear.com/api/human/vidshnu.svg"} />
        <UserNameText>Vishnu Mohan</UserNameText>
        <IonicContainer>
          <IoCallOutline style={{ IonicStyle }} />
        </IonicContainer>
        <IonicContainer>
          <IoChatbubbleOutline style={IonicStyle} />
        </IonicContainer>
      </UserProfileContainer>
    </Container>
  );
}

export default Conversations;
