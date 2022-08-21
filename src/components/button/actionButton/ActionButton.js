const buttonStyle = {
  background: "#6966FF",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  boxShadow: "3px 5px 0px #1B1B1B",
  borderRadius: "46px",
  width: "170px",
  height: "40px",
  margin: "1rem 0rem",
};

const ActionButton = ({ buttonText, onClick }) => {
  return (
    <button style={buttonStyle} type="submit" onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default ActionButton;
