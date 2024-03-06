import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./RegisterPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../redux/store";
import Cookies from "js-cookie";

const LoginPage = () => {
  const currentUser = Cookies.get("name");

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  // Check whether there is current user or not
  // If yes, redirect to home
  const currentUserStatus = useSelector((state) => state.user.login);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  // Validate Input
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(email, password);

    const res = await fetch("http://localhost:5000/auth/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
      credentials: "include",
    });

    const data = await res.json();

    if (res.status === 200) {
      navigate("/");
    }

    if (res.status === 422 || 404) {
      setErr(data.msg);
    }
  };

  return (
    <div className={classes.body}>
      <div className={classes.signup}>
        <h2>Log In</h2>
        <form onSubmit={submitHandler} onChange={() => setErr(null)}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {err && (
            <p style={{ color: "red", margin: "10px", fontSize: "0.9rem" }}>
              {err}
            </p>
          )}
          <button type="submit">Sign In</button>
        </form>
        <p>
          Create an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
