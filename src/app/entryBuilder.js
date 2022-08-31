export function validatePreviousEntries(entryValues) {
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

export function addRule(
  e,
  value,
  entryValues,
  setEntryValues,
  setEntryGroups,
  entryGroups,
  num,
  setNum
) {
  e.preventDefault();

  if (!validatePreviousEntries(entryValues)) {
    alert("Complete Previous Entries!!");
    return;
  }

  setEntryGroups([...entryGroups, entryGroups.length + 1]);
  setEntryValues([...entryValues, { id: entryValues.length + 1 }]);
  setNum(num + 1);
}

export function removeRule(
  e,
  entryGroups,
  setEntryValues,
  setEntryGroups,
  entryValues
) {
  e.preventDefault();
  if (entryGroups.length > 1) {
    setEntryGroups(entryGroups.slice(0, entryGroups.length - 1));
    setEntryValues(entryValues.slice(0, entryValues.length - 1));
  }
}

export function setCurrentRef(e, id, entryValues, setEntryValues) {
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

export function isIndicator(refNumber) {
  if (refNumber === "1" || refNumber === "2" || refNumber === "3") return true;
  return false;
}

export function isValue(refNumber) {
  if (refNumber === "3" || refNumber === "6") return true;
  return false;
}

export function setIndicatorOne(e, value, entryValues, setEntryValues) {
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

export function setPriceOne(e, value, entryValues, setEntryValues) {
  const newEntryValue = entryValues.map((entryValue) => {
    if (entryValue.id === value.id) return { ...entryValue, price1: e };
    return entryValue;
  });

  setEntryValues(newEntryValue);
}

export function setIndicatorTwo(e, value, entryValues, setEntryValues) {
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

export function setPriceTwo(e, value, entryValues, setEntryValues) {
  const newEntryValue = entryValues.map((entryValue) => {
    if (entryValue.id === value.id) return { ...entryValue, price2: e };
    return entryValue;
  });

  setEntryValues(newEntryValue);
}
