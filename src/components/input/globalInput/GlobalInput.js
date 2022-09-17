const GlobalInput = ({ inputType, setValue, label, style }) => {
  return (
    <div className="input-field">
      <label style={{ width: "100%", ...style }}>
        {label}
        <input
          style={{ marginLeft: "2rem" }}
          type={inputType}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
    </div>
  );
};

export default GlobalInput;
