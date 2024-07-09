import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleOrder } from "../Actions/OrderAction";
import { useParams } from "react-router-dom";
import "./ConfirmOrder.css";

const UserSingleOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { SingleOrderLoading, singleOrderStatus, error } = useSelector(
    (state) => state.SingleOrderData
  );

  useEffect(() => {
    dispatch(GetSingleOrder(id));
  }, [dispatch, id]);

  if (SingleOrderLoading) {
    return <div>Single Order.....</div>;
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
              <p>
                <span>Address:</span> {shippingInfo.address}
              </p>
              <p>
                <span>City:</span> {shippingInfo.city}
              </p>
              <p>
                <span>Postal Code:</span> {shippingInfo.postalCode}
              </p>
              <p>
                <span>Country:</span> {shippingInfo.country}
              </p>
              <p>
                <span>Mobile Number:</span> {shippingInfo.phone}
              </p>
            </div>
          </div>
          <div className="Order-detail-Container">
            <h4 className="order-heading">Payment Info</h4>
            <div className="detail-types">
              <p>
                <span>Payment Id:</span> {paymentInfo.id}
              </p>
              <p>
                <span>Status:</span> {paymentInfo.status}
              </p>
            </div>
          </div>
          <div className="Order-detail-Container">
            <h4 className="order-heading">Order Items</h4>
            <div className="detail-types">
              {orderItems.map((curEle, inde) => {
                return (
                  <div key={inde} className="order-list">
                    <div>
                      <p>
                        <span>Name:</span> {curEle.name}
                      </p>
                      <p>
                        <span>Quantity:</span> {curEle.quantity}
                      </p>
                      <p>
                        <span>Price:</span>
                        {curEle.price}
                      </p>
                      <p>
                        <span>Product: </span>
                        {curEle.product}
                      </p>
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
              <p>
                <span>PaidAt:</span> {paidAt}
              </p>
              <p>
                <span>Item Price:</span> {itemPrice}
              </p>
              <p>
                <span>Tax Price:</span> {taxPrice}
              </p>
              <p>
                <span>Shipping Price:</span> {shippingPrice}
              </p>
              <p>
                <span>Total Price:</span> {totalPrice}
              </p>
              <p>
                <span>Order Status:</span> {orderStatus}
              </p>
              <p>
                <span>OrderAt:</span> {createdAt}
              </p>
              <p>
                <span>DeliveryAt:</span> {deliverAt}
              </p>
              <p>
                <span>User Id:</span> {user}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserSingleOrder;
