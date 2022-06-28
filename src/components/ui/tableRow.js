import _ from "lodash";
import React from "react";
import styles from "./tableRow.module.css";

const TableRow = (props) => {
  const { headerDataSet, dataSet } = props;

  let serialNo = 1;

  return (
    <table>
      {headerDataSet || Object.keys(headerDataSet).length > 0 ? (
        <tr className={styles.tableheader}>
          <th className={styles.tableheadercell}>Sr No.</th>
          {Object.values(headerDataSet).map((element) => {
            if (element !== "id")
              return (
                <th key={element} className={styles.tableheadercell}>
                  {element.toUpperCase()}
                  <br />
                  <input
                    id={element}
                    type='text'
                    placeholder='Search....'
                    onChange={props.onChangeHandler}></input>
                </th>
              );
          })}
        </tr>
      ) : (
        <tr className={styles.tablerow}>
          <th className={styles.tablerowcell}>No Header Records Found </th>
        </tr>
      )}

      {dataSet && dataSet.length > 0 ? (
        dataSet.map((element) => {
          return (
            <tr key={element.id} className={styles.tablerow}>
              {Object.values(headerDataSet).map((keyname) => {
                if (keyname !== "id") {
                  return (
                    <td className={styles.tablerowcell}>{element[keyname]}</td>
                  );
                } else {
                  return <td className={styles.tablerowcell}>{serialNo++}</td>;
                }
              })}
            </tr>
          );
        })
      ) : (
        <div className={styles.tablerow}>
          <div className={styles.tablerowcell}>No Data Records Found </div>
        </div>
      )}
    </table>
  );
};

export default TableRow;
