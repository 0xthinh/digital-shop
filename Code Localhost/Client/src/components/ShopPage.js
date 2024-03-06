import { Fragment, useEffect, useRef, useState } from "react";
import {
  Link,
  json,
  useLoaderData,
  useNavigation,
  useParams,
} from "react-router-dom";
import classes from "./ShopPage.module.css";
import { useDispatch } from "react-redux";

const ShopPage = () => {
  const products = useLoaderData();
  const [categoryClicked, setCategoryClicked] = useState("All");

  const identifyCategory = (e) => {
    setCategoryClicked(e.target.innerHTML);
  };

  // Create render array
  let renderProducts = [];

  if (categoryClicked === "All") {
    renderProducts = [...products];
  } else {
    renderProducts = products.filter(
      (item) => item.category === categoryClicked.toLowerCase()
    );
  }

  return (
    <Fragment>
      <div className={classes.placeholder}>
        <div>
          <h1>SHOP</h1>
          <h2>SHOP</h2>
        </div>
      </div>
      {/* Sidebar */}
      <div className={classes.shop}>
        <div className={classes.sidebar}>
          <h2 className={classes.header}>Categories</h2>
          <div className={classes["sidebar-list"]} onClick={identifyCategory}>
            <h1>APPLE</h1>
            <Link>All</Link>
            <h2>IPHONE & MAC</h2>
            <Link>iPhone</Link>
            <Link>iPad</Link>
            <Link>Macbook</Link>
            <h2>WIRELESS</h2>
            <Link>Airpod</Link>
            <Link>Watch</Link>
            <h2>OTHER</h2>
            <Link>Mouse</Link>
            <Link>Keyboard</Link>
            <Link>Other</Link>
          </div>
        </div>

        {/* filters */}
        <div className={classes.filterProduct}>
          <div className={classes.filter}>
            <input type="text" placeholder="Enter Search Here" />
            <select name="sort">
              <option>Default Sorting</option>
              <option>Price (ascending)</option>
              <option>Price (decending)</option>
            </select>
          </div>

          {/* Products */}
          <div className={classes.products}>
            {renderProducts.map((item) => (
              <Link
                to={`/detail/${item._id}`}
                key={item._id}
                className={classes.item}
              >
                <img src={item.img1} />
                <h1 className={classes.name}>{item.name}</h1>
                <h2 className={classes.price}>{`${Number(
                  item.price
                ).toLocaleString()} VND`}</h2>
              </Link>
            ))}
            {renderProducts.length === 0 && <p>No product found!</p>}
          </div>

          <div className={classes.navigator}>
            <div className={classes.arrow}>
              <button>
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <span>
                <p>1</p>
              </span>
              <button>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            <p>Showing 1/9 pages</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShopPage;

export async function productLoader() {
  const trendingAPI = "http://localhost:5000";
  const res = await fetch(trendingAPI);
  const data = await res.json();
  // console.log(data);
  if (!res.ok) {
    throw json({ message: "Can not fetch trending API" }, { status: 404 });
  }

  return data;
}
