import React from "react";
import styles from "./forms.module.css";

const FormInputFile = () => {
  console.log("styles", styles);
  return (
    <div className={styles.formGroup}>
      <label>Upload Profile Picture</label>
      <input type='file'></input>
    </div>
  );
};

export default FormInputFile;
