import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import "./SearchPage.css";
import Sorry from "../Images/Sorry.jpg";

const SearchPage = () => {
  const { SearchLoading, SearchProduct, error, SearchSuccess } = useSelector(
    (state) => state.UserProductSearch
  );

  const getFirstTwoWords = (text) => {
    return text.split(" ").slice(0, 2).join(" ");
  };

  return (
    <section>
      <div className="ProductPage-Container searchpage-Container">
        {SearchProduct.length == 0 ? (
          <div className="Search-item-container">
            <div className="Search-data-lists">
              <img src={Sorry} alt="Sorry" />
              <p className="Search-paragraph">No Item of This Type..</p>
            </div>
          </div>
        ) : (
          <>
            <div className="search-section-datas">
              {SearchProduct &&
                SearchProduct.map((curElement) => {
                  const { _id, images, name } = curElement;
                  return (
                    <div key={_id} className="Products-lists-Datas search-lists-datas">
                      <Link to={`/singleProduct/${_id}`}>
                        <div className="cards">
                          <figure>
                            <img src={images[0].URL} alt={name} />
                          </figure>

                          <div className="card-data">
                            <div className="card-data-flex">
                              <h3>{getFirstTwoWords(name)}</h3>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
