import React from "react";
import './App.css';
import NumberFormat from "react-number-format";
import {Link} from 'react-router-dom';
function Result() {
    return( 
    <div>
        <div className="shade"></div>
        <h1>Crypto Trading Sim</h1>
                <h3>Report</h3>
                <Link to="/" className="link"> Back</Link>
              </div>
    
    )
}
export default Result;