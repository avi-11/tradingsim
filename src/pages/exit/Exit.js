import { useState } from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";

import ActionButton from "../../components/button/actionButton/ActionButton";
import SelectInput from "../../components/input/selectInput/SelectInput";
import Container from "../../components/container/Container";

import styles from "../entry/Entry.module.css";

function Exit() {
  const [exitGroups, setExitGroups] = useState([1]);

  function addRule(e) {
    e.preventDefault();
    setExitGroups([...exitGroups, exitGroups.length + 1]);
  }

  function removeRule(e) {
    e.preventDefault();
    if (exitGroups.length > 1)
      setExitGroups(exitGroups.slice(0, exitGroups.length - 1));
  }

  return (
    <div>
      <Container>
        <h2>EXIT BUILDER</h2>
        <form>
          <div className={styles.entry__entryFormGroup}>
            {exitGroups.map((entryGroup, index) => (
              <div key={index} className={styles.entryFormGroup__row}>
                <p>Entry Rule {index + 1}</p>
                <SelectInput
                  label=""
                  defaultValue="Choose indicator or price"
                  options={[1, 2, 3]}
                />

                <input type="text" placeholder="Indicator value" />
                <SelectInput
                  label=""
                  defaultValue="Add Operatio"
                  options={[1, 2, 3]}
                />
                <input type="text" />
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
              textColor="var(--blackColor)"
              backgroundColor="var(--whiteColor)"
            />
          </div>
        </form>
      </Container>

      <div className={styles.entry__routeBtn}>
        <Link to="/entry">
          <ActionButton
            buttonText="Back To Entries"
            textColor="var(--whiteColor)"
            backgroundColor="transparent"
          />
        </Link>

        <Link to="/result">
          <ActionButton
            buttonText="Simulate Trades"
            textColor="var(--whiteColor)"
            backgroundColor="var(--brandColor)"
          />
        </Link>
      </div>
    </div>
  );
}
export default Exit;
