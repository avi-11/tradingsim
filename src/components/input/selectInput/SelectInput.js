const SelectInput = ({
  defaultValue,
  options,
  label,
  setValue,
  value,
  style,
}) => {
  return (
    <div className="input-field">
      <label style={style}>{label}</label>
      <select
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
