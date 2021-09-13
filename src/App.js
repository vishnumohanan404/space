import styled from "styled-components";
import { AccountBox } from "./pages/Auth";
import Home from "./pages/Home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Navbar } from "./layouts/Navbar";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import { socketConnect, socketDisconnect } from "./redux/socket/SocketActions";
import { connect, useDispatch, useSelector } from "react-redux";

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App({ userData, user = userData.user }) {
  // const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const {socket} = useSelector((state) => state.socket);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (user) {
      dispatch(socketConnect());
    }
    return () => {
      dispatch(socketDisconnect(socket));
    };
  }, [user]);

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
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

export default connect(mapStateToProps)(App);
