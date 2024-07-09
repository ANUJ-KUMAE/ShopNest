import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductData } from "../Actions/ProductDatas";
import FilterProduct from "../Filter-Products/FilterProduct";
import ProductsType from "../Container/ProductsType";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PriceConverter from "../CurrencyConverter/PriceConverter";
import "../Styles/ProductCategories.css";


const Instruments = () => {
  const dispatch = useDispatch();
  const { loading, error, allGames } = useSelector((state) => state.products);
  const { filter_Products } = useSelector((state) => state.FilterDetails);


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
            <FilterProduct product={allGames} />
          </div>
          <div className="productPage-rightPart">
            {loading ? (
              <div className="page_Loading">
                <AiOutlineLoading3Quarters className="page_loading_icon" />
                <div className="page_Loading_name">Page Loading..... </div>
              </div>
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

export default Instruments;
