import styles from "../dataTable/DataTable.module.css";

function TradeListTable({ data }) {
  const getArray = (data) => {
    if (Array.isArray(data)) {
      return data;
    } else {
      let newData = [];
      for (let key in data) {
        newData.push([key, data[key]]);
      }
      return newData;
    }
  };

  console.log(getArray(data));

  return (
    <div className={styles.dataTable} style={{ overflow: "scroll" }}>
      <table cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Instrument Name</th>
            <th>Open Price</th>
            <th>High Price</th>
            <th>Low Price</th>
            <th>Close Price</th>
            <th>SMA 10</th>
            <th>SMA 5</th>
            <th>Position</th>
            <th>Capital</th>
            <th>Position Size</th>
            <th>Total Margin</th>
            <th>Quantity</th>
            <th>Used margin</th>
            <th>Signal</th>
            <th>Order Side</th>
          </tr>
        </thead>
        <tbody>
          {getArray(data).map((item) => (
            <tr key={item[0]}>
              <td>{item[0]}</td>
              {getArray(item[1]).map((item) => (
                <td>{item[1]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TradeListTable;
