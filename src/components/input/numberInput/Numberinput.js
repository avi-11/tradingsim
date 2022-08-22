import NumberFormat from "react-number-format";

const Numberinput = ({ value, setValue }) => {
  return (
    <div className="input-field">
      <label>Market price</label>
      <NumberFormat
        thousandSeparator={true}
        id="market-price"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default Numberinput;
