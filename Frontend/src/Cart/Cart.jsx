import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { RemoveItemFromCart } from "../Actions/CartAction";
import "../Styles/Cart.css";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { FaMinus, FaPlus } from "react-icons/fa";
import CalculateTotal from "./CalculateTotal";
import HandleCartQuantity from "./HandleCartQuantity";


const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.Authentication);
  const dispatch = useDispatch();
  const [items, setItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const deleteitemcart = (id) => {
    dispatch(RemoveItemFromCart(id));
  };

 
  useEffect(() => {
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const amount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    setItems(totalItems);
    setTotalAmount(amount);
  });

  return (
    <section>
      <div className="Cart-lists">
        {isAuthenticated ? (
          <div className="cart-authentication">
            {cartItems.length == 0 ? (
              <div className="cart-name-title">
                <FaCartShopping className="cart-icon" />
                <h3>No Item in Cart</h3>
              </div>
            ) : (
              <div className="cart-left-right-part">
                <div className="cart-data">
                  {cartItems.map((curElem) => {
                    const { id, name, price, image, quantity, stock } = curElem;
                    return (
                      <div className="cart-datas-list-item" key={id}>
                        <Link to={`/singleProduct/${id}`}>
                          <div className="product-image cart-image">
                            <img src={image} alt={name} />
                          </div>
                        </Link>
                        <div className="product-details">
                          <div className="product-info">
                            <div className="product-name">
                              <h4>{name}</h4>
                            </div>
                            <div className="amount-toogle-item">
                               <HandleCartQuantity id={id} quantity={quantity} stock={stock} />
                            </div>
                            <div className="product-stock">
                              <p>
                                <span>Stock: </span>
                                {stock - quantity}
                              </p>
                            </div>
                            <div className="remove-button">
                              <button onClick={() => deleteitemcart(id)} className="delete-button">
                                <MdDelete className="delete-icon" />
                              </button>
                            </div>
                          </div>
                          <div className="price-info">
                            <FaIndianRupeeSign className="price-symbol"/>
                            <h4>{price * quantity}</h4>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="order-Summary">
                  <CalculateTotal items={items} totalAmount={totalAmount}/>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="Not-Authenticated-user">
            <h3>Cart Empty</h3>
            <p>Login to see the items</p>
            <button className="btn btnn">
              <NavLink to="/login">Login</NavLink>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
