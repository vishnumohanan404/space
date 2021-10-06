import React, { useEffect, useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import {
  // IoEllipsisHorizontal,
  IoHappyOutline,
} from "react-icons/io5";
import styled from "styled-components";
import CommentsInput from "../CommentsInput";
import CommentList from "../CommentList";
import { useSelector } from "react-redux";
// import Avatar from "../Avatar";

function CommentComponent({ post }) {
  const { user } = useSelector((state) => state.user);
  const [next, setNext] = useState(1);
  const [showComments, setShowComments] = useState([]);
  const [comments, setComments] = useState([]);
  const [emojiPickerState, SetEmojiPicker] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    setComments(post.comments);
    setShowComments(
      post.comments.slice(
        next > post.comments.length ? 0 : post.comments.length - next,
        post.comments.length
      )
    );
  }, [post.comments, next]);

  function triggerPicker(event) {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  }
  let emojiPicker;
  if (emojiPickerState) {
    emojiPicker = (
      <Picker
        skin={3}
        perLine={6}
        sheetSize={32}
        showPreview={false}
        showSkinTones={false}
        onSelect={(emoji) => setComment(comment + emoji.native)}
        style={{ position: 'absolute', top: '20px', right: '20px' }}
      />
    );
  }
  return (
    <FooterComments>
      {/* <CommentsFilter>
        Most relevant <IoCaretDownOutline />
      </CommentsFilter> */}
      <CommentsBox>
        <BoxProfile>
          <ProfilePic src={user.avatar} />
        </BoxProfile>
        <BoxBar>
          <CommentsInput
            post={post}
            comment={comment}
            setComment={setComment}
          />
        </BoxBar>
        <BarEmojis>
          <EmojisInsert onClick={triggerPicker}>
            <IoHappyOutline />
          </EmojisInsert>
          <EmojiPicker>{emojiPicker}</EmojiPicker>
        </BarEmojis>
      </CommentsBox>
      {showComments.map((comment, index) => (
        <CommentList comment={comment} key={index} />
      ))}
      {comments.length - next > 0 ? (
        <CommentsMoreComments>
          <MoreComments>
            <div onClick={(e) => setNext(next + 5)}>View more comments</div>
          </MoreComments>
          <MoreCommentsCount>{post.comments.length - next}</MoreCommentsCount>
        </CommentsMoreComments>
      ) : (
        <CommentsMoreComments>
          <MoreComments>
            <div onClick={(e) => setNext(1)}>Hide comments</div>
          </MoreComments>
        </CommentsMoreComments>
      )}
    </FooterComments>
  );
}

export default CommentComponent;

const EmojiPicker = styled.div`
  position: relative;
  top:0;
  z-index: 1000;
`;

const FooterComments = styled.div`
  margin: 0 0 00px;
  padding: 8px 12px;
  font-size: 15px;
  font-weight: 600;
  text-align: right;
  color: #65676b;
  width: 100%;
`;

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

const CommentsMoreComments = styled.div`
  display: flex;
  justify-content: space-between;
  /* position: relative;*/
  bottom: -50px;
`;

const MoreComments = styled.span`
  div {
    text-decoration: none;
    color: inherit;
  }
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const MoreCommentsCount = styled.span`
  font-weight: 400;
`;
