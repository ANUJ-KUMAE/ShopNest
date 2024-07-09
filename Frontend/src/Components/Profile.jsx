import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import profile from "../Images/Profile.png"
import "../Styles/Profile.css";

const Profile = () => {
  const { loading, user } = useSelector((state) => state.Authentication);
  const navigate = useNavigate();

  const UserProfileUpdate = (id) => {
      navigate(`/updateProfile/` +id)
  }

  return (
    <section>
      <div className="user-profile">
        <div className="profile-lists">
          <div className="block-name">
            <h3>Profile</h3>
          </div>
          <div className="Profile-image">
            <img src={profile} alt="Profile" className="user-Profile-image"/>
          </div>
          <div className="profile-user-data">
            <div className="user-profiles">
              <h5>Name</h5>
              <p>{user.userName}</p>
            </div>
            <div className="user-profiles">
              <h5>Email</h5>
              <p>{user.email}</p>
            </div>
            <div className="user-profiles">
              <h5>Phone</h5>
              <p>{user.phone}</p>
            </div>
          </div>
          <div className="user-profile-button">
            <button className="btn" onClick={() => UserProfileUpdate(user._id)}>
              Update
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
