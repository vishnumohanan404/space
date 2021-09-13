import { SOCKET, SOCKET_CLOSE } from "./SocketTypes";

const SocketReducer = (state = false, action) => {
  switch (action.type) {
    case SOCKET:
      return action.payload;
    case SOCKET_CLOSE:
      return false;
    default:
      return state;
  }
};

export default SocketReducer;
