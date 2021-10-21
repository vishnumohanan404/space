import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IoEllipsisHorizontal } from "react-icons/io5";
import TimeAgo from "react-timeago";
import styled from "styled-components";
import frenchStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { likeComment } from "../../redux";

function CommentList({ comment }) { 
  // eslint-disable-next-line no-unused-vars
  const[showOptions,setShowOptions]= useState(false)
  const formatter = buildFormatter(frenchStrings);
  const dispatch = useDispatch();
  const handleLike = (commentId) => {
    dispatch(likeComment(commentId));
  };
  return (
    <CommentsFriendComment>
      <FriendCommentPic src={comment.authorAvatar} />
      <FriendCommentComment>
        <CommentAuthor>{comment.authorName}</CommentAuthor>
        <CommentContent>{comment.comment}</CommentContent>
        {/* <CommentReaction></CommentReaction> */}
        <CommentLinks>
          <span>
            <Likes>
              {comment.likes.length && <span>{comment.likes.length}</span>}  people liked
            </Likes> &#160;
            &#183;
          </span>
          <span>
            <LinksLikes onClick={() => handleLike(comment._id)}>
              Like
            </LinksLikes>
            &#183;
          </span>
          {/* <span>
            <LinksReply>Reply</LinksReply> &#183;
          </span> */}
          <span>
            <LinksDate>
              <TimeAgo date={comment.createdAt} formatter={formatter} />
            </LinksDate>
          </span>
        </CommentLinks>
      </FriendCommentComment>
      <FriendCommentOptions  onClick={()=>setShowOptions(true)}>
        <IoEllipsisHorizontal />
      </FriendCommentOptions>
    </CommentsFriendComment>
  );
}

export default CommentList;

const CommentsFriendComment = styled.div`
  display: flex;
  text-align: start;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 5px;
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
  margin: 0 5px 20px 0;
  padding: 8px 12px;
  background: #f0f2f5;
  border-radius: 15px;
  width: 100%;
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
  width: 100%;
`;

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
    cursor: pointer;
  }
`;

const Likes = styled.a`
  font-weight: 400;
  span{
    font-weight: 700;
  }
`;

// const LinksReply = styled.a`
//   font-weight: 700;
//   &:hover {
//     text-decoration: underline;
//     cursor: pointer;
//   }
// `;

const LinksDate = styled.a`
  font-weight: 400;
  &:hover {
    text-decoration: none;
  }
`;

const FriendCommentOptions = styled.div`
  align-self: center;
  padding: 8px;
  border-radius: 50%;
  line-height: 8px;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover {
    background: #f0f2f5;
  }
`;
