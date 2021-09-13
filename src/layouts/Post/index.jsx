import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UserNameText } from "../common";
import Avatar from "../../components/Avatar";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../components/responsive";
import Request from "../Request";
import { fetchPosts } from "../../redux";
import { connect } from "react-redux";
import Skeleton from "react-loading-skeleton";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import PostCarousel from "../../components/PostCarousel";
import { Marginer } from "../../components/Marginer";
import PostLikes from "../../components/PostActions/PostLikes";
// import PostComments from "../../components/PostActions/PostComments";
import CommentComponent from "../../components/CommentComponent";
// import Comments from "../../components/Comments";

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

// const CommentsContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
// `;

const postIcons = { width: "18px", marginRight: "10px" };

function Post({
  postData,
  fetchPosts,
  isLoading = postData?.isLoading,
  progress,
}) {
  const [toggleComment, setToggleComment] = useState([]);
  const formatter = buildFormatter(frenchStrings);
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

  useEffect(() => {
    fetchPosts();
  }, []);

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
                <Avatar
                  src={"https://avatars.dicebear.com/api/human/vidshnu.svg"}
                  marginTop={"15px"}
                />
                <div>
                  <UserNameText>{post.authorName}</UserNameText>
                  <span>
                    <TimeAgo date={post.createdAt} formatter={formatter} />
                  </span>
                </div>
              </UserProfileContainer>
            </PostRow>
            <PostText>{post.postContent}</PostText>
            {post.medias && (
              <PostCarousel mediaKeys={post.medias}></PostCarousel>
            )}
            <Marginer direction="vertical" margin={10} />
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
                <CommentComponent />
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
      {isMobile && (
        <PostContainer>
          <Request />
        </PostContainer>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    postData: state.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    // fetchProfile: ()=>dispatch()
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
