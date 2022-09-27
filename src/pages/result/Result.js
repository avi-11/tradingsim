import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Container from "../../components/container/Container";
import ActionButton from "../../components/button/actionButton/ActionButton";
import { NormalLogo } from "../../components/header/Logo";
import CandleChart from "../../components/chart/candleChart/CandleChart";
import DataTable from "../../components/table/dataTable/DataTable";
import TradeListTable from "../../components/table/tradeListTable/TradeListTable";

import { formatData, options } from "./helpers";
import { getTradeList } from "../../api/resultAPI";

function Result() {
  const graphData = sessionStorage.getItem("graphData");
  const ohlc_data = JSON.parse(graphData);
  const initial_capital = sessionStorage.getItem("initialCapital");
  const position_size = sessionStorage.getItem("positionSize");
  const order_side = sessionStorage.getItem("orderSize");
  const entryValues = sessionStorage.getItem("entryValues");
  const exitValues = sessionStorage.getItem("exitValues");
  const instrumentName = sessionStorage.getItem("instrumentName");

  const [chartData, setChartData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [resultLoading, setResultLoading] = useState(false);
  const [tradeList, setTradeList] = useState([]);
  const [tradeListLoading, setTradeListLoading] = useState(false);

  const [chartError, setChartError] = useState("");
  const [resultError, setResultError] = useState("");
  const [tradeListError, setTradeListError] = useState("");

  useEffect(() => {
    simulateChartData();
  }, []);

  useEffect(() => {
    simulateResultData();
  }, []);

  useEffect(() => {
    simulateTradeList();
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
      toast(error);
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
        toast(resData.Error);
      } else setResultData(resData);
    } catch (error) {
      setResultError(error.message);
      toast(error.message);
    } finally {
      setResultLoading(false);
    }
  };

  const simulateTradeList = async () => {
    setTradeListLoading(true);
    const body = getBody();

    const res = await getTradeList(body);
    const resData = res.data;
    console.log(resData);

    if (res.status !== 200 || resData.Error) {
      const err = resData.Error ? resData.Error : "Unable to fetch trade list";
      toast(err, { type: "error" });
      setTradeListError(err);
    } else {
      setTradeList(resData);
    }
    setTradeListLoading(false);
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
      <ToastContainer />
      <div style={{ position: "relative", bottom: "6rem" }}>
        <Link to="/">
          <NormalLogo />
        </Link>
      </div>
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

      <div
        style={{
          display: "grid",
          gap: "5px",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
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

        <Container>
          <h2 style={{ textAlign: "center" }}>Trade List</h2>
          {!tradeListLoading ? (
            tradeListError ? (
              <h4
                style={{
                  color: "white",
                  textAlign: "center",
                  padding: "1rem 0rem",
                }}
              >
                {tradeListError}
              </h4>
            ) : (
              <div>
                <TradeListTable data={tradeList} />
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
      </div>

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
