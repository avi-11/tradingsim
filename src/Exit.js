import React from "react";
import './App.css';
import NumberFormat from "react-number-format";
import {Link} from 'react-router-dom';
function Exit() {
    return( 
    <div>
        <h1>Crypto Trading Sim</h1>
        <div className="exit-parameters">
                <h3>EXIT PARAMETERS</h3>
                <div className="input-field">
                  <label>Stop price</label>
                  <NumberFormat thousandSeparator={true} />
                </div>
                <div className="input-field">
                  <label>Exit rule</label>
                  <NumberFormat thousandSeparator={true} id="brokerage" />
                </div>
                <Link to="/result" className="link"> Next</Link>
                <Link to="/Entry" className="link"> Back</Link>
              </div>
    </div>
    )
}
export default Exit;