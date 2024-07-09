import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaIndianRupeeSign } from "react-icons/fa6";
import "./ConfirmOrder.css";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.Authentication);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const total = calculateTotal();

  const shippingCharge = total > 500 ? 0 : 80;

  const deliveryCharge = total > 500 ? 0 : 50;

  const gst = total * 0.18;
  const grandTotal = total + gst + shippingCharge + deliveryCharge;

  const ProccedToPay = () => {
    const Data = {
      Total: total.toFixed(2),
      ShippingCharge: shippingCharge.toFixed(2),
      DeliveryCharge: deliveryCharge.toFixed(2),
      GST: gst.toFixed(2),
      GrandTotal: grandTotal.toFixed(2),
    };

    sessionStorage.setItem("OrderInfo", JSON.stringify(Data));
    navigate("/payment");
    //navigate("/shippingInfo")
  };

  return (
    <section>
      <div className="confirmOrder-Container">
        <div className="order-details">
          <div className="User-Details-Section">
            <div className="User-Details-Title">
              <h2>Thank You For Your Purchage</h2>
            </div>
            <div className="Billing-Information">
              <h3>Billing Address</h3>
              <div className="user-fill-info">
                <p>
                  <span>Name:</span> {user.userName}
                </p>
                <p>
                  <span>Address:</span> {shippingInfo.address}{" "}
                  {shippingInfo.city} {shippingInfo.postalcode}
                </p>
                <p>
                  <span>Phone:</span> {user.phone}
                </p>
                <p>
                  <span>Email:</span> {user.email}
                </p>
              </div>
            </div>
            <div>
              <button className="btn confirm-order" onClick={ProccedToPay}>
                Procced To Pay
              </button>
            </div>
          </div>
          <div className="Order-Summary-Section">
            <div className="Order-Container">
              <div className="order-summary-title">
                <h2>Order Summary</h2>
              </div>
              <div className="Order-item-list-And-Billing">
                {cartItems &&
                  cartItems.map((curElem) => {
                    return (
                      <div className="order-datas-list-item" key={curElem.id}>
                        <div className="order-items-image">
                          <img src={curElem.image} alt={curElem.name} />
                        </div>
                        <div className="order-detail">
                          <div className="order-info">
                            <div className="order-item-name">
                              <h4>{curElem.name}</h4>
                            </div>
                          </div>
                          <div className="price-info">
                            <FaIndianRupeeSign className="price-symbol"/>
                            <h4>{curElem.price * curElem.quantity}</h4>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <hr className="horizontal-line-order" />
              <div className="total-info">
                <p>
                  <span>Total:</span> <FaIndianRupeeSign /> {total.toFixed(2)}
                </p>
                <p>
                  <span>GST (18%):</span> <FaIndianRupeeSign /> {gst.toFixed(2)}
                </p>
                <p>
                  <span>Shipping Charge:</span> <FaIndianRupeeSign />{" "}
                  {shippingCharge.toFixed(2)}
                </p>
                <p>
                  <span>Delivery Charge:</span> <FaIndianRupeeSign />{" "}
                  {deliveryCharge.toFixed(2)}
                </p>
                <p>
                  <span>Grand Total:</span> <FaIndianRupeeSign />{" "}
                  {grandTotal.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmOrder;
