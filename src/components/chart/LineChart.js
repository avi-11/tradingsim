import { Line } from "react-chartjs-2";

const LineChart = ({ showGraph, data, labels }) => {
  const chartData = {
    labels: [...labels],
    datasets: [
      {
        label: "Simulator",
        data: [data],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div className="chart">
      <label>Metrics</label>
      {showGraph && (
        <div>
          <Line data={chartData} width={"500px"} height={"250px"} />
        </div>
      )}
    </div>
  );
};

export default LineChart;
