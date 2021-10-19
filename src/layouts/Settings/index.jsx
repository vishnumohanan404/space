import React from "react";
import {
  IoBriefcaseOutline,
  IoHomeOutline,
  IoLocationOutline,
  IoMailOutline,
  IoMoonOutline,
  IoRemoveCircleOutline,
  IoSettings,
  IoSettingsOutline,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import styled from "styled-components";

function Settings() {
  const { user } = useSelector((state) => state.user);
  return (
    <SettingsContainer>
      <SettingsBox>
        <IntroText>
          General Settings
          <p>
            <IoSettings />
          </p>
        </IntroText>
        <ul>
          <li>
            <p>
              <IoBriefcaseOutline style={introIconStyles} />
              Fullname
            </p>
            {user.fullName}
          </li>
          <li>
            <p>
              <IoMailOutline style={introIconStyles} />
              Email
            </p>
            {user.email}
          </li>
          {user.location && (
            <li>
              <p>
                <IoLocationOutline style={introIconStyles} />
              </p>
              {user.location}
            </li>
          )}
          {user.home && (
            <li>
              <p>
                <IoHomeOutline style={introIconStyles} />
              </p>
              {user.location}
            </li>
          )}
        </ul>
        <hr />
        <IntroText>
          Other Settings{" "}
          <p>
            <IoSettings />
          </p>
        </IntroText>
        <ul>
          <li>
            <p>
              <IoMoonOutline style={introIconStyles} />
              Dark mode
            </p>
          </li>
          <li>
            <p>
              <IoRemoveCircleOutline style={introIconStyles} />
              Deactivate
            </p>
            Toggle
          </li>
          {user.location && (
            <li>
              <p>
                <IoLocationOutline style={introIconStyles} />
              </p>
              {user.location}
            </li>
          )}
          {user.home && (
            <li>
              <p>
                <IoHomeOutline style={introIconStyles} />
              </p>
              {user.location}
            </li>
          )}
        </ul>
      </SettingsBox>
    </SettingsContainer>
  );
}

export default Settings;

const introIconStyles = { width: "26px", marginRight: "10px" };

const SettingsContainer = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  padding-top: 10px;
  /* margin-top: 1.5%; */
  color: #626262;
`;

const SettingsBox = styled.div`
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  h3 {
    font-weight: 600;
    margin: 0;
  }
  hr {
    border: 0;
    height: 1px;
    background: #ccc;
    margin: 24px 0;
  }
  ul li {
    list-style: none;
    font-size: 15px;
    margin: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  ul li p {
    margin: 0;
    display: flex;
    align-items: center;
  }
  ul {
    padding: 0;
  }
`;
const IntroText = styled.h6`
  text-align: center;
  margin: 10px 0;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* p{
      text-align: right;
  } */
`;
