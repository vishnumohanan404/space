import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_REQUEST,
  ON_PROGRESS,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  // like
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  // comment
  NEW_COMMENT_START,
  NEW_COMMENT_SUCCESS,
  NEW_COMMENT_FAILURE,
  UPDATE_POST,
  // UPDATE_COMMENT,
  LIKE_COMMENT,
  // GET_SINGLE_POST,
  DELETE_POST,
} from "./PostTypes";
import { api } from "../../api.config";
import { createNotify } from "../notifications/NotificationActions";

// fetch posts
export const fetchPostsRequest = () => {
  return {
    type: FETCH_POSTS_REQUEST,
  };
};

export const fetchPostsSuccess = (posts) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts,
  };
};

export const fetchPostsFailure = (errors) => {
  return {
    type: FETCH_POSTS_ERROR,
    payload: errors,
  };
};

export const fetchPosts = () => {
  return (dispatch) => {
    dispatch(fetchPostsRequest());
    api
      .get("/feeds/")
      .then((res) => {
        dispatch(fetchPostsSuccess(res.data));
      })
      .catch((err) => {
        console.log("Error from fetch user post",err.message);
        dispatch(fetchPostsFailure(err.message));
      });
    };
  };
  
  // recheck this method
  export const fetchUserPosts = () => {
    return (dispatch) => {
      dispatch(fetchPostsRequest());
      api
      .get("/feeds/")
      .then((res) => {
        dispatch(fetchPostsSuccess(res.data));
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(fetchPostsFailure(err.message));
      });
  };
};

// add post
export const addPostRequest = () => {
  return {
    type: ADD_POST_REQUEST,
  };
};

export const addPostSuccess = (result) => {
  return {
    type: ADD_POST_SUCCESS,
    payload: result,
  };
};

export const addPostFailure = (errors) => {
  return {
    type: ADD_POST_FAILURE,
    payload: errors,
  };
};

export const onProgress = (progress) => {
  return {
    type: ON_PROGRESS,
    payload: progress,
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    dispatch(addPostRequest());
    api
      .post("/post", data, {
        withCredentials: true,
        headers: {
          "content-type": "multipart/form-data",
        },
        onUploadProgress: function (progressEvent) {
          // Do whatever you want with the native progress event
          // progress in %
          let progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          dispatch(onProgress(progress));
        },
      })
      .then((result) => {
        dispatch(addPostSuccess(result.data));
      })
      .catch((err) => {
        console.log("Error:", err.message);
        dispatch(addPostFailure(err.message));
      });
  };
};

// like post
export const likePostRequest = () => {
  return {
    type: LIKE_POST_REQUEST,
  };
};

export const likePostSuccess = (result) => {
  return {
    type: LIKE_POST_SUCCESS,
    payload: result,
  };
};
export const likePostFailure = (error) => {
  return {
    type: LIKE_POST_FAILURE,
    payload: error,
  };
};

export const likePost = (id, socket, user) => {
  return (dispatch) => {
    dispatch(likePostRequest());
    api
      .put(`/post/${id}/like`)
      .then((response) => {
        // console.log(`response.data`, response.data)
        dispatch(likePostSuccess(response.data));
        if (
          response.data.userId !== user._id &&
          response.data.type === "LIKE"
        ) {
          const notify = {
            type: "liked your post",
            createdBy: user._id,
            recipients: [response.data.userId],
            url: `post/${response.data._id}`,
            read: false,
            createdAt: new Date(),
          };
          dispatch(createNotify({ notify, socket }));
        }
        socket.emit("LIKE_POST", {
          _id: response.data._id,
          userId: response.data.userId,
          likes: response.data.likes,
        });
        // console.log(`socket in action`, socket)
      })
      .catch((err) => {
        console.log(`err.message`, err.message);
        dispatch(likePostFailure(err.message));
      });
  };
};

// COMMENTS
export const newCommmentStart = () => {
  return {
    type: NEW_COMMENT_START,
  };
};
export const newCommmentSuccess = (newComment) => {
  return {
    type: NEW_COMMENT_SUCCESS,
    payload: newComment,
  };
};
export const newCommmentFailure = () => {
  return {
    type: NEW_COMMENT_FAILURE,
  };
};

export const newComment = (comment, postId, socket) => {
  return async (dispatch) => {
    dispatch(newCommmentStart);
    try {
      const res = await api.post("/comment", { comment, postId });
      // console.log(`res.data in newCommmnet`, res.data)
      dispatch(newCommmentSuccess(res.data));
      const notify = {
        type: "commented on your post",
        createdBy: res.data.authorId,
        recipients: [res.data.postAuthor],
        url: `post/${res.data.postId}`,
        read: false,
        createdAt: new Date(),
      };
      res.data.postAuthor !== res.data.authorId &&
        dispatch(createNotify({ notify, socket }));
    } catch (err) {
      console.log(`err new comments:`, err);
      dispatch(newCommmentFailure(err));
    }
  };
};
// LIKE COMMENT
export const likeCommentSuccess = (updatedComment) => {
  return {
    type: LIKE_COMMENT,
    payload: updatedComment,
  };
};

export const likeComment = (commentId) => {
  return async (dispatch) => {
    try {
      const res = await api.put(`/comment/like/${commentId}`);
      // console.log(`res.data`, res.data)
      dispatch(likeCommentSuccess(res.data));
    } catch (err) {
      console.log("error", err.message);
    }
  };
};

// delete post

export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      const deletedPost = await api.delete(`/post/${postId}`);
      console.log(`deletedPost`, deletedPost);
      dispatch({
        type: DELETE_POST,
        payload: postId,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// update post
export const updatePost = (newPost) => {
  return {
    type: UPDATE_POST,
    payload: newPost,
  };
};
