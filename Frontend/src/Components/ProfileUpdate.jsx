import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import profile from "../Images/Profile.png";
import "../Styles/Profile.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearupdateError,
  LoadLoginUser,
  UpdateUserProfile,
} from "../Actions/LoginSignupAction";
import { RESET_UPDATE_PROFILE } from "../Constants/UpdateConstant";
import { toast } from "react-toastify";

const ProfileUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state) => state.Authentication
  );
  const { error, updateLoading, updateProfile } = useSelector(
    (state) => state.updateUserProfile
  );
  const navigate = useNavigate();

  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.userName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }

    if (error) {
      dispatch(ClearupdateError());
    }

    if (updateProfile) {
      //dispatch(LoadLoginUser());
      if (updateProfile.modifiedCount === 0) {
        toast.info("No changes were made.");
      } else {
        toast.success("Profile updated successfully!");
        dispatch(LoadLoginUser());
      }
      dispatch({
        type: RESET_UPDATE_PROFILE,
      });
    }
  }, [dispatch, user, error, updateProfile, navigate]);

  const update = (e) => {
    e.preventDefault();
    console.log(userName, email, phone);

    const formData = new FormData();
    formData.set("userName", userName);
    formData.set("email", email);
    formData.set("phone", phone);
    dispatch(UpdateUserProfile(formData, id));
  };

  return (
    <section>
      <div className="user-profile">
        <div className="profile-lists">
          <div className="block-name">
            <h3>Update Profile</h3>
            {error && <p>{error.message}</p>}
          </div>
          <div className="Profile-image">
            <img src={profile} alt="Profile" className="user-Profile-image" />
          </div>
          <div className="user-data">
            <form className="form-element" onSubmit={update}>
              <div className="form-input-types">
                <label>User Name</label>
                <input
                  className="inputFiled"
                  type="text"
                  name="userName"
                  value={userName}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-input-types">
                <label>Email</label>
                <input
                  className="inputFiled"
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-input-types">
                <label>Phone Number</label>
                <input
                  className="inputFiled"
                  type="number"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="user-profile-button">
                <button className="btn" disabled={updateLoading}>
                  {updateLoading ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileUpdate;
