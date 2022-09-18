import { useState } from "react";

const ReferenceInput = ({
  defaultValue,
  placeholder,
  option,
  index,
  setCurrentRef,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "8rem",
        minWidth: "8rem",
      }}
    >
      <select
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
