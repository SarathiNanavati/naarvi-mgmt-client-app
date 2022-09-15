import React from "react";
import styles from "./forms.module.css";

const FormSelect = () => {
  console.log("styles", styles);
  return (
    <div className={styles.formGroup}>
      <label htmlFor='id'>Source of Income</label>
      <select id='id'>
        <option>Employed</option>
        <option>Self-Employed</option>
        <option>Unemployed</option>
      </select>
    </div>
  );
};

export default FormSelect;
