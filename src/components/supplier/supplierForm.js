import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSupplierById,
  updateSupplierDetail,
} from "../../features/supplierSlice";
import { hideModalHandler } from "../../features/modalSlice";
import { showNotification } from "../../features/notificationSlice";

import FormHeader from "../ui/forms/FormHeader";
import FormRow from "../ui/forms/formRow";
import FormInput from "../ui/forms/FormInput";
import FormLayout from "../ui/forms/formLayout";
import FormBody from "../ui/forms/formBody";
import FormFooter from "../ui/forms/formFooter";
import CustomButton from "../ui/buttons/customButton";

const SupplierForm = (props) => {
  const { formMode = "create", supplierId } = props;
  const { 0: supplier } = useSelector((state) =>
    getSupplierById(state, supplierId)
  );
  const dispatch = useDispatch();

  const [supplierState, setSupplierState] = useState(supplier);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const buttonTitle =
    formMode === "create" ? "Add Supplier" : "Update Supplier";
  const formTitle =
    formMode === "create" ? "Supplier Update Form" : "Supplier Add Form";

  const supplierStateHandler = (e) => {
    setSupplierState({ ...supplierState, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("formSubmited", supplierState);
    setIsLoading(true);
    setIsButtonDisabled(true);
    dispatch(
      showNotification({
        title: "Updating Supplier Details",
        status: "pending",
      })
    );
    dispatch(updateSupplierDetail(supplierState))
      .unwrap()
      .then(() => {
        dispatch(
          showNotification({
            title: "Updated Successful",
            status: "success",
          })
        );
      })
      .catch(() =>
        dispatch(
          showNotification({
            title: "Updation Failed",
            status: "error",
          })
        )
      );
    dispatch(hideModalHandler());
  };

  if (!supplierState) return <h1>Loading </h1>;

  return (
    <FormLayout onSubmit={submitHandler}>
      <FormHeader>
        <h1>{formTitle}</h1>
      </FormHeader>
      <FormBody>
        <FormRow>
          <FormInput
            label='Supplier Name'
            name='name'
            value={supplierState.name}
            placeholder='Supplier Name'
            errorMessage={`Supplier Name should be 3-16 characters and shouldn't have any special characher`}
            pattern='^[A-Z,a-z]{3,16}$'
            required
            onChangeHandler={supplierStateHandler}
          />
        </FormRow>
        <FormRow>
          <FormInput
            label='Supplier FullName'
            name='fullName'
            value={supplierState.fullName}
            placeholder='Supplier Full Name'
            errorMessage={`Supplier Name should be 3-20 characters and shouldn't have any special characher`}
            pattern='^[A-Z,a-z ]{3,20}$'
            required
            onChangeHandler={supplierStateHandler}
          />
        </FormRow>
      </FormBody>
      <FormFooter>
        <CustomButton
          title={buttonTitle}
          disabled={isButtonDisabled}
          loading={isLoading}
        />
      </FormFooter>
    </FormLayout>
  );
};

export default SupplierForm;
