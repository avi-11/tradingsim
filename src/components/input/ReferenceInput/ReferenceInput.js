const ReferenceInput = ({
  defaultValue,
  placeholder,
  option,
  index,
  showOp,
  setshowOp,
}) => {
  const handleChange = (index, ref) => {
    if (ref === "1") {
      const newOp = showOp.map((op) => {
        if (op.id === index) {
          return {
            ...op,
            first: true,
            second: true,
            third: true,
            fourth: true,
            fifth: true,
            ref: true,
          };
        }

        return op;
      });
      setshowOp(newOp);
    } else if (ref === "2") {
      const newOp = showOp.map((op) => {
        if (op.id === index) {
          return {
            ...op,
            first: true,
            second: true,
            third: true,
            fourth: false,
            fifth: true,
            ref: true,
          };
        }

        return op;
      });
      setshowOp(newOp);
    } else if (ref === "3") {
      const newOp = showOp.map((op) => {
        if (op.id === index) {
          return {
            ...op,
            first: true,
            second: true,
            third: true,
            fourth: true,
            fifth: false,
            ref: true,
          };
        }

        return op;
      });
      setshowOp(newOp);
    } else if (ref === "4") {
      const newOp = showOp.map((op) => {
        if (op.id === index) {
          return {
            ...op,
            first: true,
            second: false,
            third: true,
            fourth: true,
            fifth: true,
            ref: true,
          };
        }

        return op;
      });
      setshowOp(newOp);
    } else if (ref === "5") {
      const newOp = showOp.map((op) => {
        if (op.id === index) {
          return {
            ...op,
            first: true,
            second: false,
            third: true,
            fourth: true,
            fifth: false,
            ref: true,
          };
        }

        return op;
      });
      setshowOp(newOp);
    } else if (ref === "6") {
      const newOp = showOp.map((op) => {
        if (op.id === index) {
          return {
            ...op,
            first: true,
            second: false,
            third: true,
            fourth: false,
            fifth: true,
            ref: true,
          };
        }

        return op;
      });
      setshowOp(newOp);
    }
  };
  return (
    <div>
      <select
        required
        onChange={(e) => handleChange(index + 1, e.target.value)}
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
