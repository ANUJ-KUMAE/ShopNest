import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CartProduct } from "../Actions/CartAction";
import { FaCartShopping } from "react-icons/fa6";

const AddToCart = ({ product }) => {
  const { _id, stock } = product;
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const IncreaseProduct = () => {
    quantity < stock ? setQuantity(quantity + 1) : setQuantity(stock);
  };

  const DecreaseQuantity = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  };

  const addtocart = () => {
    dispatch(CartProduct(_id, quantity));
  };

  return (
    <div className="cart-conatiner">
      <div className="cart-button">
        <div className="amount-toogle">
          <button onClick={() => DecreaseQuantity()} className="btnn">
            <FaMinus className="f-minus" />
          </button>
          <div className="amount-quantity">{quantity}</div>
          <button onClick={() => IncreaseProduct()} className="btnn">
            <FaPlus className="f-plus" />
          </button>
        </div>
        <div className="cart-buy-button">
          <NavLink to="/cart">
            <button className="cart-btn" onClick={addtocart}>
              <FaCartShopping className="add-cart-icon" />
              Add To Cart
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
