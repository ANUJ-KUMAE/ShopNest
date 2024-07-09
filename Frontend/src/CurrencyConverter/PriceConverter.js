import React from "react";

const PriceConverter = ({ price }) => {
  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format((price / 100) * 100);
};

export default PriceConverter;
