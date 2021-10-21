import { AccountBox } from "./pages/Auth";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import React, { useEffect } from "react";
import { socketConnect } from "./redux/socket/SocketActions";
import { useDispatch, useSelector } from "react-redux";
import { updateActive } from "./redux/chat/chatActions";
import { authVerify } from "./redux";
import FallbackUI from "./components/Fallback";
// import Home from "./pages/Home";
// import SinglePost from "./pages/SinglePost";
// import NavRouter from "./components/NavRouter/NavRouter";
// import Profile from "./pages/Profile";

const LazyHome = React.lazy(() => import("./pages/Home"));
const LazyProfile = React.lazy(() => import("./pages/Profile"));
const LazySinglePost = React.lazy(() => import("./pages/SinglePost"));
const LazyNavRouter = React.lazy(() =>
  import("./components/NavRouter/NavRouter")
);

function App() {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket);
  const { user } = useSelector((state) => state.user);
  console.log("Initial render of App.js");
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    user && dispatch(authVerify());
  }, [user, dispatch]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    if (socket && user) {
      socket.emit("ACTIVE", user);
    }
  }, [socket, user]);

  useEffect(() => {
    socket &&
      socket.on("UPDATE_ACTIVE", (user) => {
        dispatch(updateActive(user));
      });
    return () => socket && socket.off("UPDATE_ACTIVE");
  }, [socket, dispatch]);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <React.Suspense fallback={<FallbackUI/>}>
            <Route path="/login" exact>
              {user ? <Redirect to="/" /> : <AccountBox />}
            </Route>
            <Route exact path="/">
              {user ? (
                <>
                  <LazyNavRouter exactly component={LazyHome} pattern="/" />
                </>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route exact path="/profile/:id">
              {user ? (
                <>
                  <LazyNavRouter exactly component={LazyProfile} pattern="/" />
                </>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route exact path="/post/:id">
              {user ? (
                <>
                  <LazyNavRouter
                    exactly
                    component={LazySinglePost}
                    pattern="/"
                  />
                </>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
          </React.Suspense>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
