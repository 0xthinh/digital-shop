import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./HistoryDetail.module.css";

const HistoryDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    const currentUser = Cookies.get("name");
    if (!currentUser) {
      return navigate("/login");
    }

    const getOrderDetail = async () => {
      const res = await fetch(
        `http://localhost:5000/shop/history/${params.orderId}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        return setOrderDetail(null);
      }
      setOrderDetail(data);
      // console.log(data);
    };
    getOrderDetail();
  }, [params.orderId]);

  return (
    <div className={classes.wrapper}>
      {!orderDetail && <h2 style={{ textAlign: "center" }}>No order found</h2>}
      {orderDetail && (
        <>
          <div className={classes.overview}>
            <h1>INFORMATION ORDER</h1>
            <p>ID User: {orderDetail.userId}</p>
            <p>Full Name: {orderDetail.userInfo.fullName}</p>
            <p>Phone: {orderDetail.userInfo.phone}</p>
            <p>Address: {orderDetail.userInfo.address}</p>
            <p>Total: {orderDetail.total.toLocaleString()} VND</p>
          </div>
          <div className={classes.products}>
            <table className={classes.table}>
              <thead>
                <tr className={classes.row}>
                  <th>ID PRODUCT</th>
                  <th>IMAGE</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>COUNT</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail.products.map((item) => (
                  <tr
                    key={item.id}
                    className={`${classes.row} ${classes.content}`}
                  >
                    <td>{item.id}</td>
                    <td>
                      <img src={item.img} />
                    </td>
                    <td>{item.name}</td>
                    <td>{(+item.price).toLocaleString()} VND</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default HistoryDetail;
