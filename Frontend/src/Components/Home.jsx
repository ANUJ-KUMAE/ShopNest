import React, { useEffect, useState } from "react";
import "../Styles/Home.css";
import PosterImages from "../Datas/sliderData";
import { Fade, Zoom, Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import fashion from "../Images/fashion-poster.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductData } from "../Actions/ProductDatas";
import ProductComponents from "../Container/ProductComponents";
import ProductsType from "../Container/ProductsType";
import HouseType from "../Container/HouseType";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import flight from "../Images/flight.jpg";
import Laptops from "../Container/Laptops";
import Offer from "../Container/Offer";
import fashions from "../Images/fashion.jpg";
import menac from "../Images/menaca.jpg";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, products, error, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getAllProductData());
  }, [dispatch]);

  return (
    <section>
      <div className="home-container">
        <div className="products-type">
          <ProductsType />
        </div>
        <div className="home-lists">
          <Fade>
            {PosterImages &&
              PosterImages.map((curElem) => {
                const { id, image } = curElem;
                return (
                  <figure className="Images-lists">
                    <img src={image} alt="Shop" key={id} />
                  </figure>
                );
              })}
          </Fade>
        </div>
        <div className="home-latest-list">
          {loading ? (
            <div className="page_Loading">
              <AiOutlineLoading3Quarters className="page_loading_icon" />
              <div className="page_Loading_name">Page Loading..... </div>
            </div>
          ) : (
            <ProductComponents />
          )}
        </div>
        <div className="fashion-poster">
          <div className="fashion-poster-image">
            <img src={fashion} alt="Fashion" />
            <img src={flight} alt="Flight" />
          </div>
        </div>
        <div className="home-latest-list">
          {loading ? (
            <div className="page_Loading">
              <AiOutlineLoading3Quarters className="page_loading_icon" />
              <div className="page_Loading_name">Page Loading..... </div>
            </div>
          ) : (
            <HouseType />
          )}
        </div>
        <div className="top-latest-list">
          {loading ? (
            <div className="page_Loading">
              <AiOutlineLoading3Quarters className="page_loading_icon" />
              <div className="page_Loading_name">Page Loading..... </div>
            </div>
          ) : (
            <div className="offer-lists">
              <div className="special-offer-items">
                <div>
                  <Laptops />
                </div>
                <div>
                  <Offer />
                </div>
              </div>
              <div className="offer-image">
                <img src={fashions} alt="fashion" />
                <img src={menac} alt="menaca" className="men-accasories" />
              </div>
            </div>
          )}
        </div>
        <div id="Special-Offer">
          <div className="Offer-Details">
            <div className="Offer-data">
              <h2 className="offer-heading">Limited Time Offer</h2>
              <h4 className="offer-heading-mid">
                Elevate Your Wardrobe, Embrace Timeless Style!
              </h4>

              <p className="offer-paragraph">
                Explore our collections today and experience the joy of fashion.
                Shop now for the epitome of chic sophistication!
              </p>
            </div>
            <div className="Offer-button">
              <button className="shop-Now">Shop Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
