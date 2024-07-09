import React from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const RatingStar = ({ rating }) => {
  
  const raStar = Array.from({ length: 5 }, (ele, index) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const starNumber = index + 1;

    if (starNumber <= fullStars) {
      return <FaStar key={index} className="icon" />;
    } else if (halfStar && starNumber === fullStars + 1) {
      return <FaStarHalfAlt key={index} className="icon" />;
    } else {
      return <FaRegStar key={index} className="icon" />;
    }
  });

  return (
    <div className="rating-star">
      <div className="consumer-rating">{raStar}</div>
    </div>
  );
};

export default RatingStar;
