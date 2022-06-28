import styles from "./spinner.module.css";
import { ImSpinner6 } from "react-icons/im";

const Spinner = (props) => {
  return (
    <div className={styles.spinner}>
      <ImSpinner6 className={styles.spinnerIcon} />
    </div>
  );
};

export default Spinner;
