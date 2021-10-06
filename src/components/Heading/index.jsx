import React from "react";
import styled from "styled-components";
import { HeadingStyle } from "../../layouts/common";
import { connect } from "react-redux";

function Heading({ title, color, socket,button }) {
  return (
    <HeadingContainer style={{ color: color }} onClick={()=>socket.emit("join_room","1")}>
      <HeadingStyle>{title}</HeadingStyle>
      
        {button}
    
    </HeadingContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    socket: state.socket
  };
};

export default connect(mapStateToProps)(Heading);


const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

const Anchor = styled.a`
  font-size: 12px;
  align-items: center;
  background: #3535fd6c;
  color: #fff;
  padding: 0 5px;
  border-radius: 30px;
`;
