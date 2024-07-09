import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleRegistereduserData, UpdateSingleUsers } from "../../../Actions/AdminAction";
import "../../../Styles/AdminSidebar.css";

const UpdateUserDetails = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userLoading, singleUser, error } = useSelector(
    (state) => state.SingleUserDetail
  );

  useEffect(() => {
    if (singleUser) {
      setUserName(singleUser.userName || "");
      setEmail(singleUser.email || "");
      setPhone(singleUser.phone || "");
      setIsAdmin(singleUser.isAdmin || false);
    }
  }, [singleUser]);

  useEffect(() => {
    dispatch(GetSingleRegistereduserData(id));
  }, [dispatch, id]);

  const UpdateRegisteredUser = (e) => {
    e.preventDefault();
    const updatedUserData = {
      userName,
      email,
      phone,
      isAdmin
    }

    dispatch(UpdateSingleUsers(id, updatedUserData));
    navigate("/admin/users");

  };

  if (userLoading) {
    return <div>Loading user data...</div>;
  }

  return (
    <section>
      <div className="Update-Registered-User">
        <div className="User-Details">
          <div className="Update-Title">
            <h3>Update User Details</h3>
          </div>
          <form onSubmit={UpdateRegisteredUser}>
            <div className="Product-inputs">
              <label>UserName:</label>
              <input
                type="text"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
            <div className="Product-inputs">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
            <div className="Product-inputs">
              <label>Phone</label>
              <input
                type="number"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
            <div className="Product-inputs-checkbox">
              <label>Admin:</label>
              <input
                type="checkbox"
                name="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </div>
            <div className="form-button add-product-button admin-button">
              <button className="btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateUserDetails;
