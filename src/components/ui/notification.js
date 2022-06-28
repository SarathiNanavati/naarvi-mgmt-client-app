import { useContext } from "react";

import classes from "./notification.module.css";
import { Context as NotificationContext } from "../../context/NotificationContext";

function Notification(props) {
  const { hideNotificationHandler } = useContext(NotificationContext);

  const { title, message, status } = props;

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
    <div className={activeClasses} onClick={hideNotificationHandler}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
