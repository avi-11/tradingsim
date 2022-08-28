const SelectInput = ({
  defaultValue,
  options,
  label,
  placeholder,
  disabled,
}) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <select
        required
        defaultValue={defaultValue}
        onChange={(e) => setValue(e.target.value)}
      >
        <option disabled></option>

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
