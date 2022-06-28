import createDataContext from "./createDataContext";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "show-notification":
      return { ...state, notificationData: action.payload };
    case "hide-notification":
      return { ...state, notificationData: null };
    default:
      return state;
  }
};

const showNotificationHandler = (dispatch) => {
  return (notificationData) => {
    dispatch({ type: "show-notification", payload: notificationData });
  };
};

const hideNotificationHandler = (dispatch) => {
  return () => {
    dispatch({ type: "hide-notification" });
  };
};

export const { Provider, Context } = createDataContext(
  notificationReducer,
  { showNotificationHandler, hideNotificationHandler },
  { notificationData: null } /// { title: "", messnage: "", status: "" }
);
