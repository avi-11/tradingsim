const selectedLabelStyle = {
  borderBottom: "4px solid #6966ff",
  fontSize: "0.8rem",
  fontWeight: "400",
  margin: "0rem 1rem",
  height: "1.8rem",
};

const labelStyle = {
  height: "auto",
  borderBottom: "4px solid transparent",
  fontSize: "0.8rem",
  fontWeight: "400",
  margin: "0rem 1rem",
};

const LabelSelector = ({
  values,
  currentValue,
  setValue,
  label,
  info,
  style,
}) => {
  return (
    <div
      style={{
        display: "flex",
        margin: "2rem 4rem",
        position: "relative",
        right: "4rem",
      }}
      className="input-field"
    >
      <label className="tooltip" style={style}>
        {label}
        {info ? (
          <span className="tooltiptext">
            <i
              style={{
                color: "#00D6A2",
                margin: "2rem 14rem",
              }}
              class="fa-solid fa-circle-info fa-xl"
            ></i>
            {info}
            <br></br>
            <br></br>
            <span
              style={{
                color: "black",
                border: "1px solid black",
                padding: "0 1rem",
              }}
            >
              High = close + rand (0-8%)
            </span>
            <br></br>
            <span
              style={{
                color: "black",
                border: "1px solid black",
                padding: "0 1.25rem",
              }}
            >
              Low = close - rand (0-8%)
            </span>
            <br></br>
            <span
              style={{
                color: "black",
                border: "1px solid black",
                padding: "0 1.6rem",
              }}
            >
              Open = rand (low, close)
            </span>
            <br></br>
          </span>
        ) : null}
      </label>
      <div style={{ display: "flex", marginLeft: "1rem" }}>
        {values.map((value) => (
          <label
            style={currentValue === value ? selectedLabelStyle : labelStyle}
            key={value}
          >
            <input
              type="checkbox"
              value={value}
              style={{ display: "none" }}
              onChange={() => setValue(value)}
            />
            {value}
          </label>
        ))}
      </div>
    </div>
  );
};

export default LabelSelector;
