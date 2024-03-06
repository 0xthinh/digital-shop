import { Fragment, useEffect, useRef } from "react";
import classes from "./CheckoutPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { cartAction } from "../redux/store";
const CheckoutPage = () => {
  // Check login or not
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = Cookies.get("name");
  if (!currentUser) {
    navigate("/login");
  }

  // Get user info form loader
  const userInfo = useLoaderData();
  // console.log(userInfo);

  // Khai bao ref
  const fullNameRef = useRef(userInfo.fullName);
  const emailRef = useRef(userInfo.email);
  const phoneRef = useRef(userInfo.phone);
  const addressRef = useRef("");

  // Cart total calculation
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    if (cart.length === 0) {
      return navigate("/shop");
    }
  }, []);
  let total = 0;
  cart.map((item) => (total += item.quantity * item.price));

  const orderHandler = async (e) => {
    e.preventDefault();
    const fullNameInput = fullNameRef.current.value;
    const emailInput = emailRef.current.value;
    const phoneInput = phoneRef.current.value;
    const addressInput = addressRef.current.value;

    const orderUser = {
      fullName: fullNameInput,
      email: emailInput,
      phone: phoneInput,
      address: addressInput,
    };

    console.log(orderUser);
    try {
      const res = await fetch("http://localhost:5000/shop/order", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: cart, userInfo: orderUser }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.msg);
        throw new Error("Can not post the order");
      }
      if (res.status === 200) {
        alert("You have placed order successfully");
        navigate("/history");
        dispatch(cartAction.clearCart());
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.body}>
      {/* PLACEHOLDER */}
      <div className={classes.placeholder}>
        <div>
          <h1>CHECKOUT</h1>
          <h2>
            <strong>HOME / CART /</strong> CHECKOUT
          </h2>
        </div>
      </div>

      {/* MAIN */}
      <div className={classes.main}>
        {/* Billing Details*/}
        <div className={classes.billing}>
          <h2>BILLING DETAILS</h2>
          <form className={classes.details} onSubmit={orderHandler}>
            <label htmlFor="full-name">FULL NAME</label>
            <input
              name="full-name"
              type="text"
              placeholder="Enter your full name"
              ref={fullNameRef}
              defaultValue={userInfo.fullName}
              required
            ></input>
            <label htmlFor="email">EMAIL</label>
            <input
              name="email"
              type="text"
              placeholder="Enter your email"
              ref={emailRef}
              defaultValue={userInfo.email}
              required
            ></input>
            <label htmlFor="number">PHONE NUMBER</label>
            <input
              name="number"
              type="text"
              placeholder="Enter your phone number"
              ref={phoneRef}
              defaultValue={userInfo.phone}
              required
            ></input>
            <label htmlFor="address">ADDRESS</label>
            <input
              name="address"
              type="text"
              placeholder="Enter your address"
              ref={addressRef}
              required
            ></input>
            <button type="submit">Place Order</button>
          </form>
        </div>

        {/* Your Order */}
        <div className={classes.order}>
          <h2>YOUR ORDER</h2>
          {cart.map((item) => {
            return (
              <div className={classes.item} key={item.id}>
                <h3>{item.name}</h3>
                <p>{`${item.price} VND x ${item.quantity}`}</p>
              </div>
            );
          })}
          <span className={classes.total}>
            <h3>TOTAL</h3>
            <p>{`${total} VND`}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

export const getUserInfo = async () => {
  const res = await fetch("http://localhost:5000/shop/userInfo", {
    credentials: "include",
  });
  const data = await res.json();

  return data;
};
