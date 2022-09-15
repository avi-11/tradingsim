import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "../../components/container/Container";
import ActionButton from "../../components/button/actionButton/ActionButton";
import CandleChart from "../../components/chart/candleChart/CandleChart";
import DataTable from "../../components/table/dataTable/DataTable";

import { formatData } from "./helpers";
import { options } from "../home/helpers";

function Result() {
  const graphData = localStorage.getItem("graphData");
  const ohlc_data = JSON.parse(graphData);
  const initial_capital = localStorage.getItem("initialCapital");
  const position_size = localStorage.getItem("positionSize");
  const order_side = localStorage.getItem("orderSize");
  const entryValues = localStorage.getItem("entryValues");
  const exitValues = localStorage.getItem("exitValues");
  const instrumentName = localStorage.getItem("instrumentName");

  const [chartData, setChartData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [resultLoading, setResultLoading] = useState(false);

  const [chartError, setChartError] = useState("");
  const [resultError, setResultError] = useState("");

  useEffect(() => {
    simulateChartData();
  }, []);

  useEffect(() => {
    simulateResultData();
  }, []);

  const simulateChartData = async () => {
    setChartLoading(true);
    const body = getBody();

    try {
      const res = await axios.post(
        `https://tradingsim.herokuapp.com/simulate_chartdata`,
        body
      );
      const resData = res.data;
      if (resData.Error) {
        setChartError(resData.Error);
        setChartLoading(false);
        return;
      }
      setChartData(resData);
    } catch (error) {
      alert(error);
    }

    setChartLoading(false);
  };

  const simulateResultData = async () => {
    setResultLoading(true);
    const body = getBody();

    try {
      const res = await axios.post(
        `https://tradingsim.herokuapp.com/simulate_report`,
        body
      );
      const resData = res.data;
      if (resData.Error) {
        setResultError(resData.Error);
        setResultLoading(false);
        return;
      }
      setResultData(resData);
    } catch (error) {
      alert(error);
    }

    setResultLoading(false);
  };

  const getBody = () => ({
    ohlc_data,
    initial_capital,
    position_size,
    order_side: 0,
    buycriteria: getCriteria(JSON.parse(entryValues)),
    sellcriteria: getCriteria(JSON.parse(exitValues)),
  });

  const getCriteria = (entryValues) => {
    const criteria = {};

    entryValues.forEach((entry, index) => {
      if (entry.refNumber === "1")
        criteria[`C${index + 1}`] = {
          Indicator: entry.indicator1,
          Ind_parameter: entry.indicatorParameter1,
          Operator: entry.operator,
          Indicator2: entry.indicator2,
          Ind_parameter2: entry.indicatorParameter2,
        };
      else if (entry.refNumber === "2")
        criteria[`C${index + 1}`] = {
          Indicator: entry.indicator1,
          Ind_parameter: entry.indicatorParameter1,
          Operator: entry.operator,
          Price: entry.price2 + "Price",
        };
      else if (entry.refNumber === "3")
        criteria[`C${index + 1}`] = {
          Indicator: entry.indicator1,
          Ind_parameter: entry.indicatorParameter1,
          Operator: entry.operator,
          Value: entry.value,
        };
      else if (entry.refNumber === "4")
        criteria[`C${index + 1}`] = {
          Price: entry.price1 + "Price",
          Operator: entry.operator,
          Indicator: entry.indicator2,
          Ind_parameter: entry.indicatorParameter2,
        };
      else if (entry.refNumber === "5")
        criteria[`C${index + 1}`] = {
          Price: entry.price1 + "Price",
          Operator: entry.operator,
          Price2: entry.price2 + "Price",
        };
      else if (entry.refNumber === "6")
        criteria[`C${index + 1}`] = {
          Price: entry.price1 + "Price",
          Operator: entry.operator,
          Value: entry.value,
        };
    });

    return criteria;
  };

  return (
    <div>
      <Container>
        <h2 style={{ textAlign: "center" }}>Chart</h2>
        {!chartLoading ? (
          chartError ? (
            <h4
              style={{
                color: "white",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              {chartError}
            </h4>
          ) : (
            <div>
              <CandleChart
                data={formatData(chartData)}
                name={instrumentName ? instrumentName : ""}
                options={options}
              />
            </div>
          )
        ) : (
          <h4
            style={{
              color: "white",
              textAlign: "center",
              padding: "1rem 0rem",
            }}
          >
            Loading ...
          </h4>
        )}
      </Container>

      <Container>
        <h2 style={{ textAlign: "center" }}>Statistics</h2>
        {!resultLoading ? (
          resultError ? (
            <h4
              style={{
                color: "white",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              {resultError}
            </h4>
          ) : (
            <div>
              <DataTable data={resultData.Strategy} />
            </div>
          )
        ) : (
          <h4
            style={{
              color: "white",
              textAlign: "center",
              padding: "1rem 0rem",
            }}
          >
            Loading ...
          </h4>
        )}
      </Container>

      <Link to="/exit">
        <ActionButton
          buttonText="Back To Exit Params"
          textColor="var(--whiteColor)"
          backgroundColor="transparent"
        />
      </Link>
      {/* <div className="shade"></div> */}
    </div>
  );
}
export default Result;
