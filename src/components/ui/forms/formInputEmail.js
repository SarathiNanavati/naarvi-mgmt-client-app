import React from "react";
import styles from "./forms.module.css";

const FormInputEmail = () => {
  console.log("styles", styles);
  return (
    <div className={styles.formGroup}>
      <label>First name </label>
      <input type='email' placholder='Enter your email' />
    </div>
  );
};

export default FormInputEmail;
