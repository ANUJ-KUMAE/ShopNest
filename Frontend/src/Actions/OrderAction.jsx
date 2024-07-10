import axios from "axios";
import {
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  GET_SINGLE_ORDER_DETAIL_FAIL,
  GET_SINGLE_ORDER_DETAIL_REQUEST,
  GET_SINGLE_ORDER_DETAIL_SUCCESS,
  GET_USER_ORDER_DETAIL_FAIL,
  GET_USER_ORDER_DETAIL_REQUEST,
  GET_USER_ORDER_DETAIL_SUCCESS,
  ORDER_CLEAR_ERROR,
  ORDER_UPDATE_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  USER_ORDER_CREATE_FAIL,
  USER_ORDER_CREATE_REQUEST,
  USER_ORDER_CREATE_SUCCESS,
} from "../Constants/OrderConstant";

/*---------User Create New Order and Their Details---------- */

const CreateUserOrder = (orderData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    dispatch({ type: USER_ORDER_CREATE_REQUEST });

    const configData = {
      headers: {
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.post(
      "https://shop-nest-api.vercel.app/Api/users/items/orderItems",
      orderData,
      configData
    );

    dispatch({
      type: USER_ORDER_CREATE_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: USER_ORDER_CREATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

const GetAllOrder = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    dispatch({ type: GET_USER_ORDER_DETAIL_REQUEST });

    const configData = {
      headers: {
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.get(
      "https://shop-nest-api.vercel.app/Api/users/items/allOrders/me",
      configData
    );

    dispatch({
      type: GET_USER_ORDER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_ORDER_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

const GetSingleOrder = (_id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    dispatch({ type: GET_SINGLE_ORDER_DETAIL_REQUEST });

    const configData = {
      headers: {
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.get(
      `https://shop-nest-api.vercel.app/Api/users/items/getSingleitem/${_id}`,
      configData
    );

    dispatch({
      type: GET_SINGLE_ORDER_DETAIL_SUCCESS,
      payload: data.singledata,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ORDER_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

/*--------Admin Get All Order And their Details-------*/

const AllUserOrders = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    dispatch({ type: GET_USER_ORDER_DETAIL_REQUEST });

    const configData = {
      headers: {
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.get(
      "https://shop-nest-api.vercel.app/Api/Admin/allUserOrders",
      configData
    );

    dispatch({
      type: GET_USER_ORDER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_ORDER_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

const OrderError = () => async (dispatch) => {
  dispatch({
    type: ORDER_CLEAR_ERROR,
  });
};

const SingleUserOrder = (_id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    dispatch({ type: GET_SINGLE_ORDER_DETAIL_REQUEST });

    const configData = {
      headers: {
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.get(
      `https://shop-nest-api.vercel.app/Api/Admin/userSingleOrder/${_id}`,
      configData
    );

    dispatch({
      type: GET_SINGLE_ORDER_DETAIL_SUCCESS,
      payload: data.UserorderDetail,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ORDER_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

const AdminUpdateOrder = (_id, Status) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    dispatch({ type: ORDER_UPDATE_REQUEST });

    const configData = {
      headers: {
        Authorization: AuthorizationToken,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `https://shop-nest-api.vercel.app/Api/Admin/allUserOrders/updateOrder/${_id}`,
      { Status },
      configData
    );

    dispatch({
      type: ORDER_UPDATE_SUCCESS,
      payload: data.OrderUpdated,
    });
  } catch (error) {
    dispatch({
      type: ORDER_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

/*------------------Delete Order By User------------------ */

const DeleteUserOrder = (_id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    dispatch({ type: DELETE_ORDER_REQUEST });

    const configData = {
      headers: {
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.delete(
      `https://shop-nest-api.vercel.app/Api/users/items/deleteOrder/${_id}`,
      configData
    );

    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: data.deletedData,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export {
  AllUserOrders,
  OrderError,
  SingleUserOrder,
  CreateUserOrder,
  GetAllOrder,
  GetSingleOrder,
  DeleteUserOrder,
  AdminUpdateOrder,
};
