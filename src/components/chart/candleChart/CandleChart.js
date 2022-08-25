import Chart from "react-apexcharts";

function CandleChart({ data, name }) {
  function getDate(props) {
    return props.split("-");
  }

  function formatData(data) {
    let newData = [];

    for (let props in data) {
      const date = getDate(props);
      newData.push({
        x: new Date(date[2], date[1], date[0]),
        y: [data[props][1], data[props][2], data[props][3], data[props][4]],
      });
    }

    return newData;
  }

  var options = {
    chart: {
      type: "candlestick",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  let series = [
    {
      name,
      data: formatData(data),
    },
  ];

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="candlestick"
        // height={500}
        width={"100%"}
      />
    </div>
  );
}

export default CandleChart;
