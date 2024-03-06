import { useDispatch, useSelector } from "react-redux";
import classes from "./CartPage.module.css";
import { cartAction } from "../redux/store";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = Cookies.get("name");
  if (!currentUser) {
    navigate("/login");
  }

  // Get the cart state
  const cart = useSelector((state) => state.cart);
  // console.log(cart);

  // Function dispatch action to update cart state
  const updateCartHandler = (prod) => {
    if (prod.quantity === "") {
      prod.quantity = "0";
    }
    dispatch(cartAction.updateCart(prod));
  };

  const removeProductHandler = (id) => {
    dispatch(cartAction.removeOutOfCart(id));
  };

  const decrementHandler = (prod) => {
    // console.log(prod.quantity);
    if (prod.quantity == "1") {
      dispatch(cartAction.removeOutOfCart(prod));
      return;
    }
    dispatch(cartAction.decrement(prod));
  };
  const incrementHandler = (prod) => {
    // console.log("increment");
    dispatch(cartAction.increment(prod));
  };

  // Redirect
  const toShopPage = () => {
    navigate("/shop");
  };
  const toCheckoutPage = () => {
    // console.log(cart);
    if (cart.length === 0) {
      return navigate("/shop");
    }
    navigate("/checkout");
  };

  // Cart total calculation
  let total = 0;
  cart.map((item) => (total += item.quantity * item.price));

  return (
    <div className={classes.body}>
      {/* PLACEHOLDER */}
      <div className={classes.placeholder}>
        <div>
          <h1>CART</h1>
          <h2>CART</h2>
        </div>
      </div>

      {/* CART */}
      <div className={classes.cart}>
        <div className={classes.list}>
          <div className={classes.title}>
            <h3>IMAGE</h3>
            <h3>PRODUCT</h3>
            <h3>PRICE</h3>
            <h3>QUANTITY</h3>
            <h3>TOTAL</h3>
            <h3>REMOVE</h3>
          </div>
          {/* Display cart products */}
          {cart.map((item) => (
            <div key={item.id} className={classes.products}>
              <img src={item.img} />
              <h3>{item.name}</h3>
              <p>{`${Number(item.price).toLocaleString()} VND`}</p>
              <form className={classes.quantity}>
                <span>
                  <button
                    onClick={() => {
                      decrementHandler({
                        id: item.id,
                        quantity: item.quantity,
                      });
                    }}
                    type="button"
                  >
                    <i className="fa-solid fa-caret-left"></i>
                  </button>
                  <input
                    onChange={(e) => {
                      // console.log(cart);
                      updateCartHandler({
                        id: item.id,
                        quantity: e.target.value,
                      });
                    }}
                    type="number"
                    className={classes.input}
                    value={item.quantity}
                    required
                  />
                  <button
                    onClick={() => {
                      incrementHandler({
                        id: item.id,
                        quantity: item.quantity,
                      });
                    }}
                    type="button"
                  >
                    <i className="fa-solid fa-caret-right"></i>
                  </button>
                </span>
              </form>
              <p>{`${(+item.price * +item.quantity).toLocaleString()} VND`}</p>
              <button
                type="button"
                onClick={() => removeProductHandler(item.id)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          ))}
          <div className={classes["checkout-nav"]}>
            <button onClick={toShopPage}>
              <i className="fa-solid fa-arrow-left"></i>Back to shop
            </button>
            <button onClick={toCheckoutPage}>
              Proceed to Checkout
              <i
                className="fa-solid fa-arrow-right"
                style={{ color: "#ffffff" }}
              ></i>
            </button>
          </div>
        </div>

        {/* TOTAL COST */}
        <div className={classes.total}>
          <h2>CART TOTAL</h2>
          <div className={classes.cost}>
            <span>
              <h3>SUBTOTAL</h3>
              <p>{`${total.toLocaleString()} VND`}</p>
            </span>
            <span>
              <h3>TOTAL</h3>
              <p>{`${total.toLocaleString()} VND`}</p>
            </span>
          </div>

          <div className={classes.coupon}>
            <input type="text" placeholder="Enter your coupon here" />
            <button>
              <i className="fa-solid fa-gift" style={{ color: "#ffffff" }}></i>{" "}
              Apply coupon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
