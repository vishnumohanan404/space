import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logOutCall } from "../redux";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

class AuthVerify extends Component {
  constructor(props) {
    super(props);

    props.history.listen(() => {
      const user = JSON.parse(localStorage.getItem("accessToken"));
      console.log(`user`, user);
      if (user) {
        const decodedJwt = parseJwt(user.accessToken);

        if (decodedJwt.exp * 1000 < Date.now()) {
          props.logOut();
        }
      }
    });
  }

  render() {
    return <div></div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOutCall()),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(AuthVerify));
