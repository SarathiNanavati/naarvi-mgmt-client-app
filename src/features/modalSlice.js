import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  modalChildrenName: "No Children found",
  propertyPayload: {},
};

const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    showModalHandler(state, action) {
      console.log("MOdalSlice", action);
      state.showModal = true;
      state.modalChildrenName = action.payload.modalChildrenName;
      state.propertyPayload = action.payload.propertyPayload;
    },
    hideModalHandler(state) {
      state.showModal = false;
      state.modalChildrenName = "No Children found";
      state.propertyPayload = {};
    },
  },
});

export const { showModalHandler, hideModalHandler } = modalSlice.actions;

// export modalSlice.reducer;
export default modalSlice.reducer;
