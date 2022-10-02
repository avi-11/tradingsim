import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ActionButton from "../../components/button/actionButton/ActionButton";
import Container from "../../components/container/Container";
import Numberinput from "../../components/input/numberInput/Numberinput";
import RadioButton from "../../components/input/radioButton/RadioButton";
import EntryReference from "../../components/reference/EntryReference";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Entry.module.css";
import { NormalLogo } from "../../components/header/Logo";
import TradeBuilder from "../../components/tradeBuilder/TradeBuilder";
import Header from "../../components/header/Header";
import { Tooltip } from "@mui/material";

const Entry = () => {
  const [initialCapital, setInitialCapital] = useState("");
  const [positionSize, setPositionSize] = useState("");
  const [orderSize, setOrderSize] = useState("");
  const [entryGroups, setEntryGroups] = useState([1]);
  const [entryValues, setEntryValues] = useState([
    {
      id: 1,
      refNumber: "",
    },
  ]);
  const [num, setNum] = useState(1);

  const [loading, setLoading] = useState(false);
  const [initialCapitalError, setInitialCapitalError] = useState(false);
  const [positionSizeError, setPositionSizeError] = useState(false);
  const [orderSizeError, setOrderSizeError] = useState(false);
  const [entryValuesError, setEntryValuesError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getExitStrategyFromLocalStorage();
  }, []);

  const getExitStrategyFromLocalStorage = () => {
    setLoading(true);
    const appEntryValues = sessionStorage.getItem("entryValues");
    if (appEntryValues) {
      setEntryValues(JSON.parse(appEntryValues));
      setInitialCapital(sessionStorage.getItem("initialCapital"));
      setPositionSize(sessionStorage.getItem("positionSize"));
      setOrderSize("long");
    }
    setLoading(false);
  };

  function validateSettings(initialCapital, positionSize, orderSize) {
    if (initialCapital === "") {
      console.log("error");
      setInitialCapitalError(true);
    }
    if (positionSize === "") {
      setPositionSizeError(true);
    }
    if (orderSize === "") {
      setOrderSizeError(true);
    }

    if (initialCapitalError || positionSizeError || orderSizeError)
      return false;
    return true;
  }

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

    if (!valid) setEntryValuesError(true);
    return valid;
  }

  function addRule(e) {
    e.preventDefault();
    console.log(entryValues);

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
          id,
          refNumber: e,
        };
      return value;
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
    <div className="app-container" style={{ padding: "0 4rem" }}>
      <Header />
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
            <span className={styles.tooltiptext}>
              <i
                style={{
                  color: "#00D6A2",
                  margin: "0 1rem",
                }}
                class="fa-solid fa-circle-info fa-xl "
              ></i>
              These are example that can be used for below Entry builder
            </span>
          </h1>
          <EntryReference />
        </div>
      </div>

      <Container>
        <form className={styles.entry_firstForm}>
          <Tooltip
            title="This area is used to provide input to calculate the trading size"
            placement="top-end"
            arrow
          >
            <p className={styles.StratHead}>STRATEGY SETTINGS</p>
          </Tooltip>

          {!loading ? (
            <div style={{ width: "85%" }}>
              <div className={styles.entry__capitalFormGroup}>
                <Numberinput
                  label={"Initial Capital"}
                  value={initialCapital}
                  setValue={(value) => {
                    setInitialCapitalError(false);
                    setInitialCapital(value);
                  }}
                  style={{
                    color: `${initialCapitalError ? "var(--errorColor)" : ""}`,
                  }}
                />

                <Numberinput
                  label={"Position Size"}
                  value={positionSize}
                  setValue={(value) => {
                    setPositionSizeError(false);
                    setPositionSize(value);
                  }}
                  style={{
                    color: `${positionSizeError ? "var(--errorColor)" : ""}`,
                  }}
                />

                <div className={styles.entry__radioFormGroup}>
                  <p
                    style={{
                      color: `${orderSizeError ? "var(--errorColor)" : ""}`,
                    }}
                  >
                    Order Side
                  </p>
                  <RadioButton
                    label="LONG"
                    value="long"
                    name="type"
                    setValue={(value) => {
                      setOrderSize(value);
                      setOrderSizeError(false);
                    }}
                  />

                  <RadioButton
                    label="SHORT"
                    value="short"
                    name="type"
                    setValue={(value) => {
                      setOrderSize(value);
                      setOrderSizeError(false);
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <h2>Loading...</h2>
          )}
        </form>
      </Container>

      <Container>
        <h2 className={styles.entry_Pheads}>ENTRY BUILDER</h2>
        {!loading ? (
          <TradeBuilder
            type="Entry"
            entryValues={entryValues}
            entryValuesError={entryValuesError}
            setCurrentRef={setCurrentRef}
            setEntryValues={setEntryValues}
            setEntryValuesError={setEntryValuesError}
            addRule={addRule}
            removeRule={removeRule}
          />
        ) : (
          <h2>Loading...</h2>
        )}
      </Container>

      <div className={styles.entry__routeBtn}>
        <Link to="/home">
          <ActionButton
            buttonText="Back To Home"
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
            setEntryValuesError(false);
            if (
              validateSettings(initialCapital, positionSize, orderSize) &&
              validatePreviousEntries(entryValues)
            ) {
              sessionStorage.setItem("initialCapital", initialCapital);
              sessionStorage.setItem("positionSize", positionSize);
              sessionStorage.setItem("orderSize", orderSize);
              sessionStorage.setItem(
                "entryValues",
                JSON.stringify(entryValues)
              );
              isCorrect();
              setTimeout(() => {
                navigate("/exit");
              }, 3000);
            } else if (!validatePreviousEntries(entryValues)) {
              setEntryValuesError(true);
              notCorrect();
            } else {
              notCorrect();
            }
          }}
        />
      </div>
    </div>
  );
};
export default Entry;
