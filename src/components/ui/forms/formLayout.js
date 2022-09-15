import React from "react";
import styles from "./forms.module.css";

const FormLayout = (props) => {
  return (
    <form onSubmit={props.onSubmit} className={styles.form}>
      {props.children}
    </form>
  );
};

export default FormLayout;
