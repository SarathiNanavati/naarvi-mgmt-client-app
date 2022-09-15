import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

const initialState = {
  message: "",
  responseCode: 0,
  status: "idle",
  suppliers: [],
};

const supplierSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {
    resetStatus(state) {
      state.message = "";
      state.responseCode = 0;
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllSuppliersDetail.pending, (state, action) => {
        state.message = "";
        state.responseCode = 0;
        state.status = "processing";
      })
      .addCase(getAllSuppliersDetail.fulfilled, (state, action) => {
        state.message = "success";
        state.responseCode = 0;
        state.status = "completed";
        state.suppliers = action.payload;
      })
      .addCase(getAllSuppliersDetail.rejected, (state, action) => {
        state.message = "failed";
        state.responseCode = 1;
        state.status = "completed";
        state.suppliers = [];
      })
      .addCase(updateSupplierDetail.pending, (state, action) => {
        state.message = "";
        state.responseCode = 0;
        state.status = "processing";
      })
      .addCase(updateSupplierDetail.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.message = "success";
        state.responseCode = 0;
        state.status = "completed";
        state.suppliers = state.suppliers.map((supplier) => {
          if (supplier.id === data.id) {
            return { ...data };
          } else {
            return { ...supplier };
          }
        });
      })
      .addCase(updateSupplierDetail.rejected, (state, action) => {
        console.log("updateSupplierDetail.rejected", action);
        state.message = action.payload.data.message;
        state.responseCode = 1;
        state.status = "completed";
      });
  },
});

export const getAllSuppliersDetail = createAsyncThunk(
  "suppliers/getSuppliersDetail",
  async (_, thunkApi) => {
    try {
      const { data: response } = await axios.post("/suppliers");
      return response.data;
    } catch (error) {
      console.log("axios Error", error);
      return [];
    }
  }
);

export const updateSupplierDetail = createAsyncThunk(
  "suppliers/updateSupplierDetail",
  async (newSupplier, thunkApi) => {
    console.log("suppliers/updateSupplierDetail", newSupplier);
    try {
      const { data: response } = await axios.patch(
        `/suppliers/${newSupplier.id}`,
        {
          ...newSupplier,
        }
      );
      console.log("suppliers/updateSupplierDetail", response);
      return response;
    } catch (error) {
      console.log("axios Error", error);
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const getSuppliers = (state) => state.suppliers.suppliers;
export const getSupplierById = (state, supplierId) =>
  state.suppliers.suppliers.filter((supplier) => supplier.id === supplierId);

export const { resetStatus } = supplierSlice.actions;
export default supplierSlice.reducer;
