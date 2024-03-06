import { Fragment, useEffect, useState } from "react";
import classes from "./History.module.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const History = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const currentUser = Cookies.get("name");
    if (!currentUser) {
      return navigate("/login");
    }

    const fetchOrderList = async () => {
      const res = await fetch("http://localhost:5000/shop/history", {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        return setOrderList(null);
      }
      setOrderList(data);
      // console.log(data);
    };
    fetchOrderList();
  }, []);

  // Get order detail
  const getOrderDetailHandler = (id) => {
    navigate(`/history/${id}`);
  };

  return (
    <div>
      <div className={classes.placeholder}>
        <div>
          <h1>HISTORY</h1>
          <h2>HISTORY</h2>
        </div>
      </div>
      <div className={classes.table}>
        <table>
          <thead>
            <tr className={classes.row}>
              <th>ID ORDER</th>
              <th>ID USER</th>
              <th>NAME</th>
              <th>PHONE</th>
              <th>ADDRESS</th>
              <th>TOTAL</th>
              <th>DELIVERY</th>
              <th>STATUS</th>
              <th>DETAIL</th>
            </tr>
          </thead>
          <tbody>
            {!orderList && (
              <h2 style={{ textAlign: "center" }}>No order found</h2>
            )}
            {orderList &&
              orderList.map((item) => (
                <tr
                  key={item._id}
                  className={`${classes.row} ${classes.content}`}
                >
                  <td>{item._id}</td>
                  <td>{item.userId._id}</td>
                  <td>{item.userInfo.fullName}</td>
                  <td>{item.userInfo.phone}</td>
                  <td>{item.userInfo.address}</td>
                  <td>{item.total.toLocaleString()}</td>
                  <td>Delivering...</td>
                  <td>Waiting for pay</td>
                  <td>
                    <button
                      onClick={() => {
                        getOrderDetailHandler(item._id);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
