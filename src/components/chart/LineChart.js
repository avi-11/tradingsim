import { Line } from "react-chartjs-2";

const LineChart = ({ showGraph, data }) => {
  return (
    <div className="chart">
      <label>Metrics</label>
      {showGraph && (
        <div>
          <Line data={data} width={"500px"} height={"250px"} />
        </div>
      )}
    </div>
  );
};

export default LineChart;
