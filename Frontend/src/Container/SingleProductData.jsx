import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductData, ClearErrors } from "../Actions/ProductDatas";
import { NavLink, useParams } from "react-router-dom";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import "../Styles/SinglePage.css";
import { FaIndianRupeeSign } from "react-icons/fa6";
import RatingStar from "./RatingStar";
import { FaLocationDot } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import AddToCart from "../Cart/AddToCart";
import SimilarProducts from "./SimilarProducts";
import ProductsType from "./ProductsType";

const SingleProductData = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { loading, error, SingleProduct } = useSelector(
    (state) => state.SingleProductDetails
  );

  useEffect(() => {
    dispatch(getSingleProductData(id));
  }, [dispatch, id]);

  const {
    id: alias,
    name,
    price,
    discription,
    images,
    company,
    category,
    stock,
    rating,
    numOfReviews,
    seller,
    review,
  } = SingleProduct;

  if (loading) {
    return (
      <div className="page_Loading">
        <AiOutlineLoading3Quarters className="page_loading_icon" />
        <div className="page_Loading_name">Page Loading..... </div>
      </div>
    );
  }

  // <img key={image.public_id} src={image.URL} alt={name} />

  return (
    <section>
      <div className="Header-component">
        <div className="products-type">
          <ProductsType />
        </div>
        <div className="SingleProductData">
          <div className="grid-two-column">
            <div className="Product-Image-Cart-Buy-Part">
              <div className="Product-Images">
                {images &&
                  images.map((image) => {
                    return (
                      <img key={image.public_id} src={image.URL} alt={name} />
                    );
                  })}
              </div>
            </div>

            {/*  Product Data*/}

            <div className="Product-Data">
              <h2 className="single-product-name">{name}</h2>
              <div className="ProductData-Price">
                MRP:
                <FaIndianRupeeSign />
                <h3>{price}</h3>
              </div>
              <div className="ratings-and-reviews">
                <div>
                  <RatingStar rating={rating} />
                </div>
                <p>
                  {rating} ratings and {numOfReviews} Reviews
                </p>
              </div>
              <div className="descp">{discription}</div>
              <div className="ProductData-Warranty">
                <div className="SingleProduct-Warranty">
                  <TbTruckDelivery className="Warranty-icon" />
                  <p className="Pico">Free Delivery</p>
                </div>
                <hr />
                <div className="SingleProduct-Warranty">
                  <TbReplace className="Warranty-icon" />
                  <p className="Pico">7 Days Replacement</p>
                </div>
                <hr />
                <div className="SingleProduct-Warranty">
                  <FaLocationDot className="Warranty-icon" />
                  <p className="Pico">Fast Delivery</p>
                </div>
                <hr />
                <div className="SingleProduct-Warranty">
                  <MdSecurity className="Warranty-icon" />
                  <p className="Pico">1 Year Warranty</p>
                </div>
              </div>
              <hr />

              <div className="Productdata-info">
                <p>
                  Available:
                  <span>{stock > 0 ? "In Stock" : "Not Available"}</span>
                </p>
                <p>
                  ID : <span>{id}</span>
                </p>
                <p>
                  Brand : <span>{company}</span>
                </p>
              </div>

              <hr />
              <div className="Seller-details">
                <p>
                  Seller : <span>{seller}</span>
                </p>
                <p>No Return Policy</p>
              </div>
              <hr />
              <div className="Customer-reviews">
                <div className="title">
                  <h2>
                    Ratings & Reviews{" "}
                    <span className="customer-reviews-rating">
                      {rating} ratings
                    </span>
                  </h2>
                </div>
                <div className="customers-reviews-data">
                  {review &&
                    review.map((customer, index) => {
                      return (
                        <div key={index}>
                          <p className="customer-review-detail">
                            Name : {customer.name}
                          </p>
                          <p className="customer-review-detail">
                            Rating : {customer.rating}
                          </p>
                          <p className="customer-review-detail">
                            Comment : {customer.comment}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="cart-and-buy">
                <div className="Add-to-cart">
                  <AddToCart product={SingleProduct} />
                </div>
              </div>
            </div>
          </div>
          <div className="Similar-Product-Components">
            <SimilarProducts category={category} id={id} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProductData;
