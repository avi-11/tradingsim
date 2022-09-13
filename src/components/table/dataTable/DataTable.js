import styles from "./DataTable.module.css";

export default function DataTable({ data }) {
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

  return (
    <div className={styles.dataTable}>
      <table cellSpacing="0" cellPadding="0">
        <tbody>
          {getArray(data).map((item) => (
            <tr key={item[0]}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
