import React from "react";
import styles from "../../../styles/Home.module.css";
import { MdAccountCircle } from "react-icons/md";

const header = () => {
  return (
    <div className={styles.headcontainer}>
      <div className={styles.headwrapper}>
        <div className={styles.title}>
          <h2>
            Hello , <span> Jenny </span>
            <p> Welcome to the board.</p>
          </h2>
        </div>
      </div>
      <div className={styles.profile}>
        <MdAccountCircle size='24' cursor='pointer' className={styles.image} />
      </div>
    </div>
  );
};

export default header;
