import React, { useContext } from "react";
import styles from "../../../styles/Home.module.css";
import { MdDashboard, MdInventory, MdSettings, MdLogout } from "react-icons/md";
import { FaTruckMoving } from "react-icons/fa";

import Link from "next/link";
import Image from "next/image";
import { Context as UserContext } from "../../context/UserContext";
import { Context as NotificationContext } from "../../context/NotificationContext";
import { Context as LayoutContext } from "../../context/LayoutContext";

const LeftNavBar = () => {
  const { signout } = useContext(UserContext);
  const { showNotificationHandler, hideNotificationHandler } =
    useContext(NotificationContext);
  const { hideFrameHandler } = useContext(LayoutContext);

  const signOutHandle = async () => {
    showNotificationHandler({
      title: "Signing-Out Progressing",
      status: "pending",
      message: "",
    });

    const isLogoutSuccessful = await signout();

    if (isLogoutSuccessful) {
      showNotificationHandler({
        title: "Signed-Out Successful",
        status: "success",
        message: "",
      });
      hideFrameHandler();
    } else {
      showNotificationHandler({
        title: "Signning-Out Failed",
        status: "error",
        message: "",
      });
    }
  };

  return (
    <div className={styles.navcontainer}>
      <div className={styles.logo}>
        <Link href='/dash'>
          <a>
            <Image
              src='/icons/LogoWithNameV.png'
              alt='Naarvi'
              width='100px'
              height='100px'
            />
            <h2> DashBoard</h2>
          </a>
        </Link>
      </div>
      <div className={styles.wrapper}>
        <ul>
          <li>
            <Link href='/dash'>
              <a>
                <MdDashboard size='24' cursor='pointer' />
                <h4>DashBoard</h4>
              </a>
            </Link>
          </li>
          <li>
            <Link href='/suppliers'>
              <a>
                <FaTruckMoving size='24' cursor='pointer' />
                <h4>Suppliers</h4>
              </a>
            </Link>
          </li>
          <li>
            <Link href='/products'>
              <a>
                <MdInventory size='24' cursor='pointer' />
                <h4>Inventory</h4>
              </a>
            </Link>
          </li>

          <li>
            <a href='#'>
              <MdSettings size='24' cursor='pointer' />
              <h4> Setting</h4>
            </a>
          </li>
          <li>
            <Link href='/'>
              <a onClick={signOutHandle}>
                <MdLogout size='24' cursor='pointer' />
                <h4> Logout</h4>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftNavBar;
