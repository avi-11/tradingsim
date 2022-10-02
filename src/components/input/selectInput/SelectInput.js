const SelectInput = ({
  defaultValue,
  options,
  label,
  info,
  setValue,
  value,
  style,
}) => {
  return (
    <div className="input-field">
      <label className="tooltip" style={style}>
        {label}
        {info ? (
          <span className="tooltiptext">
            <i
              style={{
                color: "#00D6A2",
                margin: "0 1rem",
              }}
              class="fa-solid fa-circle-info fa-xl "
            ></i>
            {info}
          </span>
        ) : null}
      </label>
      <select
        defaultValue={defaultValue}
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
