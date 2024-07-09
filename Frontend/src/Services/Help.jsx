import React, {useState} from "react";
import { FaHireAHelper } from "react-icons/fa";
import "./Services.css";

const Help = () => {

  const [pname, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, SetEmail] = useState("");
  const [description, setDescription] = useState("");

  return (
    <section>
      <div className="Customer-Help-Page">
        <div className="Customer-Help-Section">
          <div className="Customer-Help-Title ">
            <div className="user-services-title">
              <FaHireAHelper
                className="help-icon"
                style={{ color: "#ECF0F1 " }}
              />
              <h3 style={{ color: "#ECF0F1 " }}>Help</h3>
            </div>
          </div>
          <div className="Customer-Question-Section">
            <form encType="multipart/form-data">
              <div className="Product-inputs">
                <label>Name:</label>
                <input
                  type="text"
                  name="pname"
                  value={pname}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="off"
                  placeholder="Enter Full Name"
                />
              </div>
              <div className="Product-inputs">
                <label>Phone:</label>
                <input
                  type="number"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  autoComplete="off"
                  placeholder="Phone No."
                />
              </div>
              <div className="Product-inputs">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => SetEmail(e.target.value)}
                  required
                  autoComplete="off"
                  placeholder="Your Email"
                />
              </div>
              <div className="Product-Description">
                <label>Details:</label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details"
                  rows={8}
                  cols={20}
                  autoComplete="off"
                ></textarea>
              </div>
              <div className="form-button add-product-button">
                <button className="btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Help;
