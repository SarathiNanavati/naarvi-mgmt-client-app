import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

const initialState = {
  token: null,
  name: "",
  email: "",
  message: "",
  status: "idle", ///   processing | completed
  responseCode: 0,
};

const usersSlice = createSlice({
  name: "users",
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
      .addCase(tryLocalSignin.pending, (state, action) => {
        state.message = "";
        state.responseCode = 0;
        state.status = "processing";
      })
      .addCase(tryLocalSignin.fulfilled, (state, action) => {
        state.message = "success";
        state.responseCode = 0;
        state.status = "completed";
        state.token = action.payload.token;
        state.name = action.payload.name;
        state.email = action.payload.email;
      })
      .addCase(tryLocalSignin.rejected, (state, action) => {
        state.message = action.payload.message;
        state.responseCode = 1;
        state.status = "completed";
      })
      .addCase(signOut.pending, (state, action) => {
        state.message = "";
        state.responseCode = 0;
        state.status = "processing";
      })
      .addCase(signOut.fulfilled, (state) => {
        state.token = null;
        state.name = 0;
        state.email = "";
        state.message = "";
        state.responseCode = 0;
        state.status = "idle";
      })
      .addCase(signIn.pending, (state, action) => {
        state.message = "";
        state.responseCode = 0;
        state.status = "processing";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.message = "success";
        state.responseCode = 0;
        state.status = "completed";
        state.token = action.payload.token;
        state.name = action.payload.name;
        state.email = action.payload.email;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.message = action.payload;
        state.responseCode = 1;
        state.status = "completed";
      });
  },
});

export const tryLocalSignin = createAsyncThunk(
  "users/autologin",
  async (_, thunkApi) => {
    try {
      await thunkApi.dispatch(resetStatus());
      const token = await AsyncLocalStorage.getItem("token");
      const { data: response } = await axios.post("/auth/certifyToken");
      response.data.token = token;
      return response.data;
    } catch (error) {
      console.log("axios Error", error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const signOut = createAsyncThunk("users/logout", async (_, thunkApi) => {
  try {
    await AsyncLocalStorage.removeItem("token");
    return;
  } catch (error) {
    return;
  }
});

export const signIn = createAsyncThunk(
  "users/login",
  async ({ email, password }, thunkApi) => {
    try {
      await thunkApi.dispatch(resetStatus());

      const { data: response } = await axios.post("/auth/login", {
        email,
        password,
      });
      await AsyncLocalStorage.setItem("token", response.data.token);

      return response.data;
    } catch (error) {
      return err.message;
    }
  }
);

export const getUserDetails = (state) => state.users;

export const { resetStatus } = usersSlice.actions;
export default usersSlice.reducer;
