import Chart from "react-apexcharts";

function CandleChart({ data, name, options }) {
  let series = [
    {
      name,
      data: data,
    },
  ];

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={500}
        width={"100%"}
      />
    </div>
  );
}

export default CandleChart;
