import {
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  // ON_PROGRESS
  ON_PROGRESS,
  // friends request
  FRIEND_REQUEST_START,
  FRIEND_REQUEST_SUCCESS,
  FRIEND_REQUEST_FAILURE,
  // CLEAR_USER
  CLEAR_USER,
  // UPDATE_PROFILE
  UPDATE_PROFILE,
  // LIKE_POST_SUCCESS
  LIKE_POST_SUCCESS,
  // LIKE_COMMENT
  LIKE_COMMENT,
  // TAB
  TAB,
  NEW_COMMENT_SUCCESS,
  UPDATE_PROFILE_INFO,
  UPDATE_PROFILE_LOADING,
  // ACCEPT REQUEST
  // ACCEPT_REQUEST_START,
  // ACCEPT_REQUEST_SUCCESS,
  // ACCEPT_REQUEST_FAILURE
  // request details
  // GET_REQUEST_DETAILS_START,
  // GET_REQUEST_DETAILS_SUCCESS,
  // GET_REQUEST_DETAILS_FAILURE,
} from "./UserType";

const initialState = {
  isLoading: false,
  userProfile: false,
  error: false,
  posts: [],
  request: false,
  friendRequestLoading: false,
  friendRequestError: false,
  tab: 0,
  updateLoading: false,
};

const UserReducer = (state = initialState, action) => {
  // console.log(`action.type in user reducer`, action.type);
  // console.log(`action.payload`, action.payload);
  switch (action.type) {
    // get profile
    case GET_PROFILE_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PROFILE_SUCCESS:
      const request = action.payload.profile.friendRequests?.includes(
        action.payload.user
      );
      return {
        ...state,
        isLoading: false,
        userProfile: action.payload.profile,
        posts: [...action.payload.profile.userPosts],
        error: false,
        request: request,
      };
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    // ON PROGRESS
    case ON_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    // friend request
    case FRIEND_REQUEST_START:
      return {
        ...state,
        friendRequestLoading: true,
      };
    case FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        friendRequestLoading: false,
        request: !state.request,
      };
    case FRIEND_REQUEST_FAILURE:
      return {
        ...state,
        friendRequestLoading: false,
        friendRequestError: action.payload,
      };
    // CLEAR_USER
    case CLEAR_USER:
      return {
        isLoading: false,
        userProfile: false,
        error: false,
        posts: [],
        request: false,
        friendRequestLoading: false,
        friendRequestError: false,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        userProfile: action.payload.profile,
        request: !state.request,
      };
    case UPDATE_PROFILE_LOADING:
      return {
        ...state,
        updateLoading: action.payload,
      };
    case UPDATE_PROFILE_INFO:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          fullName: action.payload.fullName,
          phone: action.payload.phone,
          email: action.payload.email,
          age: action.payload.age,
          description: action.payload.description,
          education: action.payload.education,
          work: action.payload.work,
          from: action.payload.from,
          livesIn: action.payload.livesIn,
          livesInCountry: action.payload.livesInCountry,
          fromCountry: action.payload.fromCountry,
        },
      };
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        posts: likePost(state.posts, action.payload),
      };
    // case NEW_COMMENT_SUCCESS:
    //   console.log(`newCom`);
    //   return {
    //     ...state,
    //     posts: addComment(state.posts, action.payload.postId, action.payload),
    //   };
    case NEW_COMMENT_SUCCESS:
      // console.log(`newCom in user reducer`);
      return {
        ...state,
        posts: addComment(state.posts, action.payload.postId, action.payload),
      };
    case LIKE_COMMENT:
      return {
        ...state,
        posts: likeComment(state.posts, action.payload.postId, action.payload),
      };
    // TAB
    case TAB:
      return {
        ...state,
        tab: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
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
  // console.log(`addComment in post reducer`);
  const newData = posts.map((item) =>
    item._id === id ? { ...item, comments: [...item.comments, comment] } : item
  );
  return newData;
};

// const likePost = (posts, updatedPost) => {
//   const testFn = (obj) => {
//     return obj._id === updatedPost._id;
//   };
//   let likedPost = posts.findIndex(testFn);
// console.log(`likedPost`, likedPost)
// console.log(`posts[likedPost]`, posts[likedPost])
// console.log(`updatedPost.likes`, updatedPost.likes)
//   if (posts[likedPost]) posts[likedPost].likes = updatedPost.likes;
//   return posts;
// };

// const likeComment = (posts, postId, comment) => {
//   console.log(`likeComment in user reducer`, likeComment )
//   const testFn = (obj) => {
//     return obj._id === postId;
//   };
//   const postIndex = posts.findIndex(testFn);
//   console.log(`postIndex`, postIndex);
//   console.log(`posts[postIndex]`, posts[postIndex])
//   const commentIndex =
//     posts[postIndex] &&
//     posts[postIndex].comments.findIndex((obj) => obj._id === comment._id);
//   console.log(`commentIndex`, commentIndex)
//   console.log(`posts[postIndex].comments`, posts[postIndex].comments);
//   console.log(
//     `posts[postIndex].comments[commentIndex]`,
//     posts[postIndex].comments[commentIndex]
//   );

//   if (commentIndex >= 0 && posts[postIndex].comments[commentIndex])
//     posts[postIndex].comments[commentIndex] = comment;
//   return posts;
// };

// const addComment = (posts, id, comment) => {
//   console.log(`addComment in user reducer`, posts, id, comment);
//   const newData = posts.map((item) =>
//     item._id === id ? { ...item, comments: [...item.comments, comment] } : item
//   );
//   return newData;
// };
