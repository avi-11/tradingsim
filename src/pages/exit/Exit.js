import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ActionButton from "../../components/button/actionButton/ActionButton";
import Container from "../../components/container/Container";
import ReferenceInput from "../../components/input/ReferenceInput/ReferenceInput";
import SelectInput from "../../components/input/selectInput/SelectInput";
import EntryReference from "../../components/reference/EntryReference";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "../entry/Entry.module.css";
import { NormalLogo } from "../../components/header/Logo";
import Numberinput from "../../components/input/numberInput/Numberinput";

const Exit = () => {
  const [entryGroups, setEntryGroups] = useState([1]);
  const [entryValues, setEntryValues] = useState([
    {
      id: 1,
      refNumber: "",
    },
  ]);
  const [num, setNum] = useState(1);

  const [exitValuesError, setExitValuesError] = useState(false);

  const navigate = useNavigate();

  function checkIndicatorRange(indicator, indicatorValue) {
    let validRange = true;

    if (indicator === "RSI") {
      if (indicatorValue < 0 || indicatorValue > 100) {
        validRange = false;
      }
    } else if (indicator === "SMA") {
      if (indicatorValue < 0 || indicatorValue > 500) {
        validRange = false;
      }
    } else if (indicator === "ADX") {
      if (indicatorValue < 0 || indicatorValue > 100) {
        validRange = false;
      }
    }

    if (!validRange)
      toast(
        `Indicator value out of range. Ranges are: \n
          1. SMA:- 0 - 500 \n
          2. RSI:- 0 - 100 \n
          3. ADX:- 0 - 100
        `
      );

    return validRange;
  }

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
        } else if (
          !(
            checkIndicatorRange(entry.indicator1, entry.indicatorParameter1) &&
            checkIndicatorRange(entry.indicator2, entry.indicatorParameter2)
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
        } else if (
          !checkIndicatorRange(entry.indicator1, entry.indicatorParameter1)
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
        } else if (
          !checkIndicatorRange(entry.indicator1, entry.indicatorParameter1)
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
        } else if (
          !checkIndicatorRange(entry.indicator2, entry.indicatorParameter2)
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

    if (!valid) setExitValuesError(true);

    return valid;
  }

  function addRule(e) {
    e.preventDefault();

    if (!validatePreviousEntries(entryValues)) {
      toast("Complete Previous Entries!!");
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

  const isCorrect = () => {
    toast("All entries are correct");
  };

  const notCorrect = () => {
    toast("Please fill in all fields with proper values");
  };

  return (
    <div className="app-container">
      <div style={{ position: "relative", bottom: "5rem" }}>
        <Link to="/">
          <NormalLogo />
        </Link>
      </div>
      <ToastContainer draggable={false} autoClose={3000} />
      <div className={styles.entry_upperCard}>
        <div className={styles.entry_infoIcon}>
          <i
            style={{ color: "#00D6A2" }}
            class="fa-solid fa-circle-info fa-2xl"
          ></i>
        </div>
        <div className={styles.entry_referenceBox}>
          <h1 className={styles.entry_Pheads} style={{ padding: "0 1rem" }}>
            Reference Card
          </h1>

          <EntryReference />
        </div>
      </div>

      <Container>
        <h2 className={styles.entry_Pheads}>EXIT BUILDER</h2>
        <form>
          <div className={styles.entry__entryFormGroup}>
            {entryValues.map((entryValue, index) => (
              <div key={entryValue.id} className={styles.entryFormGroup__row}>
                <p
                  className={styles.entry_entryRule_text}
                  style={{
                    color: `${
                      exitValuesError && entryValues.length === index + 1
                        ? "var(--errorColor)"
                        : ""
                    }`,
                  }}
                >
                  Exit Rule {index + 1}
                </p>

                <ReferenceInput
                  defaultValue="ref. no"
                  option={[1, 2, 3, 4, 5, 6]}
                  index={index}
                  setCurrentRef={setCurrentRef}
                />
                {entryValue.refNumber ? (
                  <SelectInput
                    label=""
                    defaultValue={
                      isIndicator(entryValue.refNumber)
                        ? "Choose Indicator"
                        : "Choose Price"
                    }
                    options={
                      isIndicator(entryValue.refNumber)
                        ? ["SMA", "RSI", "ADX"]
                        : ["Open", "Close", "High", "Low"]
                    }
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
                    className={styles.entry_input_indicator}
                    placeholder="Indicator value"
                    value={entryValue.indicatorParameter1}
                    min={1}
                    max={
                      entryValue.indicator1
                        ? entryValue.indicator1 === "SMA"
                          ? 500
                          : entryValue.indicator1 === "RSI"
                          ? 100
                          : entryValue.indicator1 === "ADX"
                          ? 100
                          : 1
                        : 1
                    }
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
                    defaultValue={
                      entryValue.refNumber === "1" ||
                      entryValue.refNumber === "4"
                        ? "Choose Indicator"
                        : "Choose Price"
                    }
                    options={
                      entryValue.refNumber === "1" ||
                      entryValue.refNumber === "4"
                        ? ["SMA", "RSI", "ADX"]
                        : ["Open", "Close", "High", "Low"]
                    }
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
                  isValue(entryValue.refNumber) ? (
                    <Numberinput
                      placeholder="Enter Value"
                      onChange={(e) =>
                        setEntryValues(
                          entryValues.map((value) => {
                            if (value.id === entryValue.id)
                              return { ...value, value: e.target.value };
                            return value;
                          })
                        )
                      }
                    />
                  ) : (
                    <input
                      placeholder={"Indicator Value"}
                      className={styles.entry_input_indicator}
                      type="text"
                      onChange={(e) =>
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
                      min={1}
                      max={
                        entryValue.indicator1
                          ? entryValue.indicator1 === "SMA"
                            ? 500
                            : entryValue.indicator1 === "RSI"
                            ? 100
                            : entryValue.indicator1 === "ADX"
                            ? 100
                            : 1
                          : 1
                      }
                    />
                  )
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
              onClick={(e) => {
                setExitValuesError(false);
                addRule(e);
              }}
              textColor="var(--whiteColor)"
              backgroundColor="var(--brandColor)"
            />
            <ActionButton
              buttonText={"Delete Rule"}
              onClick={(e) => {
                setExitValuesError(false);
                removeRule(e);
              }}
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
            setExitValuesError(false);
            if (validatePreviousEntries(entryValues)) {
              localStorage.setItem("exitValues", JSON.stringify(entryValues));
              isCorrect();
              setTimeout(() => {
                navigate("/result");
              }, 3000);
            } else if (!validatePreviousEntries(entryValues)) {
              setExitValuesError(true);
              notCorrect();
            } else {
              notCorrect();
            }
          }}
        />
      </div>
      {/* <div className="shade"></div> */}
    </div>
  );
};
export default Exit;
