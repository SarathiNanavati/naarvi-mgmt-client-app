import createDataContext from "./createDataContext";
import axios from "../../lib/axios";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

const InventoryReducer = (state, action) => {
  if (action.store === "supplier") {
    switch (action.type) {
      case "update-suppliers":
        return { ...state, supplier: { suppliers: action.payload } };
      case "failed":
        return { supplier: { suppliers: [] } };
      default:
        return state;
    }
  }
  if (action.store === "inventory") {
    switch (action.type) {
      case "update-products": {
        let newInventoryState = state.inventory.products;
        newInventoryState.push(...action.payload);
        return { ...state, inventory: { products: newInventoryState } };
      }
      case "failed":
        return {
          inventory: { products: [] },
        };
      default:
        return state;
    }
  }
};

const getAllSuppliersHandler = (dispatch) => {
  return async () => {
    try {
      const { data: response } = await axios.post("/suppliers");
      //   console.log(response);
      dispatch({
        store: "supplier",
        type: "update-suppliers",
        payload: response.data,
      });
      return response.data;
    } catch (err) {
      console.log(err);
      dispatch({
        store: "supplier",
        type: "failed",
      });
      return null;
    }
  };
};

const getAllProductsHandler = (dispatch) => {
  return async ({ page, limit }) => {
    try {
      const url = `/products?page=${page}&limit=${limit}`;
      const { data: response } = await axios.post(url);
      console.log("products", response);
      dispatch({
        store: "inventory",
        type: "update-products",
        payload: response.data.products,
      });
      return response.data.products;
    } catch (err) {
      console.log(err);
      dispatch({
        store: "inventory",
        type: "failed",
      });
      return null;
    }
  };
};

export const { Provider, Context } = createDataContext(
  InventoryReducer,
  { getAllSuppliersHandler, getAllProductsHandler },
  {
    supplier: { suppliers: [] },
    inventory: { products: [] },
  }
);
