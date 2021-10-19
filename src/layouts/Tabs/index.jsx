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
  }, [profile.userProfile]);

  return (
    <TabsContainer>
      {tab === 0 && <Slider tab={tab}></Slider>}
      <Tab onClick={(e) => handleTab(e.target.innerHTML)}>Posts</Tab>
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
`;

const Tab = styled.li`
  margin: 0;
  padding: 0 20px 5px;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
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
    (props.tab === 4 && "54%")};
`;
