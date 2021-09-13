import { combineReducers } from "redux";
import PostReducer from "./posts/PostReducer";
// import DownloadReducer from "./posts/DownloadReducer"
import AuthReducer from "./auth/AuthReducer";
import UserReducer from "./user/UserReducer";
import SocketReducer from "./socket/SocketReducer";

const rootReducer = combineReducers({
  posts: PostReducer,
  user: AuthReducer,
  profile: UserReducer,
  socket: SocketReducer,
});

export default rootReducer;
