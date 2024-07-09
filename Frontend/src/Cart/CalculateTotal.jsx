import React from "react";
import { NavLink } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { AiFillSafetyCertificate } from "react-icons/ai";

const CalculateTotal = ({ items, totalAmount }) => {
  return (
    <div className="Calculate-Container">
      <div className="order-lists">
        <div className="summary-title">
          <h3>Order Summary</h3>
        </div>
        <hr className="order-summary-hr"/>
        <div className="order-summary-list">
          <div className="summary-items">Total Products: {items}</div>
          <div className="Item-Total">
            Total Amount: <FaIndianRupeeSign className="price-symbols" />
            {totalAmount}
          </div>
        </div>
        <hr className="order-summary-h"/>
        <div className="Check Now">
          <NavLink to="/shippingInfo">
            <button className="btn buy-btn">Buy</button>
          </NavLink>
          <div className="important-instruct">
            <AiFillSafetyCertificate className="safe-icom" />
            Safe and Secure Payments.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculateTotal;
