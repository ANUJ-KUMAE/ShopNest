import axios from "axios";
import {
  Product_Request,
  Product_Success,
  Product_Fail,
  Clear_Errors,
  Single_Product_Request,
  Get_Single_Product,
  Single_Product_Fail,
  SIMILAR_PRODUCT_FAIL,
  SIMILAR_PRODUCT_REQUEST,
  GET_SIMILAR_PRODUCT_SUCCESS,
} from "../Constants/ProductsConstant";

export const getAllProductData = () => async (dispatch) => {
  try {
    dispatch({ type: Product_Request });

    const { data } = await axios.get("http://localhost:8050/Api/user/products");

    dispatch({
      type: Product_Success,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: Product_Fail,
      // payload: error.response.data.message
    });
  }
};

export const getSingleProductData = (_id) => async (dispatch) => {
  try {
    dispatch({ type: Single_Product_Request });

    const { data } = await axios.get(
      `http://localhost:8050/Api/user/userSingleProduct/${_id}`
    );
    //const singleData = await result.data;

    dispatch({ type: Get_Single_Product, payload: data.SingleProduct });
  } catch (error) {
    dispatch({
      type: Single_Product_Fail,
      payload: error.response.data.message,
    });
  }
};

export const getSimilarProducts = (Category, id) => async (dispatch) => {
  try {
    dispatch({ type: SIMILAR_PRODUCT_REQUEST });

    const { data } = await axios.get(
      `http://localhost:8050/Api/user/search/similarProducts/${Category}/${id}`
    );

    dispatch({
      type: GET_SIMILAR_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIMILAR_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const ClearErrors = () => async (dispatch) => {
  dispatch({
    type: Clear_Errors,
  });
};

// export default {getAllProductData, ClearErrors};
