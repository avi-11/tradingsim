import { useState } from "react";
import { Link } from "react-router-dom";
import ActionButton from "../../components/button/actionButton/ActionButton";
import SelectInput from "../../components/input/selectInput/SelectInput";

import styles from "./Entry.module.css";

const Entry = () => {
  const [entryGroups, setEntryGroups] = useState([1]);

  function addRule(e) {
    e.preventDefault();
    setEntryGroups([...entryGroups, entryGroups.length + 1]);
  }

  function removeRule(e) {
    e.preventDefault();
    if (entryGroups.length > 1)
      setEntryGroups(entryGroups.slice(0, entryGroups.length - 1));
  }

  return (
    <div className="app-container">
      <div className={styles.formContainer}>
        <h2>ENTRY BUILDER</h2>
        <form>
          <div className={styles.entry__radioFormGroup}>
            <label>
              <input type="radio" value="long" name="type" />
              <span>LONG</span>
            </label>

            <label>
              <input type="radio" value="short" name="type" />
              <span>SHORT</span>
            </label>
          </div>

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

          <div className={styles.entry__entryFormGroup}>
            {entryGroups.map((entryGroup, index) => (
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
            <ActionButton buttonText={"Add Rule"} onClick={addRule} />
            <ActionButton buttonText={"Delete Rule"} onClick={removeRule} />
          </div>
        </form>
      </div>

      <div className={styles.entry__routeBtn}>
        <Link to="/">
          <ActionButton buttonText="Back" />
        </Link>

        <Link to="/exit">
          <ActionButton buttonText="Next" />
        </Link>
      </div>
      {/* <div className="shade"></div> */}
    </div>
  );
};
export default Entry;
