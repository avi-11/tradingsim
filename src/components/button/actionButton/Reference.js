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


const Reference = ({ refNumber, refType, refExample }) => {
  return (
    <div style={{ display: "flex", margin: "1rem 0" }}>
      <p style={numStyle}>{refNumber}</p>
      <div>
        <p>{refType}</p>
        <p style={example}>Eg: {refExample}</p>
      </div>
    </div>
  );
};

export default Reference;
