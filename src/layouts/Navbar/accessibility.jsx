import React from "react";
import styled from "styled-components";
import {
  // IoCaretDownOutline,
  IoLogOutOutline,
  IoNotifications,
} from "react-icons/io5";
import Avatar from "../../components/Avatar";
import Dropdown from "../../components/Dropdown";
import DropdownMenu from "../../components/DropdownMenu";
// import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../redux";

const AccessibilityContainer = styled.div`
  display: flex;
  align-items: center;
`;

// const LoginButton = styled.button`
//   border: 0;
//   outline: 0;
//   padding: 8px 1em;
//   color: #fff;
//   font-size: 14px;
//   font-weight: 600;
//   border-radius: 50%;
//   background-color: #6adf76;
//   background-image: linear-gradient(to right, transparent 0%, #009cff 100%);
//   transition: all 240ms ease-in-out;
//   cursor: pointer;

//   &:hover {
//     background-color: #009cff;
//   }
// `;

const CircularContainer = styled.span`
  height: 36px;
  width: 36px;
  background-color: #bbb;
  border-radius: 50%;
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;

  &:hover {
    filter: brightness(1.2);
  }
`;
 
function Accessibility({ userData, user = userData?.user, logOut }) {
  // const { user, isFetching, authError, dispatch } = useContext(AuthContext);
  const handleLogOut = (e) => {
    logOut();
    // dispatch({type:"LOGOUT"})
  };

  return (
    <AccessibilityContainer>
      <Dropdown>
        <DropdownMenu />
      </Dropdown>
      <CircularContainer>
        <IoNotifications />
      </CircularContainer>
      <CircularContainer onClick={handleLogOut}>
        <IoLogOutOutline />
      </CircularContainer>
      <Link to={`/profile/${user._id}`}>
        <Avatar href={"http://localhost:3000/vishnu"} src={user.avatar} />
      </Link>
    </AccessibilityContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => {
      dispatch(logOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Accessibility);
