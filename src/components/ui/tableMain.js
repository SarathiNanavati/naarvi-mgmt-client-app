import React from "react";
import TableRow from "./tableRow";
import styles from "./tableMain.module.css";

const TableMain = (props) => {
  return (
    <div className={styles.maintable}>
      <div className={styles.maintabletitle}>{props.title}</div>

      <TableRow
        headerDataSet={props.headerDataSet}
        dataSet={props.dataSet}
        onChangeHandler={props.onChangeHandler}
      />
    </div>
  );
};

export default TableMain;
