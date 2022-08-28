import React from "react";

const headStyles = {
  fontFamily: "Play",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "5rem",
  color: "#6FFF62",
  padding: "0",
};
const headStyles_normal = {
  fontFamily: "Play",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "3rem",
  color: "#6FFF62",
  padding: "0",
};

const spanStyles = {
  fontWeight: "700",
  fontSize: "5rem",
  color: "#FFFFFF",
};

const spanStyles_normal = {
  fontWeight: "700",
  fontSize: "3rem",
  color: "#FFFFFF",
};

const logo = {
  position: "absolute",
  top: "1rem",
};

export const LOGO = () => {
  return (
    <div>
      <h1 style={headStyles}>
        0x<span style={spanStyles}>TradingSim</span>
      </h1>
    </div>
  );
};

export const NormalLogo = () => {
  return (
    <div style={logo}>
      <h1 style={headStyles_normal}>
        0x<span style={spanStyles_normal}>TradingSim</span>
      </h1>
    </div>
  );
};
