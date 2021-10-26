import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setTab } from "../../redux/user/UserAction";

function Tabs() {
  const { tab } = useSelector((state) => state.profile);
  const profile = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleTab = (e) => {
    switch (e) {
      case "Posts":
        dispatch(setTab(0));
        break;
      case "About":
        dispatch(setTab(1));
        break;
      case "Friends":
        dispatch(setTab(2));
        break;
      case "Photos":
        dispatch(setTab(3));
        break;
      case "Settings":
        dispatch(setTab(4));
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    return () => {
      dispatch(setTab(0));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.userProfile]);

  return (
    <TabsContainer>
      {tab === 0 && <Slider tab={tab}></Slider>}
      <Tab tab={tab} onClick={(e) => handleTab(e.target.innerHTML)}>
        Posts
      </Tab>
      {tab === 1 && <Slider tab={tab}></Slider>}
      <Tab onClick={(e) => handleTab(e.target.innerHTML)}>About</Tab>
      {tab === 2 && <Slider tab={tab}></Slider>}
      <Tab onClick={(e) => handleTab(e.target.innerHTML)}>Friends</Tab>
      {tab === 3 && <Slider tab={tab}></Slider>}
      <Tab onClick={(e) => handleTab(e.target.innerHTML)}>Photos</Tab>
      {tab === 4 && user._id === profile.userProfile._id && (
        <Slider tab={tab}></Slider>
      )}
      {user._id === profile.userProfile._id && (
        <Tab onClick={(e) => handleTab(e.target.innerHTML)}>Settings</Tab>
      )}
    </TabsContainer>
  );
}

export default Tabs;

const TabsContainer = styled.ul`
  background-color: #fff;
  /* padding: 15px 5px; */
  border-radius: 0 0 6px 6px;
  position: absolute;
  left: 39.5%;
  width: 45.5%;
  top: 32%;
  height: 50px;
  display: flex;
  align-items: center;
  margin-top: 0;
  list-style: none;
  padding: 0;
  @media only screen and (min-width: 400px) {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 13px;
  }
  @media only screen and (min-width: 768px) {
    position: absolute;
    left: 39.5%;
    width: 45.5%;
    top: 32%;
    font-size: 16px;
  }
  @media only screen and (min-width: 992px) {
    position: absolute;
    left: 39.5%;
    width: 45.5%;
    top: 32%;
    font-size: 16px;
  }
`;

const Tab = styled.li`
  margin: 0;
  padding: 0 20px 5px;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  &:focus-within {
    border-top: 2px solid #000;
  }
  @media only screen and (min-width: 400px) {
  padding: 0 15px 5px;
    
  }
  @media only screen and (min-width: 768px) {
    padding: 0 20px 5px;

  }
  @media only screen and (min-width: 992px) {
    padding: 0 20px 5px;
  }
`;

const Slider = styled.div`
  display: inline-block;
  width: 90px;
  height: 4px;
  border-radius: 3px;
  background-color: #39bcd3;
  position: absolute;
  /* z-index: 1200; */
  bottom: 0;
  transition: all 0.4s linear;
  left: ${(props) =>
    (props.tab === 0 && " 0%") ||
    (props.tab === 1 && "13%") ||
    (props.tab === 2 && "26%") ||
    (props.tab === 3 && "40%") ||
    (props.tab === 4 && "52%")};
  @media only screen and (min-width: 400px) {
    width: 70px;
    left: ${(props) =>
      (props.tab === 0 && " 0%") ||
      (props.tab === 1 && "16%") ||
      (props.tab === 2 && "36%") ||
      (props.tab === 3 && "54%") ||
      (props.tab === 4 && "75%")};
  }
  @media only screen and (min-width: 768px) {
    left: ${(props) =>
      (props.tab === 0 && " 0%") ||
      (props.tab === 1 && "13%") ||
      (props.tab === 2 && "27%") ||
      (props.tab === 3 && "40%") ||
      (props.tab === 4 && "54%")};
  }
  @media only screen and (min-width: 992px) {
    left: ${(props) =>
      (props.tab === 0 && " 0%") ||
      (props.tab === 1 && "13%") ||
      (props.tab === 2 && "27%") ||
      (props.tab === 3 && "40%") ||
      (props.tab === 4 && "54%")};
  }
`;
