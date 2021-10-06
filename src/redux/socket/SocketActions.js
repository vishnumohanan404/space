import { SOCKET, SOCKET_CLOSE } from "./SocketTypes";
import io from "socket.io-client";

// connection and disconnection
export const socketOpen = (socket) => {
  return {
    type: SOCKET,
    payload: socket,
  };
};

export const socketClose = () => {
  return {
    type: SOCKET_CLOSE,
  };
};

export const socketConnect = (userId) => {
  return async (dispatch) => {
    const socket = await io.connect(`http://localhost:5000/?userId=${userId}`);
    dispatch(socketOpen(socket));
  };
};

export const socketDisconnect = (socket,userId) => {
  return (dispatch) => {
    // socket.disconnect(userId);
    socket.emit("LOGOUT",userId);
    // dispatch(socketClose());
  };
};
