import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PriceConverter from "../CurrencyConverter/PriceConverter";

const Offer = () => {
  const { featureProduct } = useSelector((state) => state.products);

  return (
    <section>
      <div className="home-section offer-section">
        <div className="H-Kitchen-title">
          <h3 className="lastest-product-title">Summer Offer</h3>
        </div>
        <div className="offer-section-datas">
          {featureProduct &&
            featureProduct
              .filter((curElement) => curElement.category === "Luggage")
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

export default Offer;
