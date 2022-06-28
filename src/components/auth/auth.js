import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { Context as NotificationContext } from "../../context/NotificationContext";
import { Context as UserContext } from "../../context/UserContext";
import { useRouter } from "next/router";
import { Context as LayoutContext } from "../../context/LayoutContext";
import styles from "./auth.module.css";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const { signin } = useContext(UserContext);
  const { showNotificationHandler, hideNotificationHandler } =
    useContext(NotificationContext);
  const router = useRouter();
  const { showFrameHandler } = useContext(LayoutContext);

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    console.log(enteredEmail, enteredPassword);

    showNotificationHandler({
      title: "Sign-In in progress",
      status: "pending",
      message: "",
    });

    const isLoginSuccess = await signin({
      email: enteredEmail,
      password: enteredPassword,
    });

    if (isLoginSuccess) {
      showNotificationHandler({
        title: "Sign-In Successful",
        status: "success",
        message: "",
      });
      router.push("/dash");
      showFrameHandler();
    } else {
      showNotificationHandler({
        title: "Sign-In Failed",
        status: "error",
        message: "",
      });
    }
    // console.log(response);
  }
  return (
    <div className={styles.formcontainer}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={styles.actions}>
          <button>{"Login"}</button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
