import React, { useEffect, useState } from "react";
import "../Styles/ProductCategories.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getAllProductData } from "../Actions/ProductDatas";
import FilterProduct from "../Filter-Products/FilterProduct";
import { CartProduct } from "../Actions/CartAction";
import { FaCartShopping } from "react-icons/fa6";
import ProductsType from "../Container/ProductsType";
import PriceConverter from "../CurrencyConverter/PriceConverter";

const Books = () => {
  const dispatch = useDispatch();
  // const [quantity, setQuantity] = useState(1);

  const { loading, error, allBooks } = useSelector((state) => state.products);
  const { filter_Products } = useSelector((state) => state.FilterDetails);

  const [nBHealth, setNBHealth] = useState(allBooks);

  useEffect(() => {
    dispatch(getAllProductData());
  }, [dispatch]);

  const getFirstTwoWords = (text) => {
    return text.split(" ").slice(0, 2).join(" ");
  };

  return (
    <section>
      <div className="ProductPage-Container">
        <div className="products-type">
          <ProductsType />
        </div>
        <div className="ProductPage-datas">
          <div className="productPage-leftPart">
            <FilterProduct product={allBooks} />
          </div>
          <div className="productPage-rightPart">
            {loading ? (
              <h3>Products Loading</h3>
            ) : (
              <div className="product-section-datas">
                {filter_Products &&
                  filter_Products.map((curElement) => {
                    const { _id, images, name, price } = curElement;
                    return (
                      <div key={_id} className="Product-lists-Datas">
                        <Link to={`/singleProduct/${_id}`}>
                          <div className="cards">
                            <figure>
                              <img src={images[0].URL} alt={name} />
                            </figure>

                            <div className="card-data">
                              <div className="card-data-flex">
                                <h3>{getFirstTwoWords(name)}</h3>
                                <h3>{<PriceConverter price={price} />}</h3>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Books;
