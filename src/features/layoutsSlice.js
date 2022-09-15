import { createSlice } from "@reduxjs/toolkit";

const initialState = { showFrame: false };

const layoutsSlice = createSlice({
  name: "layouts",
  initialState,
  reducers: {
    showFrameHandler(state) {
      state.showFrame = true;
    },
    hideFrameHandler(state) {
      state.showFrame = false;
    },
  },
});

export const { showFrameHandler, hideFrameHandler } = layoutsSlice.actions;

export default layoutsSlice.reducer;
