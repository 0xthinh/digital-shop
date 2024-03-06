import { Fragment, useState, useEffect } from "react";
import classes from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";

const Navbar = () => {
  const currentUser = Cookies.get("name");
  console.log(currentUser);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const res = await fetch("http://localhost:5000/auth/logout", {
      credentials: "include",
      method: "post",
    });
    if (res.status === 200) {
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
          >
            Products
          </span>
      
        </div>
        <span className={classes.logo}>BOUTIQUE</span>
        <div className={classes.right}>
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
