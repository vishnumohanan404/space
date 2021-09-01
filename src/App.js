import styled from "styled-components";
import { AccountBox } from "./pages/Auth";
import Home from "./pages/Home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { Navbar } from "./layouts/Navbar";
import SearchBar from "./components/SearchBar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// const SearchContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   margin-top: 8em;
// `;

function App() {
  const { user } = useContext(AuthContext);
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
        {/* home */}
        <Route path="/">
          {user ? (
            <>
              <Navbar />
              <Home />
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
