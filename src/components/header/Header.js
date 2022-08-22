const containerStyles = {
  textAlign: "center",
  padding: "23px 0px",
  borderBottom: "1px solid rgba(105, 102, 255, 0.5)",
};

const Header = () => {
  return (
    <div style={containerStyles}>
      <h1
        style={{
          padding: "0px",
        }}
      >
        Crypto Trading Sim
      </h1>
    </div>
  );
};

export default Header;
