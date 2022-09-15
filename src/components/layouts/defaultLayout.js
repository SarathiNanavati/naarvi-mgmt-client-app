import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import Notification from "../ui/notification";
import { useDispatch, useSelector } from "react-redux";
import {
  tryLocalSignin,
  getUserDetails,
  resetStatus,
} from "../../features/usersSlice";
import {
  showFrameHandler,
  hideFrameHandler,
} from "../../features/layoutsSlice";
import { hideNotification } from "../../features/notificationSlice";
import LeftNavBar from "../ui/leftNavbar";
import Header from "../ui/header";
import ContentArea from "../ui/content";
import Modal from "../ui/modal";
import SupplierForm from "../supplier/supplierForm";

const DefaultLayout = (props) => {
  const showFrame = useSelector((state) => state.layouts.showFrame);
  const { showModal, modalChildrenName, propertyPayload } = useSelector(
    (state) => state.modals
  );
  const modalChildren =
    modalChildrenName === "supplierForm" ? (
      <SupplierForm {...propertyPayload} />
    ) : (
      <h1>No Modal Children Found</h1>
    );
  const activeNotification = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(resetStatus());
    dispatch(tryLocalSignin())
      .unwrap()
      .then(() => {
        if (router.pathname === "/") router.push("/dash");
        router.push(router.pathname);
        dispatch(showFrameHandler());
      })
      .catch(() => {
        router.push("/");
        dispatch(hideFrameHandler());
      });
  }, []);

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification.status]);

  return (
    <Fragment>
      {showFrame ? <LeftNavBar /> : ""}
      {showFrame ? <Header /> : ""}
      <ContentArea title='Dashboard'>{props.children}</ContentArea>
      {showModal && <Modal>{modalChildren}</Modal>}
      {activeNotification && activeNotification.status !== "" && (
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
