import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableMain from "../ui/tableMain";
import {
  getAllSuppliersDetail,
  getSuppliers,
} from "../../features/supplierSlice";
import { showModalHandler } from "../../features/modalSlice";
import Spinner from "../ui/spinner";
import config from "../../../application.config";
import { MdClose, MdEdit } from "react-icons/md";
import SupplierForm from "./supplierForm";

const SupplierDetails = () => {
  const dispatch = useDispatch();
  const suppliersData = useSelector(getSuppliers);
  const filteredData = suppliersData;
  console.log("suppliersData", suppliersData);

  useEffect(() => {
    if (!suppliersData || suppliersData.length === 0)
      dispatch(getAllSuppliersDetail());
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
        filteredData = [...newSupplierData];
      });
    }
  };

  if (!suppliersData || suppliersData.length === 0) return <Spinner />;

  let headerDataSet = config.supplier.headerDataSet;
  // const tempDataSet = suppliersData.map((record) => Object.keys(record));
  // tempDataSet.map((record) => {
  //   Object.values(record).map((header) => (headerDataSet[header] = header));
  // });
  // console.log(headerDataSet);

  const suppliersActions = [
    {
      actionJsx: <MdEdit />,
      actionHandler: (id) => {
        console.log("Edit", id);
        dispatch(
          showModalHandler({
            modalChildrenName: "supplierForm",
            propertyPayload: {
              supplierId: id,
              formMode: "edit",
            },
          })
        );
      },
    },
    {
      actionJsx: <MdClose />,
      actionHandler: (id) => {
        console.log("Delete", id);
      },
    },
  ];

  return (
    <TableMain
      headerList={headerDataSet}
      dataSet={filteredData}
      title='Supplier Data'
      onChangeHandler={onChangeHandler}
      actions={suppliersActions}
    />
  );
};

export default SupplierDetails;
