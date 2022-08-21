const GlobalInput = ({ inputType, setValue }) => {
  return (
    <div className="input-field">
      <label style={{ width: "100%" }}>
        Start Date
        <input
          style={{ marginLeft: "1rem" }}
          type={inputType}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
    </div>
  );
};

export default GlobalInput;
