import React from "react";
import NumberFormat from "react-number-format";
import "./App.css";
import { useState, useEffect } from "react";
import MadeData from "./Data";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [quantitySize, setQuantitySize] = useState("");
  const [position, setPosition] = useState("");
  const [positionSize, setPositionSize] = useState("");
  const [capital, setCapital] = useState(0);
  const [marketPrice, setMarketPrice] = useState(0);
  const [volatility, SetVolatilty] = useState(0);
  const [showGraph, setShowGraph] = useState(false);
  const [graphRan, setGraphRan] = useState([]);
  const [alertPositionSize, setalertPositionSize] = useState(false);
  const [submitValidate, setSubmitValidate] = useState(false);
  const [chartsToDisplay, setChartsToDisplay] = useState([]);
  const[selectedDate,setSelectedDate]=useState(null);
  const[labels,setLabels]=useState([]);

  const getData = async () => {
    const charts = [];
    charts.push(<ChartJS key={1} data={MadeData} />);
    setChartsToDisplay(charts);
  };

  useEffect(() => {
    getData();
  }, []);
  const getRndInteger = (min, max) => {
    //console.log(Math.floor(Math.random() * (max - min + 1) ) + min);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const ShowGraph = () => {
    let range = [];
    let mp = parseInt(marketPrice.replace(/,/g, ""));
    let a = mp - mp * volatility;
    let b = mp + mp * volatility;
    console.log(a + " " + b);
    for (let i = 0; i < 12; i++) {
      range.push(getRndInteger(a, b));
    }
    setShowGraph(true);
    
    //console.log(range);
  };
  const validateSubmit = () => {
    if (positionSize > 100) {
      setSubmitValidate(false);
      setalertPositionSize(true);
      setTimeout(() => {
        setalertPositionSize(false);
      }, 3000);
    } else {
      setSubmitValidate(true);
    }
  };
  const formatToCurrency = (amount) => {
    amount = parseInt(amount);
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  const handleInputChange = (event) => {
    console.log(event.target.name);

    let mp = Number(marketPrice.replace(/,/g, ""));
    let cap = Number(capital.replace(/,/g, ""));

    if (event.target.name === "position") {
      // After updating position
      const positionValue = Number(position);
      let posSize = positionValue / cap;
      console.log(posSize, positionValue, mp, cap);
      setPositionSize(posSize);
      let quant = positionValue / mp;
      setQuantitySize(quant.toFixed(2));
    } else if (event.target.name === "positionSize") {
      // After updating position size
      const positionSizeValue = Number(positionSize);
      let pos = (positionSizeValue * cap) / 100;
      console.log(pos, positionSizeValue, mp, cap);
      setPosition(pos);
      let quant = pos / mp;
      setQuantitySize(quant.toFixed(2));
    } else if (event.target.name === "quantitySize") {
      // After updating quantity size
      const quantityValue = Number(quantitySize);
      let pos = quantityValue * mp;
      console.log(pos, quantityValue, mp, cap);
      setPosition(pos);
      let posSize = pos / cap;
      setPositionSize(posSize);
    }
  };
  const getApi=() => {
    axios.post('http://tradingsim.herokuapp.com/price')
    .then(res => {
      console.log(Object.keys(res.data.ClosePrice));
        console.log(res.data.ClosePrice);
        setGraphRan(Object.values(res.data.ClosePrice));
        setLabels(Object.keys(res.data.ClosePrice));
    }
    ).catch(err => {
      console.log(err);
    })
  }

  const data = {
    labels: [
      ...labels
    ],
    datasets: [
      {
        label: "Simulator",
        data: [...graphRan],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div className="container">
      <form
        action="/"
        onSubmit={(e) => {
          e.preventDefault();
          validateSubmit();
          if (submitValidate) {
            ShowGraph();
          }
        }}
      >
        <div className="form-first">
          <div className="details-personal">
            <span className="title">Trading Simulator</span>

            <div className="fields">
              <div className="input-field">
                <label>Instrument</label>
                <select required>
                  <option disabled selected></option>
                  <option>BTC</option>
                  <option>ETH</option>
                </select>
              </div>

              <div className="input-field">
                <label>Market price</label>
                <NumberFormat
                  thousandSeparator={true}
                  id="market-price"
                  value={marketPrice}
                  onChange={(e) => {
                    setMarketPrice(e.target.value);
                  }}
                />
              </div>

              <div className="input-field">
                <label>Capital</label>
                <NumberFormat
                  thousandSeparator={true}
                  onChange={(e) => {
                    setCapital(e.target.value);
                  }}
                />
              </div>

              <div className="input-field">
                <label>Position size(IN %)</label>
                <input
                  type="number"
                  id="position-size"
                  name="positionSize"
                  onBlur={handleInputChange}
                  onChange={(e) => setPositionSize(e.target.value)}
                  value={positionSize}
                />

                {alertPositionSize && alert("Enter a valid position size")}
              </div>

              <div className="input-field">
                <label>Qty-size</label>
                <input
                  type="decimal"
                  id="quantity-size"
                  name="quantitySize"
                  onBlur={handleInputChange}
                  onChange={(e) => setQuantitySize(e.target.value)}
                  value={quantitySize}
                />
              </div>

              <div className="input-field">
                <label>Position</label>
                <NumberFormat
                  
                  thousandSeparator={true}
                  onBlur={handleInputChange}
                  onChange={(e) => setPosition(e.target.value)}
                  value={Number(position) ? Number(position) : ""}
                />
              </div>
              <div className="input-field">
                <label>Market volatility</label>
                <select
                  value={volatility}
                  onChange={(e) => {
                    SetVolatilty(e.target.value);
                  }}
                >
                  <option selected></option>
                  <option value={0.8}>High</option>
                  <option value={0.4}>Medium</option>
                  <option value={0.2}>Low</option>
                </select>
                <label>Date</label>
              {/* <Datepicker selected={selectedDate} onChange={date => setSelectedDate(date)} /> */}
              <input type="date" onChange={e =>setSelectedDate(e.target.value)} />
              
              </div>
              <div className="input-field">
                </div>
              <button type="submit" className="nextBtn" onClick={getApi}>
              <span className="btnText">Simulate</span>
              <i className="uil uil-navigator"></i>
            </button>
            </div>
          </div>

          {/* Work Here */}

          <div className="details-ID">
            <div className="detail">
              <div className="details-inner">
              <div className="entry-parameters">
                <h3>ENTRY PARAMETERS</h3>
                <div className="input-field">
                  <label>Trigger price</label>
                  <NumberFormat thousandSeparator={true} className="Trigger"/>
                </div>
                <div className="input-field">
                  <label>Limit price</label>
                  <NumberFormat thousandSeparator={true} className="Trigger"/>
                </div>
                <button type="submit" className="nextBtn" >
                  <span className="btnText">Build Entries</span>
                </button>
              </div>

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
                <button type="submit" className="nextBtn">
                  <span className="btnText">Build Exit</span>
                </button>
              </div>

              </div>
              <div className="how-to">
                <h2>How to</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque nisl eros, pulvinar facilisis justo mollis, auctor
                                                </p>
              </div>
            </div>

            <div className="input-field">
              <label>Order side</label>
              <select required>
                <option disabled selected></option>
                <option>LONG</option>
                <option>SHORT</option>
              </select>
            </div>
            

            
            <div className="input-field">
              <label>Metrics</label>
              {showGraph && (
                <div>
                  <Line data={data} width={"1000px"} height={"500px"} />
                </div>
              )}
            </div>
             
               {/* <div className="chart">{chartsToDisplay.map(item => item)}</div>   */}
          </div>
        </div>

        {/* <button className="submit">
          <span className="btnText"></span>
          <i className="uil uil-navigator"></i>
        </button> */}
      </form>

      {/* <div className="shade"></div> */}
    </div>
  );
}

export default App;
