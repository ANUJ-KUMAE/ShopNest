import React, { useState } from "react";
import { countries } from "countries-list";
import "../Styles/AdminSidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SaveShippingInfo } from "../Actions/CartAction";

const Shipping = () => {
  const countriesList = Object.values(countries);
  const { shippingInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalcode);
  const [phone, setPhoneNumber] = useState(shippingInfo.phone);
  const [country, setCountry] = useState(shippingInfo.country);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(SaveShippingInfo({ address, city, postalCode, phone, country }));
    navigate("/confirmOrder");
    //navigate("/payment");
  };

  return (
    <section>
      <div className="Shipping-Info">
        <div className="Shipping-info-lists">
          <form onSubmit={handleSubmit}>
            <div className="shipping-datas">
              <label htmlFor="ShippingAddress">Address:</label>
              <input
                type="text"
                placeholder="Address"
                required
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="shipping-datas">
              <label htmlFor="ShippingCity">City:</label>
              <input
                type="text"
                placeholder="City"
                required
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="shipping-datas">
              <label htmlFor="ShippingPostalCode">PostalCode:</label>
              <input
                type="number"
                placeholder="Postal Code"
                required
                name="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div className="shipping-datas">
              <label htmlFor="PhoneNumber">Phone Number:</label>
              <input
                type="number"
                placeholder="Phone Number"
                required
                name="phone"
                value={phone}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="shipping-country-select shipping-datas">
              <label htmlFor="Country">Country:</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {countriesList.map((country) => {
                  return (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="add-product-button">
              <button type="submit" className="btn">
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Shipping;
