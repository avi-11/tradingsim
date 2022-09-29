import Reference from "../button/actionButton/Reference";
import styles from "../../pages/entry/Entry.module.css";

export default function EntryReference() {
  return (
    <div className={styles.entry_reference}>
      <div>
        <Reference
          refNumber="1"
          refType="indicator - operator - indicator"
          refExample="SMA(50) > SMA (200)"
        />
        <Reference
          refNumber="2"
          refType="indicator - operator - price"
          refExample="SMA(50) > close"
        />
      </div>
      <div>
        <Reference
          refNumber="3"
          refType="indicator - operator - value"
          refExample="SMA(50) > 75.5"
        />
        <Reference
          refNumber="4"
          refType="price - operator - price"
          refExample="close > high"
        />
      </div>
      <div>
        <Reference
          refNumber="5"
          refType="price - operator - value"
          refExample="close > 75.5"
        />
      </div>
    </div>
  );
}
