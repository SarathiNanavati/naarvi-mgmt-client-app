import { useDispatch } from "react-redux";
import classes from "./notification.module.css";
import { hideNotification } from "../../features/notificationSlice";

function Notification(props) {
  const dispatch = useDispatch();
  const { title, status } = props;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={() => dispatch(hideNotification())}>
      <h2>{title}</h2>
    </div>
  );
}

export default Notification;
