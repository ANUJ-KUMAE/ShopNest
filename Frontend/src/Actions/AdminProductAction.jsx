import axios from "axios";
import {
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  SINGLE_PRODUCT_DETAIL_FAIL,
  SINGLE_PRODUCT_DETAIL_REQUEST,
  SINGLE_PRODUCT_DETAIL_SUCCESS,
  SINGLE_PRODUCT_UPDATE_FAIL,
  SINGLE_PRODUCT_UPDATE_REQUEST,
  SINGLE_PRODUCT_UPDATE_SUCCESS,
} from "../Constants/AdminConstants";


const GetSingleAdminProduct = (_id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    dispatch({ type: SINGLE_PRODUCT_DETAIL_REQUEST });

    const configData = {
      headers: {
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.get(
      `https://shop-nest-api.vercel.app/Api/Admin/adminSingleProduct/${_id}`,
      configData
    );

    dispatch({
      type: SINGLE_PRODUCT_DETAIL_SUCCESS,
      payload: data.singleData,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_PRODUCT_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

const UpdateAdminSingleProduct = (_id, productData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    dispatch({ type: SINGLE_PRODUCT_UPDATE_REQUEST });

    const configData = {
      headers: {
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.put(
      `https://shop-nest-api.vercel.app/Api/Admin/adminUpdate/${_id}`,
      productData,
      configData
    );

    dispatch({
      type: SINGLE_PRODUCT_UPDATE_SUCCESS,
      payload: data.updatedata,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_PRODUCT_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

const DeleteAdminProduct = (_id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const configData = {
      headers: {
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.delete(
      `https://shop-nest-api.vercel.app/Api/Admin/delete/${_id}`,
      configData
    );

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data.updatedata,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

const AddUserNewProduct = (productData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    dispatch({ type: NEW_PRODUCT_REQUEST });

    const configData = {
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.post(
      "https://shop-nest-api.vercel.app/Api/Admin/addProducts",
      productData,
      configData
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const GetAllAdminProduct = (currentPage) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const configData = {
      headers: {
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.get(
      `https://shop-nest-api.vercel.app/Api/Admin/adminproducts?page=${currentPage}`,
      configData
    );

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export {
  GetSingleAdminProduct,
  UpdateAdminSingleProduct,
  DeleteAdminProduct,
  AddUserNewProduct,
  GetAllAdminProduct,
};
