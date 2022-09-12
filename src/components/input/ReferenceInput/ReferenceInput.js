import { useState } from "react";

const ReferenceInput = ({
  defaultValue,
  placeholder,
  option,
  index,
  setCurrentRef,
  isRef,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <select
        style={
          isRef
            ? { width: "10rem" }
            : { width: "10rem", position: "relative", right: "41.5rem" }
        }
        required
        onChange={(e) => {
          setCurrentRef(e.target.value, index + 1);
        }}
        defaultValue={defaultValue}
      >
        <option placeholder={placeholder} disabled>
          {defaultValue}
        </option>
        {option.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ReferenceInput;
