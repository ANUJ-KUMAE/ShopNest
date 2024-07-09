import React from "react";
import "../Styles/ProductCategories.css";
import { NavLink, Outlet } from "react-router-dom";
import fashion from "../Images/Fashion.png";
import house from "../Images/house.png";
import Toy from "../Images/Toys.png";
import elec from "../Images/Electronic.png";

const ProductsType = () => {
  return (
    <section>
      <div className="product-type-lists">
        <div className="product-categories">
          <ul className="products-lists-names">
            <li>
              <NavLink>
                <li className="home-nav-names">
                  <img src={fashion} alt="Fashion" className="product-icon" />
                  <h4>Fashion</h4>
                </li>
              </NavLink>
              <ul className="Menu-Dropdown">
                <li>
                  <NavLink to="/product/cloth">Cloths</NavLink>
                </li>
                <hr className="drop-lists-horizontal"/>
                <li>
                  <NavLink to="/product/shoes">Shoes</NavLink>
                </li>
                <hr className="drop-lists-horizontal"/>
                <li>
                  <NavLink to="/product/assasories">Assasories</NavLink>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="products-lists-names">
            <li>
              <NavLink>
                <li className="home-nav-names">
                  <img src={elec} alt="Electronics" className="product-icon" />
                  <h4>Electronic</h4>
                </li>
              </NavLink>
              <ul className="Menu-Dropdown">
                <li>
                  <NavLink to="/product/Mobile">Mobiles</NavLink>
                </li>
                <hr className="drop-lists-horizontal"/>
                <li>
                  <NavLink to="/product/Tablet">Tablets</NavLink>
                </li>
                <hr className="drop-lists-horizontal"/>
                <li>
                  <NavLink to="/product/Watch">SmartWatches</NavLink>
                </li>
                <hr className="drop-lists-horizontal"/>
                <li>
                  <NavLink to="/product/laptop">Laptops</NavLink>
                </li>
                <hr className="drop-lists-horizontal"/>
                <li>
                  <NavLink to="/product/camera">Cameras</NavLink>
                </li>
                <hr className="drop-lists-horizontal" />
                <li>
                  <NavLink to="/product/headphone">Headphone</NavLink>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="products-lists-names">
            <li>
              <NavLink>
                <li className="home-nav-names">
                  <img src={house} alt="House" className="product-icon" />
                  <h4>Home</h4>
                </li>
              </NavLink>
              <ul className="Menu-Dropdown">
                <li>
                  <NavLink to="/product/decore">Decore</NavLink>
                </li>
                <hr className="drop-lists-horizontal" />
                <li>
                  <NavLink to="/product/bhealth">Beauty/Health</NavLink>
                </li>
                <hr className="drop-lists-horizontal" />
                <li>
                  <NavLink to="/product/luggague">Luggague</NavLink>
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink>
                <li className="home-nav-names">
                  <img src={Toy} alt="Toys" className="product-icon" />
                  <h4>Toys & more</h4>
                </li>
              </NavLink>
              <ul className="Menu-Dropdown">
                <li>
                  <NavLink to="/product/bag">Bags</NavLink>
                </li>
                <hr className="drop-lists-horizontal" />
                <li>
                  <NavLink to="/product/book">Books</NavLink>
                </li>
                <hr className="drop-lists-horizontal" />
                <li>
                  <NavLink to="/product/sport">Sports</NavLink>
                </li>
                <hr className="drop-lists-horizontal" />
                <li>
                  <NavLink to="/product/instruments">Instruments</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductsType;
