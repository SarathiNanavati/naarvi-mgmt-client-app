import React from "react";
import styles from "./buttons.module.css";
import { ImSpinner4 } from "react-icons/im";

const customButton = (props) => {
  const {
    customClassName = "",
    title = "Button Title is Mandantory",
    buttonType = "submit",
    disabled = false,
    loading = false,
  } = props;
  return (
    <button
      type={buttonType}
      className={`${styles.btn} ${customClassName}`}
      disabled={disabled}>
      {!loading && title}
      {loading && <ImSpinner4 className={styles.spinnerIcon} />}
    </button>
  );
};

export default customButton;
