import React from "react";

const numStyle = {
  background: "#6966FF",
  borderRadius: "5px",
  height: "3rem",
  padding: "1rem",
  fontWeight: "bold",
  margin: "0 1rem",
};

const example = {
  fontFamily: "Inter",
  fontStyle: "italic",
  fontWeight: "300",
  fontSize: "16px",
  color: "#C5C1C1",
};

const Reference = () => {
  return (
    <div style={{ display: "flex", margin: "1rem 0" }}>
      <p style={numStyle}>1</p>
      <div>
        <p>indicator-operator-indicator</p>
        <p style={example}>{"Eg : SMA (50) > SMA (200)"}</p>
      </div>
    </div>
  );
};

export default Reference;
