const containerStyles = {
  width: "100%",
  border: "1px solid var(--borderColor)",
  borderRadius: "10px",
  padding: "16px 24px",
  margin: "1rem 0rem",
};

function Container(props) {
  return (
    <div style={containerStyles}>
      {Array.isArray(props.children)
        ? props.children.map((child) => child)
        : props.children}
    </div>
  );
}

export default Container;
