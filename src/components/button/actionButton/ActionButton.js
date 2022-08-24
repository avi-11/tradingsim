const ActionButton = ({ buttonText, onClick, textColor, backgroundColor }) => {
  const buttonStyle = {
    background: backgroundColor,
    color: textColor,
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "3px 5px 0px #1B1B1B",
    borderRadius: "46px",
    padding: "10px 30px",
    margin: "1rem 0rem",
    width: "16rem",

    fontWeight: "700",
    fontSize: "1rem",
  };

  return (
    <button style={buttonStyle} type="submit" onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default ActionButton;
