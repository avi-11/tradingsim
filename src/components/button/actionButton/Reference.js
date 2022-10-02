import { Tooltip } from "@mui/material";
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

const Reference = ({ refNumber, refType, refExample }) => {
  return (
    <div style={{ display: "flex", margin: "1rem 0" }}>
      <Tooltip
        title="This is the reference number for Strategy builder below"
        arrow
      >
        <p style={numStyle}>{refNumber}</p>
      </Tooltip>
      <div>
        <Tooltip title="INDICATOR => There are three above technical indicator VALUE => This no of days in past between 1-250  OPERATOR => used for comparison condition">
          <p>{refType}</p>
        </Tooltip>

        <p style={example}>Eg: {refExample}</p>
      </div>
    </div>
  );
};

export default Reference;
