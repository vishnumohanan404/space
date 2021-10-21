import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { newComment } from "../../redux";
import { useSelector } from "react-redux";

function CommentsInput({ post, setComment, comment }) {
  const socket = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const submitComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (comment.trim()) {
        dispatch(newComment(comment, post._id, socket));
        setComment("");
      }
    }
  };

  return (
    <form style={{ width: "100%" }}>
      <BarInput
        type="textarea"
        placeholder="Write a comment"
        value={comment}
        onChange={handleChange}
        onKeyPress={submitComment}
      />
    </form>
  );
}

export default CommentsInput;

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
