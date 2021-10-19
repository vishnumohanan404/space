import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

const NearbyListing = () => {
  let { topicId } = useParams();
  return <div>{topicId}</div>;
};

export default NearbyListing;
