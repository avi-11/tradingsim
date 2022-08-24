import React from "react";

const headStyles = {
  fontFamily: "Play",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "5rem",
  color: "#6FFF62",
  padding: "0",
};

const spanStyles = {
  fontWeight: "700",
  fontSize: "5rem",
  color: "#FFFFFF",
};

const LOGO = () => {
  return (
    <div>
      <h1 style={headStyles}>
        0x<span style={spanStyles}>TradingSim</span>
      </h1>
    </div>
  );
};

export default LOGO;
