import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../Images/Shop.png";
import Sign from "../Images/Sign.png";
import "../Styles/Signup.css";
import { useDispatch, useSelector } from "react-redux";
import { ClearErrors, RegisterAction } from "../Actions/LoginSignupAction";
import { toast } from "react-toastify";

const SignUp = () => {
  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.Authentication
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      toast.success("Register Successful");
    }

    if (error) {
      if (error.data.Message) {
        error.data.Message.forEach((msg) => {
          toast.error(msg);
        });
      } else {
        toast.error(error.data.extradetails);
      }
      dispatch(ClearErrors());
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newUser);
    dispatch(RegisterAction(newUser));
  };

  return (
    <section>
      <div className="account-container">
        <div className="Left-part">
          <img src={Sign} alt="SignUp" />
        </div>
        <div className="right-part-signup">
          <div className="top-element">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="bottom-element">
            <div className="form-header-name">
              <h3>Create Account</h3>
            </div>
            <form className="form-element" onSubmit={handleSubmit}>
              <div className="form-input-types">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  id="userName"
                  name="userName"
                  value={newUser.userName}
                  onChange={handlechange}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="form-input-types">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={newUser.email}
                  onChange={handlechange}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="form-input-types">
                <label htmlFor="phone">Mobile Number</label>
                <input
                  type="number"
                  placeholder="Mobile Number"
                  id="phone"
                  name="phone"
                  value={newUser.phone}
                  onChange={handlechange}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="form-input-types">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={newUser.password}
                  onChange={handlechange}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="term-condition">
                <input type="checkbox" required />
                <p>Accept All Terms And Conditions</p>
              </div>
              <div className="form-button">
                <button className="btn">Submit</button>
              </div>
              <div className="Account-already">
                <p>
                  Already have an Account{" "}
                  <NavLink to="/login">
                    <span>Login</span>
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
