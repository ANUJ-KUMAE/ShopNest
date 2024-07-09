import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PriceConverter from "../CurrencyConverter/PriceConverter";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Laptops = () => {
  const { featureProduct } = useSelector((state) => state.products);

  return (
    <section>
      <div className="home-section offer-section">
        <div className="H-Kitchen-title">
          <h3 className="lastest-product-title">Top Deals on Laptop</h3>
        </div>
        <div className="offer-section-datas">
          {featureProduct &&
            featureProduct
              .filter((curElement) => curElement.category === "Laptop")
              .map((curElement) => {
                const { _id, images, name, price } = curElement;
                return (
                  <div key={_id} className="offer-lists-Datas">
                    <Link to={`/singleProduct/${_id}`}>
                      <div className="cards">
                        <figure>
                          <img src={images[0].URL} alt={name} />
                        </figure>

                        <div className="card-data">
                          <div className="card-data-flex">
                            <h3>{name}</h3>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default Laptops;
