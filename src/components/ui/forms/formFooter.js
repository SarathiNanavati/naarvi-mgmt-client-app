import React from "react";
import styles from "./forms.module.css";

const FormFooter = (props) => {
  return <div className={styles.formFooter}>{props.children}</div>;
};

export default FormFooter;
