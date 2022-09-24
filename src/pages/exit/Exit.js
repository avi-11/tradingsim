import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ActionButton from "../../components/button/actionButton/ActionButton";
import Container from "../../components/container/Container";
import EntryReference from "../../components/reference/EntryReference";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "../entry/Entry.module.css";
import { NormalLogo } from "../../components/header/Logo";
import TradeBuilder from "../../components/tradeBuilder/TradeBuilder";

const Exit = () => {
  const [entryGroups, setEntryGroups] = useState([1]);
  const [entryValues, setEntryValues] = useState([
    {
      id: 1,
      refNumber: "",
    },
  ]);
  const [num, setNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [exitValuesError, setExitValuesError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getExitStrategyFromLocalStorage();
  }, []);

  const getExitStrategyFromLocalStorage = () => {
    setLoading(true);
    const exitValues = sessionStorage.getItem("exitValues");
    if (exitValues) {
      setEntryValues(JSON.parse(exitValues));
    }
    console.log(entryValues);
    setLoading(false);
  };

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
        {!loading ? (
          <TradeBuilder
            type="Exit"
            entryValues={entryValues}
            entryValuesError={exitValuesError}
            setCurrentRef={setCurrentRef}
            setEntryValues={setEntryValues}
            setEntryValuesError={setExitValuesError}
            addRule={addRule}
            removeRule={removeRule}
          />
        ) : (
          <h2>Loading...</h2>
        )}
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
              sessionStorage.setItem("exitValues", JSON.stringify(entryValues));
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
