function getDate(props) {
  return props.split("-");
}

export function formatData(data) {
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

export const options = {
  chart: {
    type: "candlestick",
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

const formatNumber = (number) => new Intl.NumberFormat("en-IN").format(number);
