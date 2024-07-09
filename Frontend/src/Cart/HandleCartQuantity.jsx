import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { CartProduct } from "../Actions/CartAction";

const HandleCartQuantity = ({ id, quantity, stock }) => {
  const [cartQuantity, setCartQuantity] = useState(quantity);
  const dispatch = useDispatch();

  const DecreaseQuantity = () => {
    if (cartQuantity > 1) {
      const newQuantity = cartQuantity - 1;
      setCartQuantity(newQuantity);
      dispatch(CartProduct(id, newQuantity));
    }
  };

  const IncreaseProduct = () => {
    if (cartQuantity < stock) {
      const newQuantity = cartQuantity + 1;
      setCartQuantity(newQuantity);
      dispatch(CartProduct(id, newQuantity));
    }
  };

  return (
    <div>
      <div className="amount-toogle">
        <button
          onClick={() => DecreaseQuantity()}
          className="btnn"
          disabled={cartQuantity <= 1}
        >
          <FaMinus className="f-minus" />
        </button>
        <div className="amount-quantity">{cartQuantity}</div>
        <button
          onClick={() => IncreaseProduct()}
          className="btnn"
          disabled={cartQuantity >= stock}
        >
          <FaPlus className="f-plus" />
        </button>
      </div>
    </div>
  );
};

export default HandleCartQuantity;
