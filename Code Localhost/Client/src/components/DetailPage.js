import { Fragment, useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  useLoaderData,
  useParams,
  json,
  Link,
  useNavigate,
} from "react-router-dom";
import classes from "./DetailPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartAction, popupAction } from "../redux/store";
const DetailPage = () => {
  const param = useParams();
  const products = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = Cookies.get("name");

  // Tắt bỏ redirect trong popupSlice
  const redirectStatus = useSelector((state) => state.popup.redirect);
  useEffect(() => {
    if (redirectStatus === true) {
      dispatch(popupAction.cancelRedirect);
    }
  }, [redirectStatus]);

  // Dùng state kiểm soát form quantity
  const [quantity, setQuantity] = useState(0);
  const decrement = () => {
    if (quantity === 0) {
      return;
    }
    setQuantity((prev) => prev - 1);
  };
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  // Find product detail based on productId
  const renderProduct = products.find((item) => item._id === param.productId);
  // console.log(renderProduct);

  // Show Related Products
  const relatedProducts = products.filter(
    (item) =>
      item._id !== param.productId && item.category === renderProduct.category
  );

  // Change Input Handler
  const changeInputHandler = (e) => {
    setQuantity(e.target.value);
  };

  // Add To Cart button handler
  const addToCartHandler = (e) => {
    e.preventDefault();
    // First check if user log in or not
    // If not then redirect to Login

    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (quantity === 0) {
      return alert("Please choose at least 1 item");
    }

    dispatch(
      cartAction.addToCart({
        id: renderProduct._id,
        name: renderProduct.name,
        price: renderProduct.price,
        img: renderProduct.img1,
        quantity: quantity,
      })
    );
    setQuantity(0);
  };

  return (
    <div className={classes.body}>
      {/* MAIN */}
      <div className={classes.main}>
        <div className={classes.info}>
          <img src={renderProduct.img1} alt="main-img" />
          <div>
            <h1>{renderProduct.name}</h1>
            <h2 className={classes.price}>{`${Number(
              renderProduct.price
            ).toLocaleString()} VND`}</h2>
            <p>{renderProduct["short_desc"]}</p>
            <h2 className={classes.category}>
              CATEGORY: <p>{`${renderProduct.category}`}</p>
            </h2>

            {/* Quantity Form */}
            <form onSubmit={addToCartHandler} className={classes.quantity}>
              <span>
                <label htmlFor="quantity">QUANTITY:</label>
                <button onClick={decrement} type="button">
                  <i className="fa-solid fa-caret-left"></i>
                </button>
                <input
                  onChange={changeInputHandler}
                  type="number"
                  className={classes.input}
                  value={quantity}
                />
                <button onClick={increment} type="button">
                  <i className="fa-solid fa-caret-right"></i>
                </button>
              </span>
              <button type="submit">Add to cart</button>
            </form>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className={classes.description}>
        <h2>DESCRIPTION</h2>

        <p>
          {renderProduct["long_desc"].split("\n").map((item, key) => {
            return (
              <span key={key}>
                {item}
                <br />
              </span>
            );
          })}
        </p>
      </div>

      {/* RELATED PRODUCTS */}
      <div className={classes.related}>
        <h2>RELATED PRODUCTS</h2>
        <div className={classes.products}>
          {relatedProducts.map((item) => (
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
          {relatedProducts.length === 0 && <p>No product found!</p>}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

export async function productLoader() {
  const fullProducts = `http://localhost:5000/`;
  const res = await fetch(fullProducts);
  const data = await res.json();
  // console.log(data);
  if (!res.ok) {
    throw json({ message: "Can not fetch trending API" }, { status: 404 });
  }

  return data;
}
