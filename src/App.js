import styled from "styled-components";
import { AccountBox } from "./pages/Auth";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Navbar } from "./layouts/Navbar";
import SearchBar from "./components/SearchBar";

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 8em;
`;

function App() {
  return (
    <BrowserRouter>
      {/* <LoginContainer>
          <AccountBox />
        </LoginContainer> */}
      <Navbar />

      <SearchContainer>
        <SearchBar/>
      </SearchContainer>
    </BrowserRouter>
  );
}

export default App;
