import React from "react";
import { useState } from "react";
import {
  IoEllipsisHorizontal,
  IoHappyOutline,
} from "react-icons/io5";
import styled from "styled-components";
// import Avatar from "../Avatar";

function CommentComponent({}) {
  const [commentInput, setCommentInput] = useState("");
  const handleChange = (e) => {
    setCommentInput(e.target.value);
  };

  const submitComment = (e) => {
    if(e.key==="Enter"){
      e.preventDefault()
      console.log(e.key)
    }
  };
  return (
    <FooterComments>
      {/* <CommentsFilter>
        Most relevant <IoCaretDownOutline />
      </CommentsFilter> */}
      <CommentsBox>
        <BoxProfile>
          <ProfilePic src="https://avatars.dicebear.com/api/human/vidshnu.svg" />
        </BoxProfile>
        <BoxBar>
          <form style={{width:"100%"}}>
            <BarInput
              type="text"
              placeholder="Write a comment"
              onChange={handleChange}
              onKeyPress={submitComment}
            />
          </form>
        </BoxBar>
        <BarEmojis>
          <EmojisInsert>
            <IoHappyOutline />
          </EmojisInsert>
        </BarEmojis>
      </CommentsBox>
      <CommentsFriendComment>
        <FriendCommentPic src="https://avatars.dicebear.com/api/human/vidshnu.svg" />
        <FriendCommentComment>
          <CommentAuthor>Vishnu Mohan</CommentAuthor>
          <CommentContent>
            It sure feels different to see you on a different color T-shirt, but
            still, technology advances everytime and we are glad that you're a
            part of it.
          </CommentContent>
          {/* <CommentReaction></CommentReaction> */}
          <CommentLinks>
            <span>
              <LinksLikes>Like</LinksLikes> &#183;
            </span>
            <span>
              <LinksReply>Reply</LinksReply> &#183;
            </span>
            <span>
              <LinksDate>16w</LinksDate>
            </span>
          </CommentLinks>
        </FriendCommentComment>
        <FriendCommentOptions>
          <IoEllipsisHorizontal />
        </FriendCommentOptions>
      </CommentsFriendComment>
      <CommentsMoreComments>
        <MoreComments>
          <a href="#more">View more comments</a>
        </MoreComments>
        <MoreCommentsCount>100</MoreCommentsCount>
      </CommentsMoreComments>
    </FooterComments>
  );
}

export default CommentComponent;

const FooterComments = styled.div`
  margin: 0 0 60px;
  padding: 8px 12px;
  font-size: 15px;
  font-weight: 600;
  text-align: right;
  color: #65676b;
`;
// const CommentsFilter = styled.div`
//   display: inline-block;
//   margin-bottom: 8px;
//   cursor: pointer;
// `;

const CommentsBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const BoxProfile = styled.div`
  margin-right: 10px;
  position: relative;
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    bottom: 3px;
    left: 23px;
    background: #2f9a48;
    border: 3px solid #fff;
    border-radius: 50%;
  }
  &:hover {
    cursor: pointer;
  }
`;

const ProfilePic = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const BoxBar = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const BarInput = styled.input`
  width: 100%;
  background: #f0f2f5;
  border: none;
  padding: 12px;
  font-size: 15px;
  color: rgba(5, 5, 5, 0.8);
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  outline: none;
  flex: 1;
  &::placeholder {
    opacity: 0.8;
  }
  &:focus::-webkit-input-placeholder {
    opacity: 0.6;
  }
`;

const BarEmojis = styled.div`
  display: flex;
  align-items: center;
  height: 41.6px;
  background: #f0f2f5;
  padding-right: 12px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const EmojisInsert = styled.span`
  border-radius: 50%;
  padding: 5px;
  line-height: 5px;
  margin-left: 3px;
  cursor: pointer;
`;

const CommentsFriendComment = styled.div`
  display: flex;
  text-align: start;
`;

const FriendCommentPic = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  transition: filter 0.2s ease;
  &:hover {
    filter: brightness(0.95);
  }
`;

const FriendCommentComment = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-right: 5px;
  padding: 8px 12px;
  background: #f0f2f5;
  border-radius: 15px;
`;

const CommentAuthor = styled.a`
  align-self: flex-start;
  color: #050505;
  font-size: 13.5px;
  &:hover {
    text-decoration: underline;
  }
`;

const CommentContent = styled.span`
  font-size: 15px;
  font-weight: 400;
  color: #050505;
`;

// const CommentReaction = styled.div`
//   display: flex;
//   align-items: center;
//   position: absolute;
//   bottom: -15px;
//   right: 0;
//   padding: 0.20px 5px;
//   background: #fff;
//   box-shadow: 0 0.10px 0.20px rgba(0, 0, 0, 0.2);
//   border-radius: 10px;
//   cursor: pointer;
// `;

const CommentLinks = styled.div`
  position: absolute;
  bottom: -20px;
  color: #65676b;
  font-size: 12px;
  font-weight: 400;
`;
const LinksLikes = styled.a`
  font-weight: 700;
  &:hover {
    text-decoration: underline;
  }
`;

const LinksReply = styled.a`
  font-weight: 700;
  &:hover {
    text-decoration: underline;
  }
`;

const LinksDate = styled.a`
  font-weight: 700;
  &:hover {
    text-decoration: underline;
  }
`;

const FriendCommentOptions = styled.div`
  align-self: center;
  padding: 8px;
  border-radius: 50%;
  line-height: 8px;
  cursor: pointer;
  &:hover {
    background: #f0f2f5;
  }
`;

const CommentsMoreComments = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  bottom: -50px;
`;

const MoreComments = styled.span`
  a {
    text-decoration: none;
    color: inherit;
  }
  &:hover {
    text-decoration: underline;
  }
`;

const MoreCommentsCount = styled.span`
  font-weight: 400;
`;
