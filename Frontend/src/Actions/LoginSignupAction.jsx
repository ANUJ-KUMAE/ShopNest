import axios from "axios";
import {
  Login_Fail,
  Login_Request,
  Login_Success,
  Clear_Error,
  Logout_Fail,
  Logout_Success,
  Load_LoginUser_Fail,
  Load_LoginUser_Request,
  Load_LoginUser_Success,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../Constants/LoginSignupConstant";
import {
  CLEAR_ERRORS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "../Constants/UpdateConstant";
import { toast } from "react-toastify";

const LoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: Login_Request });

    const configData = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://shop-nest-api.vercel.app/Api/auth/login",
      { email, password },
      configData
    );

    dispatch({ type: Login_Success, payload: data.user });
    localStorage.setItem("token", data.token);
    toast.success(data.msg);
  } catch (error) {
    dispatch({
      type: Login_Fail,
      payload: error.response,
    });
  }
};

const LoadLoginUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    dispatch({ type: Load_LoginUser_Request });

    const configData = {
      headers: {
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.get(
      "https://shop-nest-api.vercel.app/Api/auth/userDetails",
      configData
    );

    dispatch({
      type: Load_LoginUser_Success,
      payload: data.currentUser,
    });
  } catch (error) {
    dispatch({
      type: Load_LoginUser_Fail,
      payload: error.response.data.message,
    });
  }
};

const RegisterAction = (newUser) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const configData = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://shop-nest-api.vercel.app/Api/auth/register",
      newUser,
      configData
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.UserCreated,
    });
    localStorage.setItem("token", data.token);
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response,
    });
  }
};

const LogoutAction = () => (dispatch) => {
  try {
    localStorage.removeItem("token");
    dispatch({
      type: Logout_Success,
    });
    toast.success("Logout Successfully")
  } catch (error) {
    dispatch({
      type: Logout_Fail,
      payload: error.response.data.message,
    });
  }
};

const UpdateUserProfile = (formData, _id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const configData = {
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.put(
      `https://shop-nest-api.vercel.app/Api/auth/profileUpdate/${_id}`,
      formData,
      configData
    );

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.newProfile,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

const ClearErrors = () => async (dispatch) => {
  dispatch({
    type: Clear_Error,
  });
};

const ClearupdateError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export {
  LoginAction,
  ClearErrors,
  LogoutAction,
  LoadLoginUser,
  RegisterAction,
  UpdateUserProfile,
  ClearupdateError,
};
