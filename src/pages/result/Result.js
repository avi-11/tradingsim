import { Link } from "react-router-dom";
import Container from "../../components/container/Container";
import ActionButton from "../../components/button/actionButton/ActionButton";

function Result() {
  return (
    <div>
      <Container>
        <h2 style={{ textAlign: "center" }}>Chart</h2>
        <div style={{ height: "10vh" }}></div>
      </Container>

      <Container>
        <h2 style={{ textAlign: "center" }}>Statistics</h2>
        <div style={{ height: "10vh" }}></div>
      </Container>

      <Link to="/exit">
        <ActionButton
          buttonText="Back To Exit Params"
          textColor="var(--whiteColor)"
          backgroundColor="transparent"
        />
      </Link>
      {/* <div className="shade"></div> */}
    </div>
  );
}
export default Result;
