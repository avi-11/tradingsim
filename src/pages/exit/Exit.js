import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActionButton from "../../components/button/actionButton/ActionButton";
import Reference from "../../components/button/actionButton/Reference";
import Container from "../../components/container/Container";
import ReferenceInput from "../../components/input/ReferenceInput/ReferenceInput";
import SelectInput from "../../components/input/selectInput/SelectInput";

import styles from "../entry/Entry.module.css";

const Exit = () => {
  const [exitGroups, setExitGroups] = useState([1]);
  const [numExit, setNumExit] = useState(1);

  const [showOpExit, setshowOpExit] = useState([
    {
      id: 1,
      first: false,
      second: false,
      third: false,
      fourth: false,
      fifth: false,
      ref: false,
    },
  ]);

  useEffect(() => {
    console.log(showOpExit);
  }, [showOpExit]);

  function addRule(e) {
    e.preventDefault();
    setExitGroups([...exitGroups, exitGroups.length + 1]);
    setNumExit(numExit + 1);
    const newOption = [
      ...showOpExit,
      {
        id: numExit + 1,
        first: false,
        second: false,
        third: false,
        fourth: false,
        fifth: false,
        ref: false,
      },
    ];

    setshowOpExit(newOption);
  }

  function removeRule(e) {
    e.preventDefault();
    if (exitGroups.length > 1) {
      setExitGroups(exitGroups.slice(0, exitGroups.length - 1));
      const newOption = showOpExit.slice(0, showOpExit.length - 1);
      setshowOpExit(newOption);
    }
  }

  return (
    <div className="app-container">
      <div className={styles.entry_upperCard}>
        <div className={styles.entry_infoIcon}>
          <i
            style={{ color: "#00D6A2" }}
            class="fa-solid fa-circle-info fa-2xl"
          ></i>
        </div>
        <div className={styles.entry_referenceBox}>
          <h1 style={{ padding: "0 1rem" }}>Reference Card</h1>
          <div className={styles.entry_reference}>
            <div>
              <Reference
                num="1"
                type="indicator-operator-indicator"
                example="SMA (50) > SMA (200)"
              />
              <Reference
                num="2"
                type="indicator-operator-price"
                example="SMA (50) > close"
              />
            </div>
            <div>
              <Reference
                num="3"
                type="indicator-operator-value"
                example="SMA (50) > 75.5"
              />
              <Reference
                num="4"
                type="price-operator-indicator"
                example="close > SMA (50)"
              />
            </div>
            <div>
              <Reference
                num="5"
                type="price-operator-price"
                example="close > high"
              />
              <Reference
                num="6"
                type="price-operator-value"
                example="close > 75.5"
              />
            </div>
          </div>
        </div>
      </div>

      <Container>
        <h2>EXIT BUILDER</h2>
        <form>
          <div className={styles.entry__entryFormGroup}>
            {exitGroups.map((exitGroup, index) => (
              <div key={index} className={styles.entryFormGroup__row}>
                <p>Exit Rule {index + 1}</p>

                <ReferenceInput
                  defaultValue="ref. no"
                  option={[1, 2, 3, 4, 5, 6]}
                  index={index}
                  showOp={showOpExit}
                  setshowOp={setshowOpExit}
                />

                <SelectInput
                  disabled={!showOpExit[index]?.first}
                  label=""
                  defaultValue="Choose indicator or price"
                  options={[1, 2, 3]}
                />

                <input
                  disabled={!showOpExit[index]?.second}
                  type="text"
                  placeholder="Indicator value"
                />

                <SelectInput
                  disabled={!showOpExit[index]?.third}
                  label=""
                  defaultValue="Add Operation"
                  options={[">", "<", "="]}
                />

                <SelectInput
                  disabled={!showOpExit[index]?.fourth}
                  label=""
                  defaultValue="Choose indicator or price"
                  options={[1, 2, 3]}
                />

                <input
                  disabled={!showOpExit[index]?.fifth}
                  placeholder="text"
                  type="text"
                />
              </div>
            ))}

            <div className={styles.entryFormGroup__row}></div>
          </div>

          <div className={styles.entry__editRuleBtn}>
            <ActionButton
              buttonText={"Add Rule"}
              onClick={addRule}
              textColor="var(--whiteColor)"
              backgroundColor="var(--brandColor)"
            />
            <ActionButton
              buttonText={"Delete Rule"}
              onClick={removeRule}
              backgroundColor="var(--whiteColor)"
              textColor="var(--blackColor)"
            />
          </div>
        </form>
      </Container>

      <div className={styles.entry__routeBtn}>
        <Link to="/entry">
          <ActionButton
            buttonText="Back To Home"
            textColor="var(--whiteColor)"
            backgroundColor="transparent"
          />
        </Link>

        <Link to="/result">
          <ActionButton
            buttonText="Submit"
            textColor="var(--whiteColor)"
            backgroundColor="var(--brandColor)"
          />
        </Link>
      </div>
      {/* <div className="shade"></div> */}
    </div>
  );
};
export default Exit;
