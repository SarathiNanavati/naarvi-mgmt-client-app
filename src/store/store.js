import { configureStore } from "@reduxjs/toolkit";
import layoutsReducer from "../features/layoutsSlice";
import usersReducer from "../features/usersSlice";
import notificationsReducer from "../features/notificationSlice";
import suppliersReducer from "../features/supplierSlice";
import productsReducer from "../features/productSlice";
import modalReducer from "../features/modalSlice";

export const store = configureStore({
  reducer: {
    layouts: layoutsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
    suppliers: suppliersReducer,
    products: productsReducer,
    modals: modalReducer,
  },
});
