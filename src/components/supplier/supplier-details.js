import React, { useContext, useEffect, useState } from "react";
import TableMain from "../ui/tableMain";
import { Context as InventoryContext } from "../../context/InventoryContext";
import Spinner from "../ui/spinner";

const SupplierDetails = () => {
  const { getAllSuppliersHandler } = useContext(InventoryContext);
  const [suppliersData, setSuppliersData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterCondition, setfilterCondition] = useState([]);

  useEffect(() => {
    const getSupplierDetails = async () => {
      const responseData = await getAllSuppliersHandler();
      setFilteredData(responseData);
      setSuppliersData(responseData);
    };
    getSupplierDetails();
  }, []);

  // table search
  const onChangeHandler = (e) => {
    const tempFilterCondition = { ...filterCondition };
    tempFilterCondition[e.target.id] = e.target.value;

    setfilterCondition({ ...tempFilterCondition });

    if (Object.keys(tempFilterCondition).length > 0) {
      let newSupplierData = [...suppliersData];
      Object.keys(tempFilterCondition).map((key) => {
        newSupplierData = newSupplierData.filter((record) => {
          return record[key]
            .toUpperCase()
            .includes(tempFilterCondition[key].toUpperCase());
        });
        setFilteredData(newSupplierData);
      });
    }
  };

  if (!suppliersData || suppliersData.length === 0) return <Spinner />;

  let headerDataSet = [];
  const tempDataSet = suppliersData.map((record) => Object.keys(record));
  tempDataSet.map((record) => {
    Object.values(record).map((header) => (headerDataSet[header] = header));
  });

  return (
    <TableMain
      headerDataSet={headerDataSet}
      dataSet={filteredData}
      title='Supplier Data'
      onChangeHandler={onChangeHandler}
    />
  );
};

export default SupplierDetails;
