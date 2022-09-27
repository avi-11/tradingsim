function getDate(props) {
  return props.split("-");
}

export const formatNumber = (number) =>
  new Intl.NumberFormat("en-IN").format(number);

export const formatData = (data) => {
  let newData = [];

  for (let props in data) {
    const date = getDate(props);
    newData.push({
      x: new Date(date[2], date[1] - 1, date[0]),
      y: [
        data[props]["OpenPrice"],
        data[props]["HighPrice"],
        data[props]["LowPrice"],
        data[props]["ClosePrice"],
      ],
      description: data[props],
    });
  }
  return newData;
};

export const options = {
  chart: {
    type: "candlestick",
  },
  dataLabels: {
    enabled: true,
    formatter: function (val, options) {
      const signal =
        options.w.config.series[options.seriesIndex].data[
          options.dataPointIndex
        ].description.Signal;

      if (signal === 1) return "Buy";
      else if (signal === -1) return "Sell";
    },
    style: {
      colors: [
        (options) => {
          const signal =
            options.w.config.series[options.seriesIndex].data[
              options.dataPointIndex
            ].description.Signal;
          if (signal === 1) return "#00ff00";
          else if (signal === -1) return "#ff0000";
        },
      ],
    },
    background: {
      enabled: true,
      foreColor: "#fff",
      padding: 2,
      borderRadius: 2,
      borderWidth: 1,
      borderColor: "#fff",
      opacity: 0.9,
    },
  },
  xaxis: {
    type: "datetime",
    tooltip: {
      enabled: true,
    },
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
    labels: {
      formatter: function (value) {
        return formatNumber(value);
      },
    },
  },
  tooltip: {
    custom: undefined,
    x: {
      show: true,
      format: "dd MMM yyyy",
      formatter: undefined,
    },
    y: {
      formatter: function (e, { series, seriesIndex, dataPointIndex, w }) {
        return `<div class="chartTooltip">
          <div>
              <p><span>Open:</span> ${formatNumber(
                w.globals.seriesCandleO[seriesIndex][dataPointIndex]
              )}</p>
              <p><span>Close:</span> ${formatNumber(
                w.globals.seriesCandleC[seriesIndex][dataPointIndex]
              )}</p>
              <p><span>Low:</span> ${formatNumber(
                w.globals.seriesCandleL[seriesIndex][dataPointIndex]
              )}</p>
              <p><span>High:</span> ${formatNumber(
                w.globals.seriesCandleH[seriesIndex][dataPointIndex]
              )}</p>
              </div>
            </div>`;
      },
    },
  },
};
