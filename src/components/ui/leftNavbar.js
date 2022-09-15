import React from "react";
import { useDispatch } from "react-redux";
import styles from "../../../styles/Home.module.css";
import { MdDashboard, MdInventory, MdSettings, MdLogout } from "react-icons/md";
import { FaTruckMoving } from "react-icons/fa";
import { signOut } from "../../features/usersSlice";
import { hideFrameHandler } from "../../features/layoutsSlice";
import { showNotification } from "../../features/notificationSlice";
import Link from "next/link";
import Image from "next/image";

const LeftNavBar = () => {
  const dispatch = useDispatch();

  const signOutHandle = () => {
    dispatch(
      showNotification({
        title: "Signing-Out Progressing",
        status: "pending",
      })
    );

    dispatch(signOut())
      .unwrap()
      .then(() => {
        dispatch(
          showNotification({
            title: "Signed-Out Successful",
            status: "success",
          })
        );
        dispatch(hideFrameHandler());
      })
      .catch(() => {
        dispatch(
          showNotification({
            title: "Signning-Out Failed",
            status: "error",
          })
        );
      });
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
