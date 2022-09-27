import styles from "../dataTable/DataTable.module.css";
import { formatNumber } from "../../../pages/result/helpers";

function TradeListTable({ data }) {
  const header = [
    "Date",
    "Open",
    "High",
    "Low",
    "Close",
    "Instrument Name",
    "Position",
    "Capital",
    "Total Margin",
    "Quantity",
    "Used Margin",
    "Order Side",
    "Realized Profit",
  ];

  return (
    <div className={styles.dataTable2} style={{ overflow: "scroll" }}>
      <table cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            {header.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Date}</td>
              <td>{formatNumber(item.OpenPrice)}</td>
              <td>{formatNumber(item.HighPrice)}</td>
              <td>{formatNumber(item.LowPrice)}</td>
              <td>{formatNumber(item.ClosePrice)}</td>
              <td>{item.InstrumentName}</td>
              <td>{item.Position}</td>
              <td>{formatNumber(item.Capital)}</td>
              <td>{formatNumber(item.TotalMargin)}</td>
              <td>{item.Qty}</td>
              <td>{formatNumber(item.UsedMargin)}</td>
              <td>{item.Order_Side}</td>
              <td>{formatNumber(item.RealizedProfit)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TradeListTable;
