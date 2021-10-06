import {
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT,
  // UPDATE_USER
  UPDATE_USER,
  // ACCEPT
  ACCEPT_REQUEST_START,
  ACCEPT_REQUEST_SUCCESS,
  ACCEPT_REQUEST_FAILURE,
  // REJECT
  REJECT_REQUEST_START,
  REJECT_REQUEST_SUCCESS,
  REJECT_REQUEST_FAILURE,
  // UNFRIEND
  UNFRIEND_START,
  UNFRIEND_SUCCESS,
  UNFRIEND_FAILURE,
  SET_ACTIVE,
  // GET_USER
  // GET_USER_START,
  // GET_USER_SUCCESS,
  // GET_USER_FAILURE,
} from "./AuthTypes";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || false,
  isFetching: false,
  error: false,
  requestLoading: false,
  unfriendLoading: false,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // LOGIN
    case LOGIN_START:
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case LOGIN_SUCCESS:
      return {
        user: { ...action.payload.data, active: true },
        friendRequests: [...action.payload.data.friendRequests],
        isFetching: false,
        error: false,
      };
    case LOGIN_FAILURE:
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    // UPDATE_USER
    case UPDATE_USER: {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    }
    case SET_ACTIVE:
      return {
        ...state,
        user: { ...state.user, online: action.payload, active: action.payload },
      };
    // GET_USER
    // case GET_USER_START: {
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    // }
    // case GET_USER_SUCCESS: {
    //   return {
    //     ...state,
    //     user: action.payload,
    //     friendRequests: [...action.payload.friendRequests],
    //     isLoading: false,
    //   };
    // }
    // case GET_USER_FAILURE: {
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };
    // }
    // ACCEPT
    case ACCEPT_REQUEST_START:
      return {
        ...state,
        requestLoading: true,
        error: false,
      };
    case ACCEPT_REQUEST_SUCCESS:
      return {
        ...state,
        requestLoading: false,
        error: false,
        user: action.payload,
      };
    case ACCEPT_REQUEST_FAILURE:
      return {
        ...state,
        requestLoading: false,
        error: false,
      };
    // REJECT
    case REJECT_REQUEST_START:
      return {
        ...state,
        requestLoading: true,
        error: false,
      };
    case REJECT_REQUEST_SUCCESS:
      return {
        ...state,
        requestLoading: false,
        error: false,
        user: action.payload,
      };
    case REJECT_REQUEST_FAILURE:
      return {
        ...state,
        requestLoading: false,
        error: false,
      };
    // UNFRIEND
    case UNFRIEND_START:
      return {
        ...state,
        unfriendLoading: true,
      };
    case UNFRIEND_SUCCESS:
      console.log(`action.payload in unfriend success`, action.payload);
      let newUser = state.user;
      newUser.friends = action.payload.friends;
      console.log(`newUser`, newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return {
        ...state,
        unfriendLoading: false,
        user: newUser,
      };
    case UNFRIEND_FAILURE:
      return {
        ...state,
        unfriendLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
