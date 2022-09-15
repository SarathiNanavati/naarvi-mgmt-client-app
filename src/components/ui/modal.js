import styles from "./modal.module.css";
import { useDispatch } from "react-redux";
import { hideModalHandler } from "../../features/modalSlice";
import { MdClose } from "react-icons/md";

const Modal = (props) => {
  const dispatch = useDispatch();

  const closeModalHandler = (e) => {
    dispatch(hideModalHandler());
  };

  return (
    <div
      className={styles.modalContainer}
      // onClick={(e) => closeModalHandler(e)}
    >
      <div
        className={styles.modal}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <div className={styles.modalBody}>
          <div className={styles.modalClose}>
            <MdClose onClick={(e) => closeModalHandler(e)} />
          </div>
          <div className={styles.modalChildren}>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
