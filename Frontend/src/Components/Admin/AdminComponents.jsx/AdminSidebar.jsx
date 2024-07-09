import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../../Styles/AdminSidebar.css";
import { FaUsers } from "react-icons/fa";
import { GrProductHunt } from "react-icons/gr";
import { MdFiberNew } from "react-icons/md";
import { BsCartCheckFill } from "react-icons/bs";

const AdminSidebar = () => {
  return (
    <>
      <div className="sidebar-components">
        <div className="sidebar-list">
          <ul className="sidebar">
            <div className="s-icon-name">
              <FaUsers className="icons" style={{ color: "blue" }} />
              <li>
                <NavLink to="/admin/users">Users</NavLink>
              </li>
            </div>
            <div className="s-icon-name">
              <GrProductHunt className="icons" style={{ color: "green" }} />
              <li>
                <NavLink to="/admin/adminproducts">Products</NavLink>
              </li>
            </div>
            <div className="s-icon-name">
              <MdFiberNew className="icons" style={{ color: "brown" }} />
              <li>
                <NavLink to="/admin/addNewProduct">Add Products</NavLink>
              </li>
            </div>
            <div className="s-icon-name">
              <BsCartCheckFill
                className="icons"
                style={{ color: "darkgreen" }}
              />
              <li>
                <NavLink to="/admin/orders">Orders</NavLink>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default AdminSidebar;
