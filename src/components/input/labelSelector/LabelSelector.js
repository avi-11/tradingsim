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

const LabelSelector = ({ values, currentValue, setValue }) => {
  return (
    <div style={{ display: "flex", marginTop: "15px" }} className="input-field">
      <label>Market Volatility</label>
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
