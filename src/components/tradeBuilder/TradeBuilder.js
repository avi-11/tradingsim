import ReferenceInput from "../input/ReferenceInput/ReferenceInput";
import SelectInput from "../input/selectInput/SelectInput";
import Numberinput from "../input/numberInput/Numberinput";
import ActionButton from "../button/actionButton/ActionButton";

import styles from "../../pages/entry/Entry.module.css";

import {
  isIndicator,
  isValue,
  setIndicatorOne,
  setPriceOne,
  setIndicatorTwo,
  setPriceTwo,
} from "./entryBuilder";

function TradeBuilder({
  type,
  entryValues,
  entryValuesError,
  setCurrentRef,
  setEntryValues,
  setEntryValuesError,
  addRule,
  removeRule,
}) {
  console.log(entryValues);
  return (
    <>
      <form>
        <div className={styles.entry__entryFormGroup}>
          {entryValues.map((entryValue, index) => (
            <div key={entryValue.id} className={styles.entryFormGroup__row}>
              <p
                className={styles.entry_entryRule_text}
                style={{
                  color: `${
                    entryValuesError && entryValues.length === index + 1
                      ? "var(--errorColor)"
                      : ""
                  }`,
                }}
              >
                {type} Rule {index + 1}
              </p>

              <ReferenceInput
                defaultValue="ref. no"
                value={entryValue.refNumber ? entryValue.refNumber : "ref. no"}
                option={[1, 2, 3, 4, 5]}
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
                  value={
                    entryValue.indicator1
                      ? entryValue.indicator1
                      : entryValue.price1
                      ? entryValue.price1
                      : isIndicator(entryValue.refNumber)
                      ? "Choose Indicator"
                      : "Choose Price"
                  }
                  setValue={(value) => {
                    if (isIndicator(entryValue.refNumber))
                      setEntryValues(
                        setIndicatorOne(value, entryValue, entryValues)
                      );
                    else
                      setEntryValues(
                        setPriceOne(value, entryValue, entryValues)
                      );
                  }}
                />
              ) : (
                <></>
              )}

              {entryValue.refNumber === "1" ||
              entryValue.refNumber === "2" ||
              entryValue.refNumber === "3" ? (
                <input
                  className={styles.entry_input_indicator}
                  type="number"
                  placeholder="Indicator value"
                  value={
                    entryValue.indicatorParameter1
                      ? entryValue.indicatorParameter1
                      : ""
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
                  value={
                    entryValue.operator ? entryValue.operator : "Add Operation"
                  }
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
              entryValue.refNumber !== "5" &&
              entryValue.refNumber ? (
                <SelectInput
                  label=""
                  defaultValue={
                    entryValue.refNumber === "1"
                      ? "Choose Indicator"
                      : "Choose Price"
                  }
                  options={
                    entryValue.refNumber === "1"
                      ? ["SMA", "RSI", "ADX"]
                      : ["Open", "Close", "High", "Low"]
                  }
                  value={
                    entryValue.indicator2
                      ? entryValue.indicator2
                      : entryValue.price2
                      ? entryValue.price2
                      : entryValue.refNumber === "1"
                      ? "Choose Indicator"
                      : "Choose Price"
                  }
                  setValue={(value) => {
                    if (entryValue.refNumber === "1")
                      setEntryValues(
                        setIndicatorTwo(value, entryValue, entryValues)
                      );
                    else
                      setEntryValues(
                        setPriceTwo(value, entryValue, entryValues)
                      );
                  }}
                />
              ) : null}

              {entryValue.refNumber !== "2" &&
              entryValue.refNumber !== "4" &&
              entryValue.refNumber ? (
                isValue(entryValue.refNumber) ? (
                  <Numberinput
                    placeholder="Enter Value"
                    value={entryValue.value}
                    setValue={(e) =>
                      setEntryValues(
                        entryValues.map((value) => {
                          if (value.id === entryValue.id)
                            return { ...value, value: e };
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
                    value={entryValue.indicatorParameter2}
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
              setEntryValuesError(false);
              addRule(e);
            }}
            textColor="var(--whiteColor)"
            backgroundColor="var(--brandColor)"
          />
          <ActionButton
            buttonText={"Delete Rule"}
            onClick={(e) => {
              setEntryValuesError(false);
              removeRule(e);
            }}
            backgroundColor="var(--whiteColor)"
            textColor="var(--blackColor)"
          />
        </div>
      </form>
    </>
  );
}

export default TradeBuilder;
