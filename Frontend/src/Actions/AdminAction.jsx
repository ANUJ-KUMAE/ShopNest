import axios from "axios";
import {
  ALL_USERS_DATA_FAIL,
  ALL_USERS_DATA_REQUEST,
  ALL_USERS_DATA_SUCCESS,
  DELETE_SINGLE_USER_FAIL,
  DELETE_SINGLE_USER_REQUEST,
  DELETE_SINGLE_USER_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  SINGLE_USER_DETAILS_UPDATE_FAIL,
  SINGLE_USER_DETAILS_UPDATE_REQUEST,
  SINGLE_USER_DETAILS_UPDATE_SUCCESS,
  SINGLE_USER_DETAIL_FAIL,
  SINGLE_USER_DETAIL_REQUEST,
  SINGLE_USER_DETAIL_SUCCESS,
} from "../Constants/AdminConstants";
//import Cookies from "js-cookie";

const GetAllUsersData = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    dispatch({ type: ALL_USERS_DATA_REQUEST });

    const configData = {
      headers: {
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.get(
      "http://localhost:8050/Api/Admin/getAllUserData",
      configData
    );

    dispatch({
      type: ALL_USERS_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_DATA_FAIL,
      payload: error.response.data.message,
    });
  }
};

const GetSingleRegistereduserData = (_id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    dispatch({ type: SINGLE_USER_DETAIL_REQUEST });

    const configData = {
      headers: {
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.get(
      `http://localhost:8050/Api/Admin/getSingleUSerDetails/${_id}`,
      configData
    );

    dispatch({
      type: SINGLE_USER_DETAIL_SUCCESS,
      payload: data.SingleUser,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_USER_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

const UpdateSingleUsers = (_id, userData) => async(dispatch) => {
  try {

    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    dispatch({ type: SINGLE_USER_DETAILS_UPDATE_REQUEST });

    const configData = {
      headers: {
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.put(
      `http://localhost:8050/Api/Admin/updateSingleUserDetail/${_id}`,
      userData,
      configData
    );

    dispatch({
      type: SINGLE_USER_DETAILS_UPDATE_SUCCESS,
      payload: data.updateUserData,
    });
    
  } catch (error) {
    dispatch({
      type:SINGLE_USER_DETAILS_UPDATE_FAIL,
      payload:error.response.data.message
    })
  }
}

const DeleteAdminUser = (_id) => async(dispatch) => {
  try {

    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    dispatch({ type: DELETE_SINGLE_USER_REQUEST});

    const configData = {
      headers: {
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.delete(
      `http://localhost:8050/Api/Admin/deleteUser/${_id}`,
      configData
    );

    dispatch({
      type: DELETE_SINGLE_USER_SUCCESS,
      payload: data.userDeleted,
    });

    
  } catch (error) {
    dispatch({
      type:DELETE_SINGLE_USER_FAIL,
      payload:error.response.data.message
    })
  }
}



export { GetAllUsersData,  GetSingleRegistereduserData, UpdateSingleUsers, DeleteAdminUser};
