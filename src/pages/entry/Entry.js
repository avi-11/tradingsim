import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActionButton from "../../components/button/actionButton/ActionButton";
import Reference from "../../components/button/actionButton/Reference";
import Container from "../../components/container/Container";
import ReferenceInput from "../../components/input/ReferenceInput/ReferenceInput";
import SelectInput from "../../components/input/selectInput/SelectInput";

import styles from "./Entry.module.css";

const Entry = () => {
  const [entryGroups, setEntryGroups] = useState([1]);

  const [showOp, setshowOp] = useState([
    {
      id: 1,
      first: false,
      second: false,
      third: false,
      fourth: false,
      fifth: false,
    },
  ]);

  useEffect(() => {
    console.log(showOp);
  }, [showOp]);

  function addRule(e) {
    e.preventDefault();
    setEntryGroups([...entryGroups, entryGroups.length + 1]);
    const newOption = [
      ...showOp,
      {
        id: entryGroups.length,
        first: false,
        second: false,
        third: false,
        fourth: false,
        fifth: false,
      },
    ];

    setshowOp(newOption);
  }

  function removeRule(e) {
    e.preventDefault();
    if (entryGroups.length > 1) {
      setEntryGroups(entryGroups.slice(0, entryGroups.length - 1));
      const newOption = showOp.slice(0, showOp.length - 1);
      setshowOp(newOption);
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
              <Reference />
              <Reference />
            </div>
            <div>
              <Reference />
              <Reference />
            </div>
            <div>
              <Reference />
              <Reference />
            </div>
          </div>
        </div>
      </div>

      <Container>
        <form className={styles.entry_firstForm}>
          <p>
            <span>Strategy</span>
            <span>Settings</span>
          </p>

          <div>
            <div className={styles.entry__capitalFormGroup}>
              <label>
                <span>Initial Capital</span>
                <input type="number" />
              </label>

              <label>
                <span>Position Size</span>
                <input type="number" />
              </label>
            </div>
            <div className={styles.entry__radioFormGroup}>
              <p>Order Size</p>
              <label>
                <input type="radio" value="long" name="type" />
                <span>LONG</span>
              </label>

              <label>
                <input type="radio" value="short" name="type" />
                <span>SHORT</span>
              </label>
            </div>
          </div>
        </form>
      </Container>

      <Container>
        <h2>ENTRY BUILDER</h2>
        <form>
          <div className={styles.entry__entryFormGroup}>
            {entryGroups.map((entryGroup, index) => (
              <div key={index} className={styles.entryFormGroup__row}>
                <p>Entry Rule {index + 1}</p>

                <ReferenceInput
                  defaultValue="ref. no"
                  option={[1, 2, 3, 4, 5, 6]}
                  index={index}
                  showOp={showOp}
                  setshowOp={setshowOp}
                />

                <>
                  <SelectInput
                    label=""
                    defaultValue="Choose indicator or price"
                    options={[1, 2, 3]}
                  />

                  <input type="text" placeholder="Indicator value" />
                  <SelectInput
                    label=""
                    defaultValue="Add Operation"
                    options={[1, 2, 3]}
                  />
                  <input type="text" />
                </>
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
        <Link to="/">
          <ActionButton
            buttonText="Back To Home"
            textColor="var(--whiteColor)"
            backgroundColor="transparent"
          />
        </Link>

        <Link to="/exit">
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
export default Entry;
