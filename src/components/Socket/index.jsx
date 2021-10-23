import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateActive } from "../../redux/chat/chatActions";
import { socketConnect } from "../../redux/socket/SocketActions";

const Socket = () => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    // console.log("useeffect 3");

    dispatch(socketConnect(user._id));
    return () => {
      if (socket) {
        socket.emit("LOGOUT", user._id);
        socket.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log("useeffect 4");

    socket && socket.on("callback", (data) => console.log(`data${data}`));
    return () => {
      socket && socket.off("callback");
    };
  }, [socket]);

  useEffect(() => {
    // console.log("useeffect 5");

    socket &&
      socket.on("resetPost", () => {
        console.log("reset");
        dispatch(socketConnect());
      });
    return () => socket && socket.off("resetPost");
  }, [socket, dispatch]);

  useEffect(() => {
    // console.log("useeffect 6");

    if (socket && user) {
      socket.emit("JOIN_USER", user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    // console.log("useeffect 7");

    if (socket && user) {
      socket.emit("ACTIVE", user);
    }
  }, [socket, user]);

  useEffect(() => {
    // console.log("useeffect 8");

    socket &&
      socket.on("UPDATE_ACTIVE", (user) => {
        dispatch(updateActive(user));
        console.log("update");
      });
    return () => socket && socket.off("UPDATE_ACTIVE");
  }, [socket, dispatch]);
  return <div></div>;
};

export default Socket;
