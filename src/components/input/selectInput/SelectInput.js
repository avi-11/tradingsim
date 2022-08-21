const SelectInput = () => {
  return (
    <div className="input-field">
      <label>Instrument</label>
      <select required defaultValue={""}>
        <option disabled></option>
        <option>BTC</option>
        <option>ETH</option>
      </select>
    </div>
  );
};

export default SelectInput;
