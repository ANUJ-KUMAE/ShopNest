import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SingleUserOrder } from "../../../Actions/OrderAction";
import "../../../Styles/AdminSidebar.css";

const OrderDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { SingleOrderLoading, singleOrderStatus, error } = useSelector(
    (state) => state.SingleOrderData
  );

  useEffect(() => {
    dispatch(SingleUserOrder(id));
  }, [dispatch, id]);

  if (SingleOrderLoading) {
    return <div>Single Order.....</div>;
  }

  if (!singleOrderStatus) {
    return <div>No order details available.</div>;
  }

  const {
    shippingInfo = {},
    paymentInfo = {},
    orderItems = [],
    paidAt,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderStatus,
    createdAt,
    deliverAt,
    user,
  } = singleOrderStatus;

  return (
    <section>
      <div className="Single-Order-Details">
        <div>
          <h2 className="Main-heading">Order Information</h2>
        </div>
        <div className="Order-Info">
          <div className="Order-detail-Container">
            <h4 className="order-heading">Shipping Info</h4>
            <div className="detail-types">
              <p>Address: {shippingInfo.address}</p>
              <p>City: {shippingInfo.city}</p>
              <p>Postal Code: {shippingInfo.postalCode}</p>
              <p>Country:{shippingInfo.country}</p>
              <p>Mobile Number:{shippingInfo.phone}</p>
            </div>
          </div>
          <div className="Order-detail-Container">
            <h4 className="order-heading">Payment Info</h4>
            <div className="detail-types">
              <p>Payment Id: {paymentInfo.id}</p>
              <p>Status: {paymentInfo.status}</p>
            </div>
          </div>
          <div className="Order-detail-Container">
            <h4 className="order-heading">Order Items</h4>
            <div className="detail-types">
              {orderItems &&
                orderItems.map((curEle, inde) => {
                  return (
                    <div key={inde} className="order-list">
                      <div>
                        <p>Name: {curEle.name}</p>
                        <p>Quantity: {curEle.quantity}</p>
                        <p>Price:{curEle.price}</p>
                        <p>Product:{curEle.product}</p>
                      </div>
                      <div className="p-order-images">
                        <img src={curEle.image} alt="Product Image" />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="Order-detail-Container">
            <div className="detail-types">
              <p>PaidAt: {paidAt}</p>
              <p>Item Price: {itemPrice}</p>
              <p>Tax Price: {taxPrice}</p>
              <p>Shipping Price:{shippingPrice}</p>
              <p>Total Price:{totalPrice}</p>
              <p>Order Status:{orderStatus}</p>
              <p>OrderAt:{createdAt}</p>
              <p>DeliveryAt:{deliverAt}</p>
              <p>User Id:{user}</p>
              <p>Order Id:{id}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
