import React from "react";
import styles from "./tableMain.module.css";
import { MdClose } from "react-icons/md";

const TableMain = (props) => {
  const {
    headerList = [],
    dataSet = [],
    rowIdName = "id",
    onSearchHandler,
    searchFieldHeaderList = [],
    searchFilterDetails,
    onSearchBadgeHandler,
    actions = [],
  } = props;

  if (!headerList || headerList.length === 0) {
    return <h1>Attribute headerList is compulsory </h1>;
  }

  const renderSearchInput = (headerName) => {
    if (searchFieldHeaderList.includes(headerName)) {
      const inputStr = (
        <input
          id={headerName}
          type='text'
          placeholder='Search....'
          onKeyDown={(e) => e.key === "Enter" && onSearchHandler(e)}></input>
      );
      const searchP = searchFilterDetails[headerName] ? (
        <p>
          {searchFilterDetails[headerName]}{" "}
          <MdClose onClick={() => onSearchBadgeHandler(headerName)} />
        </p>
      ) : (
        <></>
      );
      return (
        <>
          {inputStr}
          {searchP}
        </>
      );
    } else {
      return <></>;
    }
  };
  const renderHeaderRow = headerList.map((item, idx) => {
    if (item !== rowIdName) {
      return (
        <th key={`headerCell${idx}`}>
          {item}
          {renderSearchInput(item)}
        </th>
      );
    }
  });

  const renderDataRow = dataSet.map((item, idx) => {
    if (item) {
      return (
        <tr key={item[rowIdName]}>
          {headerList.map((keyname) => {
            if (keyname !== rowIdName) {
              return <td>{item[keyname]}</td>;
            }
          })}
          {actions.length > 0 && (
            <td className={styles.actions}>
              {actions.map((actionRec, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => actionRec.actionHandler(item[rowIdName])}>
                    {actionRec.actionJsx}
                  </div>
                );
              })}
            </td>
          )}
        </tr>
      );
    }
  });

  return (
    <section>
      <table border='0' className={styles.table}>
        {/* ///cellpadding='0' cellspacing='0' */}
        <thead>
          <tr>
            {renderHeaderRow}
            {actions.length > 0 && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>{renderDataRow}</tbody>
      </table>
    </section>
  );
};

export default TableMain;
