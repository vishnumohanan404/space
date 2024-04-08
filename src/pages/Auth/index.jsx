import React, { useState } from "react";
import styled from "styled-components";
import LoginForm from "../../layouts/LoginForm";
import { AccountContext } from "../../context/AccountBox";
import { SignupForm } from "../../layouts/SignupForm";
import { Box, Card } from "@radix-ui/themes";

export function AccountBox(props) {
  const [active, setActive] = useState("signin");

  const switchToSignup = () => {
    setActive("signup");
  };

  const switchToSignin = () => {
    setActive("signin");
  };

  const contextValue = { switchToSignup, switchToSignin };

  return (
    <AccountContext.Provider value={contextValue}>
      <InnerContainer>
        {active === "signin" && <LoginForm />}
        {active === "signup" && <SignupForm />}
      </InnerContainer>
    </AccountContext.Provider>
  );
}

// styled components

const InnerContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.8em;
  margin-top: 0;
`;
