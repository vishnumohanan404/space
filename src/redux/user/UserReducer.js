import {
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  // friends request
  FRIEND_REQUEST_START,
  FRIEND_REQUEST_SUCCESS,
  FRIEND_REQUEST_FAILURE,
  // request details
  GET_REQUEST_DETAILS_START,
  GET_REQUEST_DETAILS_SUCCESS,
  GET_REQUEST_DETAILS_FAILURE,
} from "./UserType";

const initialState = {
  isLoading: false,
  userProfile: false,
  error: false,
  posts: [],
  request: false,
  friendRequestLoading: false,
  friendRequestError: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    // get profile
    case GET_PROFILE_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PROFILE_SUCCESS:
      let request = action.payload.profile.friendRequests.includes(
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
    default:
      return state;
  }
};

export default UserReducer;

