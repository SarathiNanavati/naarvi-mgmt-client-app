import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import TableMain from "../ui/tableMain";
import { Context as InventoryContext } from "../../context/InventoryContext";
import styles from "./product-details.module.css";
import Spinner from "../ui/spinner";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ProductDetails = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(200);
  const [fetchDataFlag, setFetchDataFlag] = useState(true);
  const [allPageReceived, setAllPageReceived] = useState(false);

  const { state, getAllProductsHandler } = useContext(InventoryContext);
  const [productsData, setProductsData] = useState([]);
  const filteredData = [];
  const [filterCondition, setfilterCondition] = useState([]);

  useEffect(() => {
    if (fetchDataFlag && !allPageReceived) {
      getProductDetails();
      setFetchDataFlag(false);
    }
  }, [page, limit]);

  const getProductDetails = async () => {
    const responseData = await getAllProductsHandler({ page, limit });
    if (responseData.length < limit) setAllPageReceived(true);
    setProductsData([...productsData, ...responseData]);
  };

  const onChangeHandler = (e) => {
    // const tempFilterCondition = { ...filterCondition };
    // tempFilterCondition[e.target.id] = e.target.value;
    // setfilterCondition({ ...tempFilterCondition });
    // if (Object.keys(tempFilterCondition).length > 0) {
    //   let newProductData = [...productsData];
    //   Object.keys(tempFilterCondition).map((key) => {
    //     newProductData = newProductData.filter((record) => {
    //       return record[key]
    //         .toUpperCase()
    //         .includes(tempFilterCondition[key].toUpperCase());
    //     });
    //     setFilteredData(newProductData);
    //   });
    // }
  };

  const onPageIncrement = () => {
    console.log("mod", productsData.length % page);
    if (!allPageReceived) {
      setPage(page + 1);
    } else if (page + 1 > productsData.length % page) {
      ///// pending task. tomorrow start from here.
      setPage(page + 1);
    }

    if ((page + 1) * limit > productsData.length) {
      setFetchDataFlag(true);
    }
  };

  const onPageDecrement = () => {
    if (page - 1 > 0) {
      setPage(page - 1);
      setFetchDataFlag(false);
    }
  };

  if (!productsData || productsData.length === 0) return <Spinner />;

  filteredData = productsData.filter(
    (value, index) => index >= (page - 1) * limit && index <= page * limit - 1
  );

  let headerDataSet = [];
  productsData.map((record) => {
    Object.keys(record).map((header) => {
      if (
        header !== "stockUpdateHistory" &&
        header !== "vendorId" &&
        header !== "stockBatch" &&
        header !== "vendorFullName"
      )
        headerDataSet[header] = header;
    });
  });

  return (
    <>
      <TableMain
        headerDataSet={headerDataSet}
        dataSet={filteredData}
        title='Inventory/Product Details'
        onChangeHandler={onChangeHandler}
      />
      <br />
      <table>
        <tr>
          <td className={styles.actions}>
            <a onClick={onPageDecrement}>
              <IoIosArrowBack />
            </a>
          </td>
          <td className={styles.actionPageNumber}>{page}</td>
          <td className={styles.actions}>
            <a onClick={onPageIncrement}>
              <IoIosArrowForward />
            </a>
          </td>
        </tr>
      </table>
    </>
  );
};

export default ProductDetails;
