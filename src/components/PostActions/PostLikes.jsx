import React, { useEffect, useState } from "react";
import { IoThumbsUp } from "react-icons/io5";
// import { Marginer } from "../../components/Marginer";
import styled from "styled-components";
// import axios from "axios";
import { api } from "../../api.config";
import { likePost } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { socketConnect } from "../../redux";

const PostActionButtons = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #afafafa2;
  }
`;

const likeIcons = { width: "18px", marginRight: "10px", color: "3DB2FF" };
const noLikeIcons = { width: "18px", marginRight: "10px" };

function PostLikes({ post }) {
  const {user} = useSelector(state => state.user)
  const [isLiked, setIsLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  const { user: currentUser } = useSelector((state) => state.user);
  const  socket  = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  // const { socket } = useSelector((state) => state.socket);
  // const dispatch = useDispatch();

  useEffect(() => {
    let userId = currentUser._id.toString();
    setIsLiked(post.likes.includes(userId));
  }, [post.likes]);


  const handleLike = async () => {
    setLikeLoading(true);
    await dispatch(likePost(post._id,socket,user));
    setLikeLoading(false);
    
  };

  return !likeLoading ? (
    <PostActionButtons onClick={handleLike} data-id={post._id}>
      {isLiked ? (
        <IoThumbsUp style={likeIcons} />
      ) : (
        <IoThumbsUp style={noLikeIcons} />
      )}
    </PostActionButtons>
  ) : (
    <PostActionButtons data-id={post._id}>
      {isLiked ? (
        <IoThumbsUp style={likeIcons} />
      ) : (
        <IoThumbsUp style={noLikeIcons} />
      )}
    </PostActionButtons>
  );
}

export default PostLikes;

// useEffect(() => {
//       let userId= currentUser._id.toString()
//       console.log(post.likes.includes(userId),userId)
//     setIsLiked(post.likes.includes(userId));
//   }, []);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const res = await api.get(`/users?userId=${post.userId}`);
//       setUser(res.data);
//     };
//     fetchUser();
//   }, [post.userId]);
