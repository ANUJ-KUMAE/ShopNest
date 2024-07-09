import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SearchAction } from "../Actions/SearchProductAction";
//import { IoSearchCircleSharp } from "react-icons/io5";

const SearchComponent = () => {
  //const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SearchProduct = (event) => {
    let key = event.target.value;
    dispatch(SearchAction(key));

    if (key.trim() == "") {
      navigate("/");
    } else {
      navigate(`/search/products`);
    }
  };

  return (
    <form>
      <input
        type="search"
        placeholder="Search"
        onChange={SearchProduct}
        className="search-input-box"
      />
    </form>
  );
};

export default SearchComponent;
