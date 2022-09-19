import NumberFormat from "react-number-format";

const Numberinput = ({ value, setValue, label, style, placeholder }) => {
  const handleChange = (e) => {
    const value = parseFloat(e.target.value.replace(/,/g, ""));
    setValue(value);
  };

  return (
    <div className="input-field">
      {label ? (
        <label style={{ marginRight: "16px", ...style }}>{label}</label>
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
