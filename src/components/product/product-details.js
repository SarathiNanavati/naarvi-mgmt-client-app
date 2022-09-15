import { useSelector, useDispatch } from "react-redux";
import Spinner from "../ui/spinner";
import {
  getProductsState,
  getProductsDetail,
  setFilters,
  reinitiateState,
  getProductsByPage,
} from "../../features/productSlice";
import { useEffect, useState } from "react";
import Pagination from "../ui/pagination";
import TableMain from "../ui/tableMain";
import config from "../../../application.config";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const productState = useSelector(getProductsState);
  let headerDataSet = config.inventory.headerDataSet;
  let searchFieldHeaderSet = config.inventory.searchFieldHeaderSet;
  const filters = productState.filters;
  const filterDataSet = useSelector(getProductsByPage);

  useEffect(() => {
    dispatch(getProductsDetail({ page: 1 }));
  }, []);

  const onPageClickHandler = (pageNumber) => {
    dispatch(getProductsDetail({ page: pageNumber }));
  };

  const SearchHandler = (e) => {
    dispatch(reinitiateState());
    dispatch(setFilters({ ...filters, [e.target.id]: e.target.value }));
    dispatch(getProductsDetail({ page: 1 }));
  };

  const onSearchBadgeHandler = (targetName) => {
    dispatch(reinitiateState());
    dispatch(setFilters({ ...filters, [targetName]: "" }));
    dispatch(getProductsDetail({ page: 1 }));
  };

  if (productState.status === "processing" || productState.status === "idle")
    return <Spinner />;

  // let record = productState.products[0];
  // Object.keys(record).map((header) => {
  //   if (
  //     header !== "stockUpdateHistory" &&
  //     header !== "vendorId" &&
  //     header !== "vendorFullName"
  //   )
  //     headerDataSet.push({ [header]: header });
  //   if (
  //     header === "comment" ||
  //     header === "productSku" ||
  //     header === "stockQuantity" ||
  //     header === "stockUnitPrice" ||
  //     header === "vendorName"
  //   )
  //     searchFieldHeaderSet.push(header);
  // });

  return (
    <>
      <h1>Inventory</h1>

      <TableMain
        headerList={headerDataSet}
        dataSet={filterDataSet}
        searchFieldHeaderList={searchFieldHeaderSet}
        onSearchHandler={SearchHandler}
        searchFilterDetails={filters}
        onSearchBadgeHandler={onSearchBadgeHandler}
      />

      <Pagination
        rangeLimit={5}
        pageNumber={productState.currentPage}
        totalPages={productState.totalPages}
        onClickHandler={onPageClickHandler}
      />
    </>
  );
};

export default ProductDetails;
