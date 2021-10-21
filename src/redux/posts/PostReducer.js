import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ON_PROGRESS,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  UPDATE_POST,
  NEW_COMMENT_START,
  NEW_COMMENT_SUCCESS,
  NEW_COMMENT_FAILURE,
  // UPDATE_COMMENT
  // UPDATE_COMMENT,
  LIKE_COMMENT,
  DELETE_POST,
  // GET_SINGLE_POST,
  // LIKE_POST_SUCCESS,
  // LIKE_POST_FAILURE
} from "./PostTypes";

const initialState = {
  isLoading: false,
  addPostLoading: false,
  posts: [],
  error: null,
  progress: false,
  isLiked: null,
  likeLoading: false,
  commentLoading: false,
};

const PostReducer = (state = initialState, action) => {
  // console.log(`action.type in post reducer`, action.type);

  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        posts: [...action.payload],
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };

    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        posts: [action.payload, ...state.posts],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        error: action.payload,
      };
    case ON_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    // LIKE
    case LIKE_POST_REQUEST:
      return {
        ...state,
        likeLoading: false,
      };
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        posts: likePost(state.posts, action.payload),
      };
    case NEW_COMMENT_START:
      return {
        ...state,
        commentLoading: true,
      };
    case NEW_COMMENT_SUCCESS:
      return {
        ...state,
        commentLoading: false,
        posts: addComment(state.posts, action.payload.postId, action.payload),
      };
    case NEW_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: updatePost(state.posts, action.payload.postId, action.payload),
      };
    case LIKE_COMMENT:
      return {
        ...state,
        posts: likeComment(state.posts, action.payload.postId, action.payload),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};

export default PostReducer;

const likePost = (posts, updatedPost) => {
  let newPost = posts.map((post) => {
    if (post._id !== updatedPost._id) return post;
    return {
      ...post,
      likes: [...updatedPost.likes],
    };
  });
  return newPost;
};

const likeComment = (posts, postId, comment) => {
  const newPost = posts.map((item, index) => {
    if (item._id !== postId) return item;
    return {
      ...item,
      // mapping nested array
      comments: item.comments.map((item) => {
        return item._id === comment._id ? comment : item;
      }),
    };
  });
  return newPost;
};

const addComment = (posts, id, comment) => {
  const newData = posts.map((item) =>
    item._id === id ? { ...item, comments: [...item.comments, comment] } : item
  );
  return newData;
};

const updatePost = (posts, id, comment) => {
  const newData = posts.map((item) =>
    item._id === id ? { ...item, comments: [...item.comments, comment] } : item
  );
  return newData;
};

// const likeComment = (posts, postId, comment) => {
// console.log(`likeComment in post reducer`);
//   const testFn = (obj) => {
//     return obj._id === postId;
//   };
//   const postIndex = posts.findIndex(testFn);
// console.log(`posts[postIndex].comments`, posts[postIndex].comments);
//   const commentIndex =
//     posts[postIndex] &&
//     posts[postIndex].comments.findIndex((obj) => obj._id === comment._id);
// console.log(`posts[postIndex].comments`, posts[postIndex].comments[commentIndex]);
// console.log(`comment`, comment)
//   if (commentIndex >= 0 && posts[postIndex].comments[commentIndex])
//     posts[postIndex].comments[commentIndex] = comment;
// console.log(`posts`, posts)
//   const newPost = Array.from(posts);
//   return newPost;
// };

// const likePost = (posts, updatedPost) => {
//   const testFn = (obj) => {
//     return obj._id === updatedPost._id;
//   };
//   let likedPost = posts.findIndex(testFn);
//   if (posts[likedPost]) posts[likedPost].likes = updatedPost.likes;
//   return posts;
// };
