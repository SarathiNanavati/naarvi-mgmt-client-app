import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

const initialState = {
  message: "",
  responseCode: 0,
  status: "idle",
  products: [],
  currentPage: 1,
  limit: 20,
  totalPages: 1,
  filters: {},
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetStatus(state) {
      state.message = "";
      state.responseCode = 0;
      state.status = "idle";
    },
    reinitiateState(state) {
      state.message = "";
      state.responseCode = 0;
      state.status = "idle";
      state.products = [];
      state.currentPage = 1;
      state.limit = 20;
      state.totalPages = 1;
      state.filters = {};
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProductsDetail.pending, (state, action) => {
        state.message = "";
        state.responseCode = 0;
        state.status = "processing";
      })
      .addCase(getProductsDetail.fulfilled, (state, action) => {
        if (action.payload.products.length > 0) {
          Array.from(
            { length: action.payload.limit },
            (v, i) => (action.payload.page - 1) * action.payload.limit + i
          ).map((item, index) => {
            state.products[item] = action.payload.products[index];
          });
        }

        state.message = "success";
        state.responseCode = 0;
        state.status = "completed";
        state.currentPage = action.payload.page;
        state.limit = action.payload.limit;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getProductsDetail.rejected, (state, action) => {
        state.message = "failed";
        state.responseCode = 1;
        state.status = "completed";
        state.products = [];
        state.currentPage = 1;
        state.limit = 20;
        state.totalPages = 1;
      });
  },
});

export const getProductsDetail = createAsyncThunk(
  "products/getProductDetail",
  async ({ page, limit = 20 }, { getState }) => {
    const filters = getState().products.filters;
    try {
      const url = `/products?page=${page}&limit=${limit}`;
      const { data: response } = await axios.post(url, { filters });
      return response.data;
    } catch (error) {
      console.log("axios Error", error);
      return [];
    }
  }
);

export const getAllProducts = (state) => state.products.products;
export const getProductsByPage = ({ products }) => {
  return products.products
    .slice(
      (products.currentPage - 1) * products.limit,
      products.currentPage * products.limit - 1
    )
    .filter((n) => n);
};
export const getProductsState = (state) => state.products;

export const { resetStatus, setFilters, reinitiateState } =
  productSlice.actions;
export default productSlice.reducer;
