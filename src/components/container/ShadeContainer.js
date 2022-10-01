const shade1Style = {
  position: "fixed",
  background:
    "linear-gradient(180deg, rgba(31, 31, 255, 0.3) 0%, rgba(51, 102, 153, 0) 63.85%)",
  width: "442px",
  height: "1372px",
  transform: "rotate(-135deg)",
  top: "-300px",
  left: "180px",
};

const shade2Style = {
  position: "fixed",
  background:
    "linear-gradient(180deg, rgba(196, 196, 196, 0.3) 0%, rgba(196, 196, 196, 0) 51.87%)",
  width: "442px",
  height: "1372px",
  transform: "rotate(45deg)",

  top: "-230px",
  right: "0px",
};

function ShadeContainer(props) {
  return (
    <>
      <div style={{ width: "100%", zIndex: "1000", overflowX: "none" }}>
        {props.children}
      </div>
      <div style={shade1Style} className="shade1"></div>
      <div style={shade2Style} className="shade2"></div>
    </>
  );
}

export default ShadeContainer;
