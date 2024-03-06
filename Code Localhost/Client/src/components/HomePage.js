import { Fragment, useEffect, useState } from "react";
import classes from "./HomePage.module.css";
import { Link, json, useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { popupAction } from "../redux/store";

const HomePage = () => {
  const navigate = useNavigate();
  const data = useLoaderData();
  // console.log(data);
  const state = useSelector((state) => state.popup);
  // console.log(state);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:5000", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  // Open popup function
  const openPopupHandler = (info) => {
    dispatch(popupAction.openPopup(info));
  };

  return (
    <div className={classes.container}>
      {/* Banner */}
      <div className={classes.banner}>
        <div className={classes["banner-info"]}>
          <h2>NEW INSPIRATION 2020</h2>
          <h1>20% OFF ON NEW SEASON</h1>
          <button>
            <Link to="/shop">Browse collection</Link>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className={classes.categories}>
        <div>
          <h2>CAREFULLY CREATED COLLECTION</h2>
          <h1>BROWSE OUT CATEGORIES</h1>
        </div>
        <div className={classes.overall}>
          <img onClick={() => navigate("/shop")} src="./images/product_1.png" />
          <img onClick={() => navigate("/shop")} src="./images/product_2.png" />
          <img onClick={() => navigate("/shop")} src="./images/product_3.png" />
          <img onClick={() => navigate("/shop")} src="./images/product_4.png" />
          <img onClick={() => navigate("/shop")} src="./images/product_5.png" />
        </div>
      </div>

      {/* Trending */}
      <div className={classes.trending}>
        <div>
          <h2>MADE THE HARD WAY</h2>
          <h1>TOP TRENDING PRODUCTS</h1>
        </div>
        <div className={classes.products}>
          {data.map((item) => (
            <div
              onClick={() =>
                openPopupHandler({
                  id: item._id,
                  name: item.name,
                  price: item.price,
                  img: item.img1,
                  description: item["long_desc"],
                })
              }
              key={item._id}
              className={classes.item}
            >
              <img src={item.img1} />
              <h1 className={classes.name}>{item.name}</h1>
              <h2 className={classes.price}>{`${Number(
                item.price
              ).toLocaleString()} VND`}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className={classes.services}>
        <div>
          <h1>FREE SHIPPING</h1>
          <h2>Free shipping worldwide</h2>
        </div>
        <div>
          <h1>24 X 7 SERVICE</h1>
          <h2>Free shipping worldwide</h2>
        </div>
        <div>
          <h1>FESTIVAL OFFER</h1>
          <h2>Free shipping worldwide</h2>
        </div>
      </div>

      {/* Subscribe */}
      <div className={classes.subscribe}>
        <div>
          <h1>LET'S BE FRIENDS!</h1>
          <h2>We offer the best quality</h2>
        </div>

        <form>
          <input placeholder="Enter your email address" />
          <button>Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;

// Load data from API

export async function trendingLoader() {
  const trendingAPI = "http://localhost:5000";
  const res = await fetch(trendingAPI);
  const data = await res.json();
  if (!res.ok) {
    throw json({ message: "Can not fetch trending API" }, { status: 404 });
  }

  return data;
}
