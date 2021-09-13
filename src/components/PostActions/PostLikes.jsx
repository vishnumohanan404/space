import React, { useEffect, useState } from "react";
import { IoThumbsUp } from "react-icons/io5";
// import { Marginer } from "../../components/Marginer";
import styled from "styled-components";
// import axios from "axios";
import { api } from "../../api.config";
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

const postIcons = { width: "18px", marginRight: "10px" };

function PostLikes({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const { user: currentUser } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    let userId = currentUser._id.toString();
    setIsLiked(post.likes.includes(userId));
  }, []);

  useEffect(() => {
    console.log(socket)
  }, [like, socket]);

  const handleLike = () => {
    api
      .put(`/post/${post._id}/like`)
      .then((response) => {
        console.log(response);
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
      })
      .catch((err) => {});
  };

  return (
    <PostActionButtons onClick={handleLike} data-id={post._id}>
      <IoThumbsUp style={postIcons} />
      {like}
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
