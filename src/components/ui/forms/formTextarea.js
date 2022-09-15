import React from "react";
import styles from "./forms.module.css";

const FormTextArea = () => {
  console.log("styles", styles);
  return (
    <div className={styles.formGroup}>
      <label htmlFor=''>Bio</label>
      <textarea> </textarea>
    </div>
  );
};

export default FormTextArea;
