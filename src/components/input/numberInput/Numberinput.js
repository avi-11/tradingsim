import NumberFormat from "react-number-format";

const Numberinput = ({ value, setValue, label, info, style, placeholder }) => {
  const handleChange = (e) => {
    const value = parseFloat(e.target.value.replace(/,/g, ""));
    setValue(value);
  };

  return (
    <div className="input-field">
      {label ? (
        <label className="tooltip" style={{ marginRight: "16px", ...style }}>
          {label}
          {info ? (
            <span className="tooltiptext">
              <i
                style={{
                  color: "#00D6A2",
                  margin: "0 1rem",
                }}
                class="fa-solid fa-circle-info fa-xl"
              ></i>
              {info}
            </span>
          ) : null}
        </label>
      ) : null}
      <NumberFormat
        thousandSeparator={true}
        id="market-price"
        value={value}
        onChange={handleChange}
        placeholder={placeholder ? placeholder : ""}
      />
    </div>
  );
};

export default Numberinput;
