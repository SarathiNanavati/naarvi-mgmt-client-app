import React from "react";
import styles from "./forms.module.css";

const FormBody = (props) => {
  return <div className={styles.formBody}>{props.children}</div>;
};

export default FormBody;
