import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-lists">
          <div className="top-items">
            <ul>
              <NavLink>
                <li>Home</li>
              </NavLink>
              <NavLink>
                <li>Products</li>
              </NavLink>
              <NavLink to="/help">
                <li>Help</li>
              </NavLink>
              <NavLink to="/customerSupport">
                <li>Customer Services</li>
              </NavLink>
              <NavLink>
                <li>Security and Policy</li>
              </NavLink>
            </ul>
          </div>
          <hr className="horizontal-line" />
          <div className="bottom-ltems">
            <h4 style={{color:"white"}}>copyright www.ShopNest.com. All rights reserved!</h4>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
