import "../../index.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

import "react-datepicker/dist/react-datepicker.css";

import styles from "./Home.module.css";
import SelectInput from "../../components/input/selectInput/SelectInput";
import Numberinput from "../../components/input/numberInput/Numberinput";
import GlobalInput from "../../components/input/globalInput/GlobalInput";
import LabelSelector from "../../components/input/labelSelector/LabelSelector";
import ActionButton from "../../components/button/actionButton/ActionButton";
import CandleChart from "../../components/chart/candleChart/CandleChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Home() {
  // Updated states
  const [instrumentname, setInstrumentname] = useState("");
  const [closeprice, setClosePrice] = useState(0);
  const [volatility, SetVolatilty] = useState(0);
  const [showGraph, setShowGraph] = useState(false);
  const [startdate, setStartDate] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const updateDate = (date) => {
    const newDate = date.split("-");
    setStartDate(`${newDate[2]}-${newDate[1]}-${newDate[0]}`);
  };

  async function getData(e) {
    e.preventDefault();

    setLoading(true);
    if (!(instrumentname === "BTC" || instrumentname === "ETH")) {
      setError("Invalid instrument name");
      alert("Invalid instrument name");
      setLoading(false);
      return;
    }
    if (!closeprice || !volatility || !startdate) {
      setError("Check all fields");
      alert("Check all fields");
      setLoading(false);
      return;
    }

    const res = await axios.post(
      `https://tradingsim.herokuapp.com/simulate_price?instrumentname=${instrumentname}&closeprice=${closeprice}&volatility=${
        volatility === "High" ? 0.08 : volatility === "Medium" ? 0.06 : 0.03
      }&startdate=${startdate}`
    );
    setGraphData(res.data);
    setLoading(false);
    setShowGraph(true);
  }

  return (
    <div className="container">
      <div className={styles.header}>
        <div>
          <i
            style={{ color: "#00D6A2" }}
            class="fa-solid fa-circle-info fa-2xl"
          ></i>
        </div>
        <h1 className={styles.info_header}>
          Select a ticker and current market conditions along with the expected
          volatility conditions. Higher volatility will lead to greater
          fluctuations in the forecasted market prices.
        </h1>
      </div>
      <form action="/" onSubmit={getData}>
        <div className="form-first">
          <div className="details-personal">
            <div className={styles.formField__grid}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <SelectInput
                  defaultValue={instrumentname}
                  setValue={setInstrumentname}
                  options={["BTC", "ETH"]}
                  label="Intrument"
                />

                <LabelSelector
                  values={["High", "Medium", "Low"]}
                  currentValue={volatility}
                  setValue={SetVolatilty}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <Numberinput
                  value={closeprice}
                  setValue={setClosePrice}
                  label="Market price"
                />

                <GlobalInput
                  inputType="date"
                  value={startdate}
                  setValue={updateDate}
                />
              </div>

              <ActionButton
                buttonText="Simulate Price"
                onClick={getData}
                textColor="var(--whiteColor)"
                backgroundColor="var(--brandColor)"
              />
            </div>
          </div>
        </div>
      </form>

      <div className="details-ID">
        {showGraph ? (
          <CandleChart data={graphData} name={instrumentname} />
        ) : loading ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : (
          <></>
        )}
      </div>

      <Link
        to="/entry"
        className="link"
        style={{ position: "relative", left: "80%" }}
      >
        <ActionButton
          buttonText="Create Entries"
          textColor="var(--whiteColor)"
          backgroundColor="var(--brandColor)"
        />
      </Link>

      {/* <div className="shade"></div> */}
    </div>
  );
}

export default Home;
