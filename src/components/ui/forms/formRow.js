import styles from "./forms.module.css";
import React from "react";

const FormRow = (props) => {
  return <div className={styles.row}>{props.children}</div>;
};

export default FormRow;
