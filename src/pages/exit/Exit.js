import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ActionButton from "../../components/button/actionButton/ActionButton";
import Container from "../../components/container/Container";
import ReferenceInput from "../../components/input/ReferenceInput/ReferenceInput";
import SelectInput from "../../components/input/selectInput/SelectInput";
import EntryReference from "../../components/reference/EntryReference";

import styles from "../entry/Entry.module.css";

const Exit = () => {
  const [entryGroups, setEntryGroups] = useState([1]);
  const [entryValues, setEntryValues] = useState([
    {
      id: 1,
      refNumber: "",
    },
  ]);
  const [num, setNum] = useState(1);

  const navigate = useNavigate();

  function validatePreviousEntries(entryValues) {
    let valid = true;

    entryValues.forEach((entry) => {
      if (entry.refNumber === "1") {
        if (
          !(
            entry.indicator1 &&
            entry.indicator2 &&
            entry.indicatorParameter1 &&
            entry.indicatorParameter2 &&
            entry.operator
          )
        ) {
          valid = false;
        }
      } else if (entry.refNumber === "2") {
        if (
          !(
            entry.indicator1 &&
            entry.indicatorParameter1 &&
            (entry.price1 || entry.price2) &&
            entry.operator
          )
        ) {
          valid = false;
        }
      } else if (entry.refNumber === "3") {
        if (
          !(
            entry.indicator1 &&
            entry.indicatorParameter1 &&
            entry.value &&
            entry.operator
          )
        ) {
          valid = false;
        }
      } else if (entry.refNumber === "4") {
        if (
          !(
            entry.price1 &&
            entry.indicator2 &&
            entry.indicatorParameter2 &&
            entry.operator
          )
        ) {
          valid = false;
        }
      } else if (entry.refNumber === "5") {
        if (!(entry.price1 && entry.price2 && entry.operator)) {
          valid = false;
        }
      } else if (entry.refNumber === "6") {
        if (!(entry.price1 && entry.value && entry.operator)) {
          valid = false;
        }
      } else {
        valid = false;
      }
    });

    return valid;
  }

  function addRule(e) {
    e.preventDefault();

    if (!validatePreviousEntries(entryValues)) {
      alert("Complete Previous Entries!!");
      return;
    }

    setEntryGroups([...entryGroups, entryGroups.length + 1]);
    setEntryValues([...entryValues, { id: entryValues.length + 1 }]);
    setNum(num + 1);
  }

  function removeRule(e) {
    e.preventDefault();
    if (entryGroups.length > 1) {
      setEntryGroups(entryGroups.slice(0, entryGroups.length - 1));
      setEntryValues(entryValues.slice(0, entryValues.length - 1));
    }
  }

  function setCurrentRef(e, id) {
    const newEntryValue = entryValues.map((value) => {
      if (value.id === id)
        return {
          ...value,
          refNumber: e,
        };
      return value;
    });

    setEntryValues(newEntryValue);
  }

  function isIndicator(refNumber) {
    if (refNumber === "1" || refNumber === "2" || refNumber === "3")
      return true;
    return false;
  }

  function isValue(refNumber) {
    if (refNumber === "3" || refNumber === "6") return true;
    return false;
  }

  function setIndicatorOne(e, value) {
    const newEntryValue = entryValues.map((entryValue) => {
      if (entryValue.id === value.id)
        return {
          ...entryValue,
          indicator1: e,
        };
      return entryValue;
    });

    setEntryValues(newEntryValue);
  }

  function setPriceOne(e, value) {
    const newEntryValue = entryValues.map((entryValue) => {
      if (entryValue.id === value.id) return { ...entryValue, price1: e };
      return entryValue;
    });

    setEntryValues(newEntryValue);
  }

  function setIndicatorTwo(e, value) {
    const newEntryValue = entryValues.map((entryValue) => {
      if (entryValue.id === value.id)
        return {
          ...entryValue,
          indicator2: e,
        };
      return entryValue;
    });

    setEntryValues(newEntryValue);
  }

  function setPriceTwo(e, value) {
    const newEntryValue = entryValues.map((entryValue) => {
      if (entryValue.id === value.id) return { ...entryValue, price2: e };
      return entryValue;
    });

    setEntryValues(newEntryValue);
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

          <EntryReference />
        </div>
      </div>

      <Container>
        <h2>EXIT BUILDER</h2>
        <form>
          <div className={styles.entry__entryFormGroup}>
            {entryValues.map((entryValue, index) => (
              <div key={entryValue.id} className={styles.entryFormGroup__row}>
                <p>Entry Rule {index + 1}</p>

                <ReferenceInput
                  defaultValue="ref. no"
                  option={[1, 2, 3, 4, 5, 6]}
                  index={index}
                  setCurrentRef={setCurrentRef}
                />
                {entryValue.refNumber ? (
                  <SelectInput
                    label=""
                    defaultValue="Choose indicator or price"
                    options={[1, 2, 3]}
                    value={entryValue}
                    setValue={
                      isIndicator(entryValue.refNumber)
                        ? setIndicatorOne
                        : setPriceOne
                    }
                  />
                ) : (
                  <></>
                )}

                {entryValue.refNumber === "1" ||
                entryValue.refNumber === "2" ||
                entryValue.refNumber === "3" ? (
                  <input
                    type="number"
                    placeholder="Indicator value"
                    value={entryValue.indicatorParameter1}
                    onChange={(e) =>
                      setEntryValues(
                        entryValues.map((value) => {
                          if (value.id === entryValue.id)
                            return {
                              ...value,
                              indicatorParameter1: e.target.value,
                            };
                          return value;
                        })
                      )
                    }
                  />
                ) : (
                  <></>
                )}

                {entryValue.refNumber ? (
                  <SelectInput
                    label=""
                    defaultValue="Add Operation"
                    options={[">", "<", "="]}
                    value={entryValue}
                    setValue={(e) =>
                      setEntryValues(
                        entryValues.map((value) => {
                          if (value.id === entryValue.id)
                            return { ...value, operator: e };
                          return value;
                        })
                      )
                    }
                  />
                ) : (
                  <></>
                )}

                {entryValue.refNumber !== "3" &&
                entryValue.refNumber !== "6" &&
                entryValue.refNumber ? (
                  <SelectInput
                    label=""
                    defaultValue="Choose indicator or price"
                    options={[1, 2, 3]}
                    value={entryValue}
                    setValue={
                      entryValue.refNumber === "1" ||
                      entryValue.refNumber === "4"
                        ? setIndicatorTwo
                        : setPriceTwo
                    }
                  />
                ) : (
                  <></>
                )}

                {entryValue.refNumber !== "2" &&
                entryValue.refNumber !== "5" &&
                entryValue.refNumber ? (
                  <input
                    placeholder={
                      isValue(entryValue.refNumber)
                        ? "Enter value"
                        : "Indicator Value"
                    }
                    type="text"
                    onChange={
                      isValue(entryValue.refNumber)
                        ? (e) =>
                            setEntryValues(
                              entryValues.map((value) => {
                                if (value.id === entryValue.id)
                                  return { ...value, value: e.target.value };
                                return value;
                              })
                            )
                        : (e) =>
                            setEntryValues(
                              entryValues.map((value) => {
                                if (value.id === entryValue.id)
                                  return {
                                    ...value,
                                    indicatorParameter2: e.target.value,
                                  };
                                return value;
                              })
                            )
                    }
                  />
                ) : (
                  <></>
                )}
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
            buttonText="Back To Entries"
            textColor="var(--whiteColor)"
            backgroundColor="transparent"
          />
        </Link>

        <ActionButton
          buttonText="Submit"
          textColor="var(--whiteColor)"
          backgroundColor="var(--brandColor)"
          onClick={(e) => {
            e.preventDefault();
            if (validatePreviousEntries(entryValues)) {
              navigate("/result");
            } else {
              alert("Please fill all fields");
            }
          }}
        />
      </div>
      {/* <div className="shade"></div> */}
    </div>
  );
};
export default Exit;
