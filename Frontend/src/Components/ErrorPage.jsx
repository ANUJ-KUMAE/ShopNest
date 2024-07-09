import React from "react";
import { Link } from "react-router-dom";
import "../Styles/ErrorPage.css"
import Errorp from "../Images/ErrorPage.jpg"

const ErrorPage = () => {
  return (
    <div className="Header-components">
      <div className="Error1">
        <h2>Oh !Sorry Wrong URL 404</h2>
      </div>
      <div className="Error2">
        <img src={Errorp} alt="ErrorPage"/>
      </div>
      <div className="Error3">
        <Link to="/">
          <button type="button" className="btn">
            About
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
