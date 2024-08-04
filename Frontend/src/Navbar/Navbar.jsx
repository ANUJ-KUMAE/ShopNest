import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Shop from "../Images/ShopTr.png";
import { FaCartShopping } from "react-icons/fa6";
import "./Navbar.css";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAction } from "../Actions/LoginSignupAction";
import SearchComponent from "./SearchComponent";
import { CgProfile } from "react-icons/cg";
import { BsFillCartCheckFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { RiLogoutCircleRFill } from "react-icons/ri";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state) => state.Authentication
  );

  const { cartItems, totalItem, totalAmount } = useSelector(
    (state) => state.cart
  );

  const navigate = useNavigate();

  const LogOut = () => {
    dispatch(LogoutAction());
    navigate("/");
  };

  return (
    <header>
      <div className="header-container">
        <div className="left-part">
          <NavLink to="/">
            <img src={Shop} alt="Shop" className="shop-Image" />
          </NavLink>
        </div>
        <div className="mid-part">
          <SearchComponent />
        </div>
        <div className="right-part">
          <ul className="right-part-list">
            {/* <li>
              <NavLink to="/products">Products</NavLink>
            </li> */}
            {isAuthenticated ? (
              <ul>
                <li className="user-name-icon">
                  <NavLink>
                    <li className="arrow-icon user-name">
                      {user && user.userName}
                      <FaChevronDown />
                    </li>
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li className="drop-lists">
                      <NavLink to="/profile">
                        <CgProfile className="drop-list-icons" />
                        Profile
                      </NavLink>
                    </li>
                    <hr className="drop-lists-horizontal" />
                    <li className="drop-lists">
                      <NavLink to="/userOrder">
                        <BsFillCartCheckFill className="drop-list-icons" />
                        Orders
                      </NavLink>
                    </li>
                    {user && user.isAdmin ? (
                      <>
                        <hr className="drop-lists-horizontal" />
                        <li className="drop-lists">
                          <NavLink to="/admin">
                            <RiAdminFill className="drop-list-icons" />
                            Admin
                          </NavLink>
                        </li>
                      </>
                    ) : null}
                    <hr className="drop-lists-horizontal" />
                    <li className="logout-lists">
                      <NavLink to="/" onClick={LogOut}>
                        <RiLogoutCircleRFill className="drop-list-icons" />
                        LogOut
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </ul>
            )}
            <NavLink to="/cart">
              <li className="arrow-icon">
                <FaCartShopping className="cart" />
                <div className="cart-item-length">{cartItems.length}</div>
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
