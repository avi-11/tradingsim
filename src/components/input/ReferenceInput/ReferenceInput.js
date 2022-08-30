const ReferenceInput = ({
  defaultValue,
  placeholder,
  option,
  index,
  setCurrentRef,
}) => {
  return (
    <div>
      <select
        required
        onChange={(e) => {
          setCurrentRef(e.target.value, index + 1);
        }}
        defaultValue={defaultValue}
      >
        <option placeholder={placeholder} disabled>
          {defaultValue}
        </option>
        {option.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ReferenceInput;
