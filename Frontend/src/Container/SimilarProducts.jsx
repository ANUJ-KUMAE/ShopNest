import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSimilarProducts } from "../Actions/ProductDatas";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsFillEmojiFrownFill } from "react-icons/bs";

const SimilarProducts = ({ category, id }) => {
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
    slidesToShow: 4,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
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
    ],
  };

  const dispatch = useDispatch();

  const { LoadingSimilar, AllSimilarProduct, error } = useSelector(
    (state) => state.similarProducts
  );

  useEffect(() => {
    if (category) {
      dispatch(getSimilarProducts(category, id));
    }
  }, [dispatch, category]);

  const getFirstTwoWords = (text) => {
    return text.split(" ").slice(0, 2).join(" ");
  };

  if (LoadingSimilar) {
    return (
      <div className="page_Loading">
        <AiOutlineLoading3Quarters className="page_loading_icon" />
        <div className="page_Loading_name">Page Loading..... </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading similar products</div>;
  }

  if (AllSimilarProduct.length == 0) {
    return (
      <div className="lastest-product-title no-similar-found">
        <span>No Similar Product Found</span>{" "}
        <BsFillEmojiFrownFill style={{ color: "orangered" }} />
      </div>
    );
  }

  return (
    <section>
      <div className="home-section">
        <div>
          <h3 className="lastest-product-title">Similar Category Products</h3>
        </div>
        <div className="similar-products-grid">
          <Slider {...settings}>
            {AllSimilarProduct.map((product) => {
              const { _id, images, name } = product;
              return (
                <div key={_id} className="Products-lists-Datas">
                  <Link to={`/singleProduct/${_id}`}>
                    <div className="card">
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
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default SimilarProducts;
