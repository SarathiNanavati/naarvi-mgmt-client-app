import { createSlice } from "@reduxjs/toolkit";

const initialState = { title: "", status: "" };

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    showNotification(state, action) {
      state.title = action.payload.title;
      state.status = action.payload.status;
    },
    hideNotification(state) {
      state.title = "";
      state.status = "";
    },
  },
});

export const { showNotification, hideNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
