const SelectInput = ({ defaultValue, options, label }) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <select required defaultValue={defaultValue}>
        <option disabled>{defaultValue}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
