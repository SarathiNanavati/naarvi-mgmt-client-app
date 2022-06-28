import { Fragment, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Notification from "../ui/notification";
import { Context as NotificationContext } from "../../context/NotificationContext";
import { Context as UserContext } from "../../context/UserContext";
import { Context as LayoutContext } from "../../context/LayoutContext";
import LeftNavBar from "../ui/leftNavbar";
import Header from "../ui/header";
import ContentArea from "../ui/content";

const DefaultLayout = (props) => {
  const { state: notificationState, hideNotificationHandler } =
    useContext(NotificationContext);
  const { tryLocalSignin } = useContext(UserContext);
  const {
    state: showFrameState,
    showFrameHandler,
    hideFrameHandler,
  } = useContext(LayoutContext);

  const activeNotification = notificationState.notificationData;
  const router = useRouter();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 4000);

      return () => {
        clearTimeout(timer);
      };
    }

    const tryAutoLogin = async () => {
      const isLoginSuccessful = await tryLocalSignin();
      if (!isLoginSuccessful) {
        router.push("/");
        hideFrameHandler();
      } else {
        if (router.pathname === "/") router.push("/dash");
        router.push(router.pathname);
        showFrameHandler();
      }
    };
    tryAutoLogin();
  }, []);

  return (
    <Fragment>
      {showFrameState.showFrame ? <LeftNavBar /> : ""}
      {showFrameState.showFrame ? <Header /> : ""}
      <ContentArea title='Dashboard'>{props.children}</ContentArea>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          status={activeNotification.status}
          message={activeNotification.message}
        />
      )}
    </Fragment>
  );
};

export default DefaultLayout;
