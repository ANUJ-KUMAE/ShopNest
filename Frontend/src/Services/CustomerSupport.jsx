import React from "react";
import "./Services.css";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { MdHelpOutline } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";

const CustomerSupport = () => {
  return (
    <section>
      <div className="customer-support-container">
        <div className="customer-services">
          <div className="customer-service-heading">
            <div className="user-services-title">
              <LiaHandsHelpingSolid className="help-icon" />
              <h3>What Kind of help You Want</h3>
            </div>
          </div>
          <div className="Services-Types">
            <div className="service-details">
              <MdHelpOutline className="help-icon" style={{color:"red"}}/>
              <h4 className="detail-title">Support Center</h4>
              <p className="detail-explain">SoHo 94 Broadway India 10265</p>
              <button className="btn confirm-order">Click Here</button>
            </div>
            <div className="service-details">
              <MdOutlineMailOutline className="help-icon" style={{color:"blue"}}/>
              <h4 className="detail-title">Email Us</h4>
              <p className="detail-explain">shopNest@mail.com</p>
              <button className="btn confirm-order">Click Here</button>
            </div>
            <div className="service-details">
              <IoCallOutline className="help-icon"/>
              <h4 className="detail-title">Call or Text Us</h4>
              <p className="detail-explain">245-9876-5400 (Toll Free)</p>
              <button className="btn confirm-order">Click Here</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerSupport;
