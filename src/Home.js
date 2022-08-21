import "./index.css";
import { useState, useEffect } from "react";
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
import SelectInput from "./components/input/selectInput/SelectInput";
import Numberinput from "./components/input/numberInput/Numberinput";
import GlobalInput from "./components/input/globalInput/GlobalInput";
import LabelSelector from "./components/input/labelSelector/LabelSelector";
import ActionButton from "./components/button/actionButton/ActionButton";
import LineChart from "./components/chart/LineChart";

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
  const [selectedDate, setSelectedDate] = useState(null);
  const [labels, setLabels] = useState([]);

  const getData = async () => {
    const charts = [];
    // charts.push(<ChartJS key={1} data={MadeData} />);
    setChartsToDisplay(charts);
  };

  useEffect(() => {
    getData();
  }, []);

  const getRndInteger = (min, max) => {
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

  const getApi = () => {
    axios
      .post("http://tradingsim.herokuapp.com/simulate_price")
      .then((res) => {
        console.log(Object.keys(res.data));
        console.log(res.data);
        const arr = Object.values(res.data).map((x) => x[1]);
        console.log(arr);
        setGraphRan(arr);
        setLabels(Object.keys(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const data = {
    labels: [...labels],
    datasets: [
      {
        label: "Simulator",
        data: [...graphRan],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div className="container">
      <div className={styles.homeDetailContainer}>
        <h2>Home</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum
        </p>
      </div>

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
            <div className={styles.formField__grid}>
              <SelectInput />

              <Numberinput value={marketPrice} setValue={setMarketPrice} />

              <LabelSelector
                values={["High", "Medium", "Low"]}
                currentValue={volatility}
                setValue={SetVolatilty}
              />

              <GlobalInput inputType="date" setValue={setSelectedDate} />
            </div>
          </div>

          <ActionButton buttonText="Simulate Price" onClick={getApi} />
        </div>
      </form>

      <div className="details-ID">
        <LineChart showGraph={showGraph} data={data} />
      </div>

      <Link
        to="/entry"
        className="link"
        style={{ position: "relative", left: "80%" }}
      >
        <ActionButton buttonText="Create Entries" />
      </Link>

      <div className="shade"></div>
    </div>
  );
}

export default Home;
