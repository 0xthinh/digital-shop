import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import { popupAction } from "../redux/store";
import { Link } from "react-router-dom";

const Modal = (props) => {
  const state = useSelector((state) => state.popup);
  // console.log(state);
  const dispatch = useDispatch();

  const closePopup = () => {
    dispatch(popupAction.closePopup());
  };

  const viewDetail = (id) => {
    dispatch(popupAction.redirect(`/detail/${id}`));
  };

  return (
    <Fragment>
      {state.showPopup &&
        ReactDOM.createPortal(
          <div className={classes.modal}>
            <div className={classes.overlay} onClick={closePopup}></div>
            <div className={classes.info}>
              <img src={state.img} alt="modal-img" />
              <div>
                <button className={classes.close} onClick={closePopup}>
                  X
                </button>
                <h1>{state.name}</h1>
                <h2>{`${Number(state.price).toLocaleString()} VND`}</h2>
                <p>{state.description}</p>

                <span
                  style={{ cursor: "pointer" }}
                  className={classes.cart}
                  onClick={() => viewDetail(state.id)}
                >
                  <i className="fa-solid fa-cart-shopping" />
                  View Detail
                </span>
              </div>
            </div>
          </div>,
          document.querySelector(".modal")
        )}
    </Fragment>
  );
};

export default Modal;
