import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UserNameText } from "../common";
import Avatar from "../../components/Avatar";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../constants/responsive";
import Request from "../Request";
import { deletePost, fetchPosts, likePostSuccess } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import PostCarousel from "../../components/PostCarousel";
import { Marginer } from "../../components/Marginer";
import PostLikes from "../../components/PostActions/PostLikes";
import CommentComponent from "../../components/CommentComponent";
import { Link } from "react-router-dom";
import BasicMenu from "../../components/BasicMenu";

const postIcons = { width: "18px", marginRight: "10px" };

function Post({ postData }) {
  // ui
  const [toggleComment, setToggleComment] = useState([]);
  const formatter = buildFormatter(frenchStrings);
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

  // redux
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket);
  const { user } = useSelector((state) => state.user);
  const post = useSelector((state) => state.posts);
  const isLoading = postData?.isLoading;

  if (!postData) {
    postData = post;
  }


  console.log("Post rendered");

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("LIKE_TO_CLIENT", (newPost) => {
        // console.log(`newPost in like to client`, newPost);
        dispatch(likePostSuccess(newPost));
      });
    }
    return () => socket && socket.off("LIKE_TO_CLIENT");
  }, [socket, dispatch]);

  const handleToggle = (id) => {
    const toggleList = toggleComment.includes(id);
    if (toggleList) {
      setToggleComment(
        toggleComment.filter((_id) => {
          return _id !== id;
        })
      );
    } else {
      setToggleComment([...toggleComment, id]);
    }
  };

  return (
    <>
      {!isLoading ? (
        postData &&
        postData.posts &&
        postData.posts.map((post) => (
          <PostContainer key={post._id}>
            <PostRow>
              <UserProfileContainer>
                <Avatar src={post.avatar} marginTop={"15px"} />
                <div>
                  <Link
                    to={`profile/${post.userId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <UserNameText>{post.authorName}</UserNameText>
                  </Link>
                  <span>
                    <TimeAgo date={post.createdAt} formatter={formatter} />
                  </span>
                </div>
              </UserProfileContainer>
              {post.userId === user._id && (
                <BasicMenu
                  key={post._id}
                  elevation={1}
                  deletePost={deletePost}
                  post={post}
                ></BasicMenu>
              )}
            </PostRow>
            <PostText>{post.postContent}</PostText>
            {post.medias && (
              <PostCarousel mediaKeys={post.medias}></PostCarousel>
            )}
            <Marginer direction="vertical" margin={10} />
            <ReactionsRow>
              <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
                {post.likes.length} likes
              </h6>
              <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
                {post.comments.length} comments
              </h6>
            </ReactionsRow>
            <PostActivityIcon>
              <PostLikes post={post} />
              <PostActionButtons onClick={() => handleToggle(post._id)}>
                <IoChatboxEllipsesOutline style={postIcons} />
                {post.comments?.length}
              </PostActionButtons>
            </PostActivityIcon>
            <Marginer direction="horizontal" marginTop={"15px"} />
            {toggleComment.includes(post._id) && (
              <PostRow>
                <CommentComponent post={post} />
              </PostRow>
            )}
          </PostContainer>
        ))
      ) : (
        <>
          <PostContainer>
            <Skeleton count={5} />
          </PostContainer>
          <PostContainer>
            <Skeleton count={5} />
          </PostContainer>
          <PostContainer>
            <Skeleton count={5} />
          </PostContainer>
        </>
      )}
      {isMobile && user.friendRequest && (
        <PostContainer>
          <Request />
        </PostContainer>
      )}
    </>
  );
}


export default Post;

// const Options = styled.div`
//   padding: 1rem;
//   border-radius: 50%;
//   line-height: 50%;
//   transition: background-color 0.2s ease;
//   cursor: pointer;
//   :hover {
//     background: #f2f2f2;
//   }
// `;

const PostContainer = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  padding-top: 10px;
  color: #626262;
  margin: 20px 0;
  object-fit: contain;
`;

const PostRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ReactionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
  h6 {
    margin: 0;
    padding: 0;
  }
`;

const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-bottom: -4px;
    padding-left: 5px;
    font-weight: 500;
    color: #626262;
  }
  small {
    font-size: 12px;
  }
  span {
    font-size: 11px;
    color: #9a9a9a;
    padding-left: 5px;
  }
`;

const PostText = styled.p`
  color: #626262;
  margin: 15px 0;
  font-size: 15px;
  span {
    color: #626262;
    font-weight: 500;
  }
  a {
    color: #1876f2;
    text-decoration: none;
  }
`;

const PostActivityIcon = styled.div`
  display: flex;
  &:first-child {
    margin-right: 20px;
  }
`;

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
