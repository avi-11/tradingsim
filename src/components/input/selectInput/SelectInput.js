const SelectInput = ({ defaultValue, options, label, setValue, value }) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <select
        required
        defaultValue={defaultValue}
        onChange={(e) => setValue(e.target.value, value)}
      >
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
