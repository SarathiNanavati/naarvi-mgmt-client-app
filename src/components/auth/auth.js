import { useDispatch } from "react-redux";
import { useRef } from "react";
import { useRouter } from "next/router";
import styles from "./auth.module.css";
import { signIn } from "../../features/usersSlice";
import { showFrameHandler } from "../../features/layoutsSlice";
import { showNotification } from "../../features/notificationSlice";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    dispatch(
      showNotification({
        title: "Sign-In in progress",
        status: "pending",
      })
    );

    dispatch(
      signIn({
        email: enteredEmail,
        password: enteredPassword,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(
          showNotification({
            title: "Sign-In Successful",
            status: "success",
          })
        );

        router.push("/dash");
        dispatch(showFrameHandler());
      })
      .catch(() =>
        dispatch(
          showNotification({
            title: "Sign-In Failed",
            status: "error",
          })
        )
      );
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
