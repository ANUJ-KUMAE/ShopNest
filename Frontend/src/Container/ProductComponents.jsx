import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { CartProduct } from "../Actions/CartAction";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PriceConverter from "../CurrencyConverter/PriceConverter";

const ProductComponents = () => {
  const [sliderRef, setSliderRef] = useState(null);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "gray",
          borderRadius: "40px",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "gray",
          borderRadius: "40px",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      // {
      //   breakpoint: 400,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 1,
      //   },
      // },
    ],
  };

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { featureProduct } = useSelector((state) => state.products);
  const addtoCart = (_id) => {
    dispatch(CartProduct(_id, quantity));
  };

  return (
    <section>
      <div className="home-section">
        <div>
          <h3 className="lastest-product-title">Latest Products</h3>
        </div>
        <div className="home-section-datas">
          <Slider ref={setSliderRef} {...settings}>
            {featureProduct &&
              featureProduct
                .filter((curElement) => curElement.category === "Cloths")
                .map((curElement) => {
                  const { _id, images, name, price } = curElement;
                  return (
                    <div key={_id} className="Products-lists-Datas">
                      <Link to={`/singleProduct/${_id}`}>
                        <div className="card">
                          <figure>
                            <img src={images[0].URL} alt={name} />
                          </figure>

                          <div className="card-data">
                            <div className="card-data-flex">
                              <h3>{name}</h3>
                            </div>
                            {/* <div className="card-data-price">
                              <h3>{<PriceConverter price = {price} />}</h3>
                            </div> */}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ProductComponents;
