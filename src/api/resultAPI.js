import axios from "axios";

export const getChartData = async (body) => {
  try {
    const res = await axios.post(
      `https://tradingsim.herokuapp.com/simulate_chartdata`,
      body
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const getResultData = async (body) => {
  try {
    const res = await axios.post(
      `https://tradingsim.herokuapp.com/simulate_report`,
      body
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const getTradeList = async (body) => {
  try {
    const res = await axios.post(
      `https://tradingsim.herokuapp.com/simulate_trade`,
      body
    );
    return res;
  } catch (error) {
    return error;
  }
};
