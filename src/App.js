import styled from "styled-components";
import { AccountBox } from "./pages/Auth";
import Home from "./pages/Home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Navbar } from "./layouts/Navbar";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import { socketConnect, socketDisconnect } from "./redux/socket/SocketActions";
import { connect, useDispatch, useSelector } from "react-redux";
import Chat from "./layouts/Chat";
import SinglePost from "./pages/SinglePost";

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  // const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    console.log(`user app.js`, user);
    dispatch(socketConnect(user._id));
    return () => {
      if (socket) {
        console.log(`emitt`);
        socket.emit("LOGOUT", user._id);
        socket.disconnect();
      }
    };
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
  }, [socket]);

  useEffect(() => {

    if (socket && user) {
      console.log(`joinUser`);
      socket.emit("joinUser", user);
    }
  }, [socket, user?._id]);

  useEffect(() => {
    console.log(`Notification`, Notification.permission)
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") {console.log(`Notification permision already granted`)}
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          console.log(`Notification permision granted`)
        }else if(permission === "denied"){
          console.log(`Notification permission denied`)
        }
      });
    }
  },[])

  useEffect(() => {

    if (socket && user) {
      console.log(`active`);
      socket.emit("ACTIVE", user);
    }
  }, [socket, user]);

  useEffect(() => {
    socket &&
      socket.on("resetPost", () => {
        console.log("reset in2nd useEff");
        dispatch(socketConnect());
      });
    return () => socket && socket.off("resetPost");
  }, [socket, dispatch]);
  return (
    <BrowserRouter>
      <Switch>
        {/* login page */}
        <Route path="/login" exact>
          {user ? (
            <Redirect to="/" />
          ) : (
            <LoginContainer>
              <AccountBox />
            </LoginContainer>
          )}
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
    </BrowserRouter>
  );
}

export default App;
