import React, { useEffect } from "react";
import "./Filter.css";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_FILTER,
  LOAD_PRODUCTS,
  FILTER_PRODUCTS,
  SORTING_PRODUCTS,
} from "../Constants/FilterConstant";
import {
  UpdateFilterProducts,
  UserSortingProduct,
} from "../Actions/FilterAction";
import WMC from "../Images/WMC.jpg";

const FilterProduct = ({ product }) => {
  const {
    filters: { text, category, company, maxPrice, price, minPrice },
    all_Products,
  } = useSelector((state) => state.FilterDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_PRODUCTS,
      payload: product,
    });
  }, [product]);

  useEffect(() => {
    if (all_Products.length) {
      dispatch({ type: FILTER_PRODUCTS });
      dispatch({ type: SORTING_PRODUCTS });
    }
  }, [all_Products, text, category, company, price, dispatch]);

  const getUniqueData = (data, attr) => {
    let newVal = data.map((curElem) => {
      return curElem[attr];
    });

    return (newVal = ["all", ...new Set(newVal)]);
  };

  const categoryData = getUniqueData(all_Products, "category");
  const companyData = getUniqueData(all_Products, "company");

  const UpdateProductFilter = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    dispatch(UpdateFilterProducts(name, value, product));
  };

  const clearFilters = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };

  const sorting = (event) => {
    const userValue = event.target.value;
    dispatch(UserSortingProduct(userValue, product));
  };

  return (
    <div className="Filter-Container">
      <div className="filter-types">
        <div className="filter-top">
          <div className="filter-image">
            <img src={WMC} alt="WMC" />
          </div>
        </div>
        <div className="filter-bottom">
          <div className="filter-products">
            <h4 className="filter-heading">Filter Products</h4>
          </div>
          <div className="sort-Selection">
            <form action="#">
              <label htmlFor="sort"></label>
              <select
                name="sort"
                id="sort"
                className="sort-selection--style"
                onChange={sorting}
                style={{cursor:"pointer"}}
              >
                <option value="lowest">Price(lowest)</option>
                <option value="#" disabled></option>
                <option value="highest">Price(highest)</option>
                <option value="#" disabled></option>
                <option value="a-z">Name(a-z)</option>
                <option value="#" disabled></option>
                <option value="z-a">Name(z-a)</option>
              </select>
            </form>
          </div>

          {/* <div className="filter-category">
            <h3>Category</h3>
            <div className="fit-Categ">
              {categoryData &&
                categoryData.map((curElem, index) => {
                  return (
                    <button
                      key={index}
                      type="button"
                      name="category"
                      value={curElem}
                      className={curElem === category ? "active" : ""}
                      onClick={UpdateFilterProducts}
                    >
                      {curElem}
                    </button>
                  );
                })}
            </div>
          </div> */}

          <div className="filter-company">
            <h3>Company</h3>

            <form action="#">
              <select
                name="company"
                id="company"
                className="filter-company--select"
                onChange={UpdateProductFilter}
                style={{cursor:"pointer"}}
              >
                {companyData.map((curElem, index) => {
                  return (
                    <option key={index} value={curElem} name="company">
                      {curElem}
                    </option>
                  );
                })}
              </select>
            </form>
          </div>

          <div className="filter-price">
            <h3>Price</h3>
            <p style={{ color: "black" }}>Price:{price}</p>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              name="price"
              value={price}
              onChange={UpdateProductFilter}
              style={{cursor:"pointer"}}
            />
          </div>
          <div>
            <button className="apply-filter" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
