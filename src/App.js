import styled from "styled-components";
import { AccountBox } from "./pages/Auth";
import Home from "./pages/Home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Navbar } from "./layouts/Navbar";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import { socketConnect } from "./redux/socket/SocketActions";
import { useDispatch, useSelector } from "react-redux";
import SinglePost from "./pages/SinglePost";
import AuthVerify from "./hooks/authVerify";
import { updateActive } from "./redux/chat/chatActions";

function App() {
  // const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
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
    socket && socket.on("callback", (data) => console.log(`data${data}`));
    return () => {
      socket && socket.off("callback");
    };
  }, [socket]);

  useEffect(() => {
    socket &&
      socket.on("resetPost", () => {
        console.log("reset");
        dispatch(socketConnect());
      });
    return () => socket && socket.off("resetPost");
  }, [socket, dispatch]);

  useEffect(() => {
    if (socket && user) {
      socket.emit("JOIN_USER", user);
    }
  }, [socket]);

  useEffect(() => {
    if (socket && user) {
      // console.log(`active`);
      socket.emit("ACTIVE", user);
    }
  }, [socket, user]);

  useEffect(() => {
    socket && socket.on("UPDATE_ACTIVE",(user=>{
      dispatch(updateActive(user))
    }))
    return () => socket && socket.off("UPDATE_ACTIVE");
  }, [socket, dispatch])

  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* login page */}
          <Route path="/login" exact>
            {user ? <Redirect to="/" /> : <AccountBox />}
          </Route>
          <Route exact path="/">
            {user ? (
              <>
                <Navbar />
                <Home />
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/profile/:id">
            {user ? (
              <>
                <Navbar />
                <Profile />
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/post/:id">
            {user ? (
              <>
                <Navbar />
                <SinglePost />
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
        <AuthVerify />
      </BrowserRouter>
    </>
  );
}

export default App;

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AnnouncementBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #e84c64;
  span {
    color: blue;
    font-size: 13px;
  }
`;
