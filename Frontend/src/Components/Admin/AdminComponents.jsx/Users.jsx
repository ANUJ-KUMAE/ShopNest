import React, { useEffect } from "react";
import "../../../Styles/AdminSidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { DeleteAdminUser, GetAllUsersData } from "../../../Actions/AdminAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadLoginUser } from "../../../Actions/LoginSignupAction";
import { RESET_SINGLE_USER } from "../../../Constants/AdminConstants";
import { FaUsers } from "react-icons/fa";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { adminLoading, error, AllUserDatas } = useSelector(
    (state) => state.usersData
  );
  const { isAuthenticated } = useSelector((state) => state.Authentication);
  const { deleteUserSuccess } = useSelector((state) => state.SingleUserDetail);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(GetAllUsersData());
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (deleteUserSuccess) {
      toast.success("Data Deleted");
      navigate("/");

      dispatch({
        type: RESET_SINGLE_USER,
      });
    }
  }, [deleteUserSuccess, navigate]);

  const UpdateUserData = (id) => {
    navigate(`/admin/updateRegistredUser/` + id);
  };

  const DeleteuserData = (id) => {
    dispatch(DeleteAdminUser(id));
  };

  if (adminLoading) {
    return <div>Loading All Registerd User.....</div>;
  }

  return (
    <section>
      <div className="user-Container">
        <div className="user-list">
          <div className="title-name-user">
            <h3><FaUsers className="icons" style={{ color: "blue" }} /> Users</h3>
          </div>
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Admin</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {AllUserDatas.map((curElem, index) => {
                  return (
                    <tr key={index}>
                      <td>{curElem.userName}</td>
                      <td>{curElem.isAdmin ? "True" : "False"}</td>
                      <td>
                        <button onClick={() => UpdateUserData(curElem._id)} className="update-Button">
                          Update
                        </button>
                      </td>
                      <td>
                        <button onClick={() => DeleteuserData(curElem._id)} className="delete-Button">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Users;
