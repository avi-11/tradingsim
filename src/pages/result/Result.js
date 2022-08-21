import React from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
function Result() {
  return (
    <div>
      <div className="shade"></div>
      <h3>Report</h3>
      <Link to="/" className="link">
        {" "}
        Back
      </Link>
    </div>
  );
}
export default Result;
