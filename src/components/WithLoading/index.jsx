import React from "react";
import Skeleton from 'react-loading-skeleton';

function WithLoading(Component) {
    console.log("withload")
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (<Skeleton count={10 }/>);
  };
}
export default WithLoading;
