const RadioButton = ({ label, value, name, setValue }) => {
  return (
    <label>
      <input
        type="radio"
        value={value}
        name={name}
        onChange={(e) => setValue(e.target.checked ? value : "")}
      />
      <span>{label}</span>
    </label>
  );
};

export default RadioButton;
