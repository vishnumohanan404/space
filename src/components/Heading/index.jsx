import React from "react";
import styled from "styled-components";
import { HeadingStyle } from "../../layouts/common";

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

function Heading({ title, color, href, hrefContent }) {
  return (
    <HeadingContainer style={{ color: color }}>
      <HeadingStyle>{title}</HeadingStyle>
      <Anchor> {hrefContent}</Anchor>
    </HeadingContainer>
  );
}

export default Heading;
