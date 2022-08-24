import React from "react";

const number = {
  display: "inline-block",
  position: "relative",
  right: "3.6rem",
  bottom: "2.3rem",
};

const Numbers = ({ num }) => {
  return (
    <div style={{ display: "inline-block" }}>
      <svg height="100" width="100">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="blue"
          stroke-width="3"
          fill="transparent"
        />
      </svg>
      <p style={number}>{num}</p>
    </div>
  );
};

export default Numbers;
