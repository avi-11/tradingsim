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
        margin: "2rem",
        position: "relative",
        right: "1.5rem",
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
                margin: "0 0.5rem",
              }}
              class="fa-solid fa-circle-info fa-xl"
            ></i>
            {info}
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
