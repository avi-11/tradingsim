import React from "react";

const numStyle = {
  background: "#6966FF",
  borderRadius: "5px",
  height: "3rem",
  padding: "1rem",
  fontWeight: "bold",
  margin: "0 1rem",
};

const exampleS = {
  fontFamily: "Inter",
  fontStyle: "italic",
  fontWeight: "300",
  fontSize: "16px",
  color: "#C5C1C1",
};

const Reference = ({ num, type, example }) => {
  return (
    <div style={{ display: "flex", margin: "1rem 0" }}>
      <p style={numStyle}>{num}</p>
      <div>
        <p>{type}</p>
        <p style={exampleS}>Eg : {example}</p>
      </div>
    </div>
  );
};

export default Reference;
