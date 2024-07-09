import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoadLoginUser } from "../Actions/LoginSignupAction";

const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(LoadLoginUser());
    }
  }, []);

  return children;
};

export default AppInitializer;
