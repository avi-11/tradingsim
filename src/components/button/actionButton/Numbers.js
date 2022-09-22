import React from "react";

const number = {
  display: "inline-block",
  position: "relative",
  right: "3.5rem",
  bottom: "2.5rem",
  fontSize: "24px",
};

const Numbers = ({ num }) => {
  return (
    <div style={{ display: "inline-block" }}>
      <svg height="100" width="100">
        <circle
          cx="50"
          cy="50"
          r="25"
          stroke="blue"
          strokeWidth="3"
          fill="transparent"
        />
      </svg>
      <p style={number}>{num}</p>
    </div>
  );
};

export default Numbers;
