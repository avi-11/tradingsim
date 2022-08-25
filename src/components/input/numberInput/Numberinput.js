import NumberFormat from "react-number-format";

const Numberinput = ({ value, setValue }) => {
  const handleChange = (e) => {
    const value = parseFloat(e.target.value.replace(/,/g, ""));
    setValue(value);
  };

  return (
    <div className="input-field">
      <label>Market price</label>
      <NumberFormat
        thousandSeparator={true}
        id="market-price"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Numberinput;
