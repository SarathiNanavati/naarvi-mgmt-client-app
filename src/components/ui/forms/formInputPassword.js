import React from "react";
import styles from "./forms.module.css";

const FormInputPassword = () => {
  console.log("styles", styles);
  return (
    <div className={styles.formGroup}>
      <label>Password </label>
      <input type='password' placholder='Enter Password' />
    </div>
  );
};

export default FormInputPassword;
