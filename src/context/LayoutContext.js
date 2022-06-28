import createDataContext from "./createDataContext";

const LayoutReducer = (state, action) => {
  switch (action.type) {
    case "show-frame":
      return { showFrame: true };
    case "hide-frame":
      return { showFrame: false };
    default:
      return state;
  }
};

const showFrameHandler = (dispatch) => {
  return (notificationData) => {
    dispatch({ type: "show-frame" });
  };
};

const hideFrameHandler = (dispatch) => {
  return () => {
    dispatch({ type: "hide-frame" });
  };
};

export const { Provider, Context } = createDataContext(
  LayoutReducer,
  { showFrameHandler, hideFrameHandler },
  { showFrame: false } /// { showFrame }
);
