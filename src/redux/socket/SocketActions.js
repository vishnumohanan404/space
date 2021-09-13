import { SOCKET, SOCKET_CLOSE } from "./SocketTypes";
import io from "socket.io-client";


// connection and disconnection 
export const socketOpen = (socket)=>{
  return {
    type: SOCKET, payload:socket
  }
}

export const socketClose = ()=>{
  return {
    type: SOCKET_CLOSE
  }
}

export const socketConnect = () => {
  return (dispatch) => {
    const socket = io.connect("http://localhost:5000");
    console.log(socket,"docket")
    dispatch(socketOpen(socket));
  };
};

export const socketDisconnect = (socket)=>{
  return (dispatch)=>{
    socket && socket.disconnect()
    dispatch(socketClose())
  }
}

