import React from "react";
import styles from "./forms.module.css";

const FormHeader = (props) => {
  return <div className={styles.formHeader}>{props.children}</div>;
};

export default FormHeader;
