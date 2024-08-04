import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Log from "../Images/Login.png";
import Logo from "../Images/Shop.png";
import "../Styles/Signup.css";
import { useDispatch, useSelector } from "react-redux";
import { ClearErrors, LoginAction } from "../Actions/LoginSignupAction";
import { toast } from "react-toastify";

const Login = () => {
  const [singleUser, setSingleUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading, error, user, isAuthenticated } = useSelector(
    (state) => state.Authentication
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      //toast.success("Login Successful");
    }

    if (error) {
      const messages = error.data.message;

      if (Array.isArray(messages)) {
        messages.forEach((msg) => {
          toast.error(msg);
        });
      } else {
        toast.error(messages || error.data.extraDetails);
      }

      dispatch(ClearErrors());
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  const handleData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSingleUser({
      ...singleUser,
      [name]: value,
    });
  };

  // const token = cookies.get('token');

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(singleUser);
    //console.log(token);
    dispatch(LoginAction(singleUser.email, singleUser.password));
  };

  return (
    <section>
      {loading ? (
        <h3>Loading User</h3>
      ) : (
        <div className="account-container">
          <div className="Left-part">
            <img src={Log} alt="SignUp" />
          </div>
          <div className="right-part-signup">
            <div className="top-element">
              <img src={Logo} alt="Logo" />
            </div>
            <div className="bottom-element">
              <div className="form-header-name">
                <h3>Login Here</h3>
              </div>
              <form className="form-element" onSubmit={handleSubmit}>
                <div className="form-input-types">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={singleUser.email}
                    onChange={handleData}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="form-input-types">
                  <label htmlFor="password">Password</label>
                  <input
                    type="text"
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={singleUser.password}
                    onChange={handleData}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="form-button">
                  <button className="btn">Submit</button>
                </div>
                <div className="Account-already">
                  <p>
                    Don't have an Account{" "}
                    <NavLink to="/loginSignup">
                      <span>Create Account</span>
                    </NavLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
