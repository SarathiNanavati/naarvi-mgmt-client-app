import React, { useState } from "react";
import styles from "./forms.module.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const {
    label = "No Label Found",
    errorMessage,
    onChangeHandler,
    ...inputProps
  } = props;

  return (
    <div className={styles.formGroup}>
      <label>{label}</label>
      <input
        {...inputProps}
        type='text'
        onChange={(e) => onChangeHandler(e)}
        autoComplete='off'
        focused={focused.toString()}
        onFocus={() => setFocused(true)}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
