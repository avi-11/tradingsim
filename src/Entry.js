import React, { useState } from "react";
import './index.css';
import {Link} from 'react-router-dom';

const Entry= () => {
    const[contacts,setContacts]=useState();



    return(
         
    <div className="app-container">
        <div className="shade"></div>
        <h1>Crypto Trading Sim</h1>
        <h3>Entry Parameters</h3>
        <table>
            <thead>
                <tr>
                    <th>Indicator</th>
                    <th>Indicator Value</th>
                    <th>Operation</th>
                    <th>Dropdown</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>
                    SMA
                    </th>
                    <th>10</th>
                    <th>Greater</th>
                    <th>0.5</th>
                </tr>
            </tbody>
        </table>
        <h2>ADD RULE</h2>
        <select>
            <option>SMA</option>
            <option>RSI</option>
            <option>Bollinger Band</option>
            <option>ADX</option>
            <option>Pivot Points</option>
            <option>Open Price</option>
            <option>Close Price</option>
            <option>High Price</option>
            <option>Low Price</option>
        </select>
        <Link to="/exit" className="link"> Next</Link>
        <Link to="/" className="link"> Back</Link>
    </div>
    )
}
export default Entry;