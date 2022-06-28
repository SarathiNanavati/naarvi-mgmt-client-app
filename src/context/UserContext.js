import createDataContext from "./createDataContext";
import axios from "../../lib/axios";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

const authReducer = (state, action) => {
  switch (action.type) {
    case "failed":
      return { ...state, message: action.payload };
    case "success":
      return { ...state, message: action.payload };
    case "signup":
      return { token: action.payload };
    case "signin":
      return {
        token: action.payload.token,
        name: action.payload.name,
        email: action.payload.email,
        message: "Login Successfully",
      };
    case "signout":
      return { token: null, message: "Logged-Out Successfully" };
    case "clear_message":
      return { ...state, message: "" };
    case "reset_state":
      return { token: null, name: "", email: "", message: "" };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => {
  return async (state) => {
    console.log("asdf", state);
    dispatch({ type: "clear_message" });

    try {
      const token = await AsyncLocalStorage.getItem("token");
      const { data: response } = await axios.post("/auth/certifyToken");
      dispatch({
        type: "signin",
        payload: {
          token: token,
          name: response.data.name,
          email: response.data.email,
        },
      });
      return true;
    } catch (err) {
      console.log("tryLocalSignin", err);
      dispatch({ type: "reset_state" });
      dispatch({
        type: "failed",
        payload: "Unable to Auto Login",
      });

      return false;
    }
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    dispatch({ type: "clear_message" });
    try {
      const { data: response } = await axios.post("/auth/login", {
        email,
        password,
      });
      console.log("signin", response);
      await AsyncLocalStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data });
      return true;
    } catch (err) {
      console.log(err);
      dispatch({
        type: "failed",
        payload: err.message || "Something went wrong. Please try again Later",
      });
      return false;
    }
  };
};

const signout = (dispatch) => {
  return async () => {
    try {
      await AsyncLocalStorage.removeItem("token");
      dispatch({ type: "reset_state" });
      dispatch({ type: "signout" });
      return true;
    } catch (err) {
      return false;
    }
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, tryLocalSignin, signout },
  { token: null, name: "", email: "", message: "" }
);
