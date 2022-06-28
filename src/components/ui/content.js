import React from "react";
import styles from "../../../styles/Home.module.css";

const contentArea = (props) => {
  return (
    <div className={styles.contentcontainer}>
      <div className={styles.contentwrapper}>
        <section className={styles.contentsection}>{props.children}</section>
      </div>
    </div>
  );
};

export default contentArea;
