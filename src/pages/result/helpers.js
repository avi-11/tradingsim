function getDate(props) {
  return props.split("-");
}

const formatNumber = (number) => new Intl.NumberFormat("en-IN").format(number);

export const formatData = (data) => {
  let newData = [];

  for (let props in data) {
    const date = getDate(props);
    newData.push({
      x: new Date(date[2], date[1], date[0]),
      y: [
        data[props]["OpenPrice"],
        data[props]["HighPrice"],
        data[props]["LowPrice"],
        data[props]["ClosePrice"],
      ],
    });
  }
  return newData;
};

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
      // title: {
      //   formatter: function (e) {
      //     return "";
      //   },
      // },
    },
  },
};
