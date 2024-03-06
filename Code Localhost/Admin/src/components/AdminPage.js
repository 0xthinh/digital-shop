import { Fragment, useEffect, useState } from "react";
import classes from "./AdminPage.module.css";
import { Link, json, useLoaderData, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminPage = () => {
  const navigate = useNavigate();
  const data = useLoaderData();
  const [prod, setProd] = useState([]);
  const [searchProd, setSearchProd] = useState([]);
  const [err, setErr] = useState(null);
  const [prodName, setProdName] = useState("");

  useEffect(() => {
    if (!data) {
      return navigate("/login");
    }
    fetch("http://localhost:5000/admin/products", { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          return setErr("No product found");
        }
        return res.json();
      })

      .then((data) => {
        console.log(data);
        setProd(data);
        setSearchProd(data);
      });
  }, []);

  const searchName = (e) => {
    setProdName(e.target.value);
  };

  useEffect(() => {
    if (prodName === "") {
      return setSearchProd(prod);
    }
    const searchProdArr = prod.filter((item) =>
      item.name.toLowerCase().includes(prodName.toLowerCase())
    );
    setSearchProd(searchProdArr);
    console.log(searchProd);
  }, [prodName]);

  return (
    <div className={classes.products}>
      <h2>Product</h2>
      <form>
        <input
          onChange={searchName}
          className={classes.input}
          placeholder="Enter Name of product"
        />
      </form>
      {err && <p>{err}</p>}
      {!err && (
        <table className={classes.table}>
          <thead>
            <tr className={classes.row}>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>IMAGE</th>
              <th>CATEGORY</th>
              <th>EDIT</th>
            </tr>
          </thead>
          <tbody>
            {searchProd.map((item) => (
              <tr
                key={item._id}
                className={`${classes.row} ${classes.content}`}
              >
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{(+item.price).toLocaleString()} VND</td>
                <td>
                  <img src={item.img1} />
                </td>
                <td>{item.category}</td>
                <td>
                  <button
                    className={classes.button}
                    style={{ backgroundColor: "green" }}
                  >
                    Update
                  </button>
                  <button
                    className={classes.button}
                    style={{ backgroundColor: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;

// Load data from API

export async function checkUser() {
  const currentUser = Cookies.get("name");
  if (!currentUser) {
    return false;
  } else {
    return true;
  }
}
