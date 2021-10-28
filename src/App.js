import { AccountBox } from "./pages/Auth";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import FallbackUI from "./components/Fallback";
import Socket from "./components/Socket";
import { Navbar } from "./layouts/Navbar";

// lazy loading 
const LazyHome = React.lazy(() => import("./pages/Home"));
const LazyProfile = React.lazy(() => import("./pages/Profile"));
const LazySinglePost = React.lazy(() => import("./pages/SinglePost"));
const LazyConversations = React.lazy(() => import("./pages/Conversations"));

function App() {
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("useeffect 1");
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  
  console.log("Initial render of App.js");

  return (
    <>
      <BrowserRouter>
        <Socket />
        {user && <Navbar />}
        <Switch>
          <React.Suspense fallback={<FallbackUI />}>
            <Route path="/login" exact>
              {user ? <Redirect to="/" /> : <AccountBox />}
            </Route>
            <Route exact path="/">
              {user ? (
                <>
                  {/* <LazyNavRouter exactly component={LazyHome} pattern="/" /> */}
                  <LazyHome />
                </>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route exact path="/profile/:id">
              {user ? (
                <>
                  <LazyProfile />
                  {/* <LazyNavRouter exactly component={LazyProfile} pattern="/" /> */}
                </>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route exact path="/post/:id">
              {user ? (
                <>
                  {/* <LazyNavRouter
                    exactly
                    component={LazySinglePost}
                    pattern="/"
                  /> */}
                  <LazySinglePost />
                </>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route exact path="/conversations/">
              {user ? (
                <>
                  {/* <LazyNavRouter
                    exactly
                    component={LazyConversations}
                    pattern="/"
                  /> */}
                  <LazyConversations />
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
