import React from "react";

export default props => {
  const { cx, cy } = props;
  if (props.payload.outlier) {
    return (
      <circle cx={cx} cy={cy} r={3} stroke="red" strokeWidth={2} fill="red" />
    );
  }
  return null;
};
