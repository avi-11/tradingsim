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
      <select disabled={disabled} required defaultValue={defaultValue}>
        <option placeholder={placeholder} disabled>
          {defaultValue}
        </option>
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
