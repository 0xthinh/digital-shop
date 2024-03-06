import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./RegisterPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../redux/store";
import Cookies from "js-cookie";

const RegisterPage = () => {
  const currentUser = Cookies.get("name");

  const navigate = useNavigate();
  const name = useRef("");
  const email = useRef("");
  const password = useRef("");
  const phone = useRef("");

  const [err, setErr] = useState(null);

  // const userArr = JSON.parse(localStorage.getItem("userArr")) || [];
  // const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  // console.log(currentUser);

  // Check whether there is current user or not
  // If yes, redirect to home

  useEffect(() => {
    if (currentUser) {
      return navigate("/");
    }
  }, []);

  // Validate Input

  const submitHandler = async (e) => {
    e.preventDefault();
    const nameInput = name.current.value;
    const emailInput = email.current.value;
    const passwordInput = password.current.value;
    const phoneInput = phone.current.value;

    const newUser = {
      name: nameInput,
      email: emailInput,
      password: passwordInput,
      phone: phoneInput,
    };

    const res = await fetch("http://localhost:5000/auth/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const data = await res.json();

    if (res.status === 200) {
      navigate("/login");
    }

    if (res.status === 422) {
      setErr(data.msg);
    }
  };

  return (
    <div className={classes.body}>
      <div className={classes.signup}>
        <h2>Sign Up</h2>
        <form
          onSubmit={submitHandler}
          onChange={() => {
            setErr(null);
          }}
        >
          <input type="text" name="name" placeholder="Full Name" ref={name} />
          <input type="text" name="email" placeholder="Email" ref={email} />
          <input
            type="text"
            name="password"
            placeholder="Password"
            ref={password}
          />
          <input type="text" name="phone" placeholder="Phone" ref={phone} />
          {err && (
            <p style={{ color: "red", margin: "10px 5px", fontSize: "0.9rem" }}>
              {err}
            </p>
          )}
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
