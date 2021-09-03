import React, { useEffect } from "react";
import styled from "styled-components";
import { UserNameText } from "../common";
import Avatar from "../../components/Avatar";
import { IoThumbsUp, IoChatboxEllipsesOutline } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../components/responsive";
import Request from "../Request";
import { fetchPosts } from "../../redux";
import { connect } from "react-redux";
import Skeleton from "react-loading-skeleton";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

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

const PostImg = styled.img`
  width: 100%;
  border-radius: 4px;
  margin-bottom: 5px;
`;

const PostActivityIcon = styled.div`
  div i {
    width: 18px;
    margin-right: 10px;
  }
  div {
    display: inline-flex;
    align-items: center;
    margin-right: 30px;
  }
`;

const postIcons = { width: "18px", marginRight: "10px" };

function Post({ postData, fetchPosts, isLoading = postData?.isLoading }) {
  const formatter = buildFormatter(frenchStrings);
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  console.log(postData,"post data")
  useEffect(() => {
    fetchPosts();
  }, []);

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
            {post.medias && <PostImg src={post.medias} alt="post"></PostImg>}
            <PostRow>
              <PostActivityIcon>
                <div>
                  <IoThumbsUp style={postIcons} />
                  {post.likes?.length}
                </div>
                <div>
                  <IoChatboxEllipsesOutline style={postIcons} />
                  {post.comments?.length}
                </div>
              </PostActivityIcon>
            </PostRow>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
