import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductData } from "../Actions/ProductDatas";

const Products = () => {
  const dispatch = useDispatch();

  const { loading, products, error, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getAllProductData());
  }, [dispatch]);

  return (
    <section>
      <div className="home-section">
        <div className="latest-product-title">
          <h3>Our Products</h3>
        </div>
        {loading ? (
          <h3>Loading Products</h3>
        ) : (
          <div className="home-section-datas">
            {products &&
              products.map((curElement) => {
                const { _id, images, name } = curElement;
                return (
                  <div key={_id} className="Products-lists-Datas">
                    <Link to={`/singleProduct/${_id}`}>
                      <div className="AllProducts">
                        <div className="image-container">
                          <img src={images[0].URL} alt={name} />
                        </div>
                        <div className="content">
                          <div>{name}</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
