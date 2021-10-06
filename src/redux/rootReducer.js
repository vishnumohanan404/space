import { combineReducers } from "redux";
import PostReducer from "./posts/PostReducer";
// import DownloadReducer from "./posts/DownloadReducer"
import AuthReducer from "./auth/AuthReducer";
import UserReducer from "./user/UserReducer";
import SocketReducer from "./socket/SocketReducer";
import ChatReducer from "./chat/chatReducer";
import NotificationReducer from "./notifications/NotificationReducer";
import SinglePost from "./singlePost/singleReducer";

const rootReducer = combineReducers({
  posts: PostReducer,
  user: AuthReducer,
  profile: UserReducer,
  socket: SocketReducer,
  conversations: ChatReducer,
  notification: NotificationReducer,
  singlePost: SinglePost,
});

export default rootReducer;
