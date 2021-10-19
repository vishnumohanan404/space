import React from "react";
import styled from "styled-components";
import { FcCalendar, FcNews } from "react-icons/fc";
import { ImSpoonKnife } from "react-icons/im";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import NearbyListing from "../../components/NearbyListing";

export const Nearby = () => {
  let { path, url } = useRouteMatch();
  // const params = useParams()
    // console.log(`url,path`, url,path)
  return (
    <Container>
      {/* <Link
        to={`nearby/events`}
        style={{ textDecoration: "none", color: "#626262" }}
      > */}
        <Item>
          <FcCalendar size={40} />
          <div>Events</div>
        </Item>
      {/* </Link> */}
      {/* <Link
        to={`nearby/news`}
        style={{ textDecoration: "none", color: "#626262" }}
      > */}
        <Item>
          <FcNews size={40} />
          <div>News</div>
        </Item>
      {/* </Link> */}
      {/* <Link
        to={`nearby/restaurants`}
        style={{ textDecoration: "none", color: "#626262" }}
      > */}
        <Item>
          <ImSpoonKnife size={40} />
          <div>Restaurants</div>
        </Item>
      {/* </Link> */}
      {/* <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`nearby/events`} element={<NearbyListing />}/>
      </Switch> */}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  text-decoration: none;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  cursor: pointer;
  margin-bottom: 15px;
  div {
    margin-left: 15px;
  }
`;
