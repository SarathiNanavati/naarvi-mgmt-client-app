import {
  HiChevronDoubleLeft,
  HiChevronLeft,
  HiChevronRight,
  HiChevronDoubleRight,
} from "react-icons/hi";
import styles from "./pagination.module.css";

const Pagination = (props) => {
  const { pageNumber = 1, totalPages = 1 } = props;
  let { rangeLimit = 7 } = props;
  const { onClickHandler } = props;

  rangeLimit = rangeLimit > totalPages ? totalPages : rangeLimit;

  const rangeCenterCount = Math.floor(rangeLimit / 2);
  const rangeMinLimitCount = rangeLimit - rangeCenterCount;

  let rangeMin = 0;
  let rangeMax = 0;

  if (pageNumber < rangeMinLimitCount) {
    rangeMin = 1;
    rangeMax = rangeLimit;
  } else if (pageNumber + rangeCenterCount > totalPages) {
    rangeMin = totalPages - rangeLimit + 1;
    rangeMax = totalPages;
  } else {
    rangeMin = pageNumber - rangeMinLimitCount + 1;
    rangeMax = pageNumber - rangeMinLimitCount + rangeLimit;
  }

  const renderPageRangeButtons = [...Array(rangeLimit)].map((e, index) => {
    if (pageNumber === rangeMin + index) {
      return (
        <td key={rangeMin + index}>
          <button type='button' className={styles.buttonActive}>
            {rangeMin + index}
          </button>
        </td>
      );
    } else {
      return (
        <td key={rangeMin + index}>
          <button
            type='button'
            onClick={() => onClickHandler(rangeMin + index)}>
            {rangeMin + index}
          </button>
        </td>
      );
    }
  });
  return (
    <>
      {/* <div>
        <p>page : {pageNumber}</p>
        <p>totalPages : {totalPages}</p>
        <p>Range {`${rangeLimit} ${rangeMinLimitCount} `}</p>
        <p>Range {`${rangeMin} ${rangeMax}`}</p>
      </div> */}
      <table>
        <tbody>
          <tr className={styles.pagerClass}>
            {pageNumber - rangeMinLimitCount > 0 ? (
              <>
                <td key={1}>
                  <button type='button' onClick={() => onClickHandler(1)}>
                    <HiChevronDoubleLeft />
                  </button>
                </td>
                <td key={pageNumber - 1}>
                  <button
                    type='button'
                    onClick={() => onClickHandler(pageNumber - 1)}>
                    <HiChevronLeft />
                  </button>
                </td>
                <td>...</td>
              </>
            ) : (
              ""
            )}
            {renderPageRangeButtons}
            {pageNumber - rangeMinLimitCount + rangeLimit < totalPages ? (
              <>
                <td>...</td>
                <td key={pageNumber + 1}>
                  <button
                    type='button'
                    onClick={() => onClickHandler(pageNumber + 1)}>
                    <HiChevronRight />
                  </button>
                </td>
                <td key={totalPages}>
                  <button
                    type='button'
                    onClick={() => onClickHandler(totalPages)}>
                    <HiChevronDoubleRight />
                  </button>
                </td>
              </>
            ) : null}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Pagination;
