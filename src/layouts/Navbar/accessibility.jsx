import React from "react";
import styled from "styled-components";
import {
  IoLogOutOutline,
} from "react-icons/io5";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { logOut } from "../../redux";
import Notifications from "../../components/Notifications";

function Accessibility({ userData, user = userData?.user, logOut }) {
  const socket = useSelector((state) => state.socket);

  const handleLogOut = (e) => {
    socket.emit("ACTIVE", { ...user, active: false });
    socket.emit("LOGOUT", user._id);
    logOut();
  };

  return (
    <AccessibilityContainer>
      {/* <Dropdown>
        <DropdownMenu />
      </Dropdown> */}
      <Notifications />
      <CircularContainer onClick={handleLogOut}>
        <IoLogOutOutline />
      </CircularContainer>
      <Link to={`/profile/${user._id}`}>
        <Avatar src={user.avatar} />
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

const AccessibilityContainer = styled.div`
  display: flex;
  align-items: center;
`;

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
  position: relative;
  &:hover {
    filter: brightness(1.2);
  }
`;
