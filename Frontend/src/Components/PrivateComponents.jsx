import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateComponents = () => {
  const { isAuthenticated, user } = useSelector((state) => state.Authentication);
  return isAuthenticated && user ? <Outlet/> : <Navigate to='/login'/>
};

export default PrivateComponents;
