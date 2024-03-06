import { Fragment, useState, useEffect } from "react";
import classes from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartAction, popupAction, userAction } from "../redux/store";
import Cookies from "js-cookie";

const Navbar = () => {
  const currentUser = Cookies.get("name");
  console.log(currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // turn off redirect key in popupSlice
  const popupstate = useSelector((state) => state.popup);
  console.log(popupstate.redirect);
  useEffect(() => {
    if (popupstate.redirect === true) {
      dispatch(popupAction.cancelRedirect());
      navigate(popupstate.path);
    }
  }, [popupstate.redirect]);

  // Setup path name and make text lightened
  const [url, setUrl] = useState("/");

  useEffect(() => {
    if (window.location.pathname === "/shop") {
      setUrl("/shop");
    } else if (window.location.pathname === "/") {
      setUrl("/");
    } else {
      setUrl(null);
    }
  }, [window.location.pathname]);

  // const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  // if (currentUser.name) {
  //   dispatch(userAction.login(currentUser.name));
  // }

  // const loggedInUser = useSelector((state) => state.user);
  // console.log(loggedInUser);

  const logoutHandler = async () => {
    dispatch(userAction.logout());
    const res = await fetch("http://localhost:5000/auth/logout", {
      credentials: "include",
      method: "post",
    });
    if (res.status === 200) {
      // Delete all cart
      dispatch(cartAction.clearCart());

      navigate("/login");
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.navbar}>
        <div>
          <span
            to="/"
            onClick={() => {
              navigate("/");
            }}
            className={classes.home}
            style={{ color: url === "/" ? "#dfa508" : "" }}
          >
            Home
          </span>
          <span
            to="/shop"
            onClick={() => {
              navigate("/shop");
            }}
            className={classes.shop}
            style={{ color: url === "/shop" ? "#dfa508" : "" }}
          >
            Shop
          </span>
          {currentUser && (
            <span
              onClick={() => {
                navigate("/history");
              }}
              style={{ marginLeft: "20px" }}
            >
              History
            </span>
          )}
        </div>
        <span className={classes.logo}>BOUTIQUE</span>
        <div className={classes.right}>
          {currentUser && (
            <span
              className={classes.cart}
              onClick={() => {
                navigate("/cart");
              }}
            >
              <i className="fa-solid fa-cart-shopping"></i>Cart
            </span>
          )}
          <span
            className={classes.login}
            onClick={() => {
              navigate("/login");
            }}
          >
            <i className="fa-solid fa-user"></i>
            {currentUser ? (
              <span>{Cookies.get("name")}</span>
            ) : (
              <span>Login</span>
            )}
            {currentUser && (
              <button onClick={logoutHandler} className={classes.logout}>
                Logout
              </button>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
