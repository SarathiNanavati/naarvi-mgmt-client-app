import styles from "./spinner.module.css";
import { ImSpinner4 } from "react-icons/im";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <ImSpinner4 className={styles.spinnerIcon} />
    </div>
  );
};

export default Spinner;
