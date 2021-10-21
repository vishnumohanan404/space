import React from "react";
import { IoPencil } from "react-icons/io5";
import { useSelector } from "react-redux";
import styled from "styled-components";
// import CustomizedDialogs from "../Dialog";
// import EditForm from "../../layouts/EditForm";

function About({handleClose,handleClickOpen,open}) {
  const { user } = useSelector((state) => state.user);
  const { userProfile } = useSelector((state) => state.profile);
  
  return (
    <AboutContainer>
      <IntroText>
        Personal Informations
        {user._id === userProfile._id && (
          <p onClick={handleClickOpen}>
            <IoPencil size={15} />
          </p>
        )}
      </IntroText>
      <AboutBox>
        <ul>
          <li>
            <p>Fullname</p>
            {userProfile.fullName}
          </li>
          <li>
            <p>Email</p>
            {userProfile.email}
          </li>
          {userProfile.phone && (
            <li>
              <p>Phone</p>
              {userProfile.phone}
            </li>
          )}
          {userProfile.age && (
            <li>
              <p>Age</p>
              {userProfile.age?.age}
            </li>
          )}
        </ul>
      </AboutBox>
      {(userProfile.description ||
        userProfile.education ||
        userProfile.work ||
        userProfile.interests ||
        userProfile.livesIn ||
        userProfile.from )&& 
          <>
            <hr />
            <IntroText>
              Bio
              {/* {user._id === userProfile._id && (
          <p>
            <IoPencil size={15} />
          </p>
        )} */}
            </IntroText>
          </>
        }
      <AboutBox>
        <ul>
          {userProfile.description && (
            <li>
              <p>Description</p>
              {userProfile.description}
            </li>
          )}
          {userProfile.education && (
            <li>
              <p>Education</p>
              {userProfile.education}
            </li>
          )}
          {userProfile.work && (
            <li>
              <p>Work</p>
              {userProfile.work}
            </li>
          )}
          {userProfile.interests && (
            <li>
              <p>Interests</p>
              {userProfile.interests}
            </li>
          )}
          {userProfile.livesIn && (
            <li>
              <p>Lives In</p>
              {userProfile.livesIn}
              {/* {userProfile.livesInCountry && userProfile.livesInCountry} */}
            </li>
          )}
          {userProfile.from && (
            <li>
              <p>From</p>
              {userProfile.from}
            </li>
          )}
        </ul>
      </AboutBox>
      
    </AboutContainer>
  );
}

export default About;

const IntroText = styled.h6`
  text-align: center;
  margin: 10px 0;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    margin: 2px;
    padding: 2px 5px 0;
    border-radius: 5px;
    transition: 300ms;
    &:hover {
      background: #a7a6a68d;
      cursor: pointer;
    }
  }
`;

const AboutContainer = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  /* padding-top: 10px; */
  /* margin-top: 1.5%; */
  color: #626262;
`;

const AboutBox = styled.div`
  background: #fff;
  padding: 20px 0;
  /* margin-bottom: 20px; */
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
