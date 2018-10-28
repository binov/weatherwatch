import React from "react";

export default props => {
  return <div style={props.errorStyle}>{props.message}</div>;
};
