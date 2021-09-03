import React from "react";
import styled from "styled-components";
import Avatar from "../../components/Avatar";
// import Heading from "../../components/Heading";
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
const Hr=styled.hr`
  border: 0; 
  height: 1px; 
  background-image: -webkit-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
  background-image: -moz-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
  background-image: -ms-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
  background-image: -o-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0); 
`

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
      <Hr/>
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
      <Hr/>
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
      <Hr/>
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
      <Hr/>
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
      <Hr/>
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
      <Hr/>
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
      <Hr/>
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
