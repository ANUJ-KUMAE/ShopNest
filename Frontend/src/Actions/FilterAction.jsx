import { useEffect } from "react";
import {
  CLEAR_FILTER,
  GET_SORT_VALUE,
  LOAD_PRODUCTS,
  UPDATE_FILTER_PRODUCTS,
  USER_SORTING_PRODUCT,
  FILTER_PRODUCTS,
  SORT_PRODUCTS,
  SORTING_PRODUCTS,
} from "../Constants/FilterConstant";

const UserSortingProduct = (userValue, product) => async (dispatch) => {
  dispatch({
    type: GET_SORT_VALUE,
    payload: userValue,
  });

  dispatch({ type: FILTER_PRODUCTS });
  dispatch({ type: SORTING_PRODUCTS });
};

const UpdateFilterProducts = (name, value, product) => async (dispatch) => {
  dispatch({
    type: UPDATE_FILTER_PRODUCTS,
    payload: { name, value },
  });

  dispatch({ type: FILTER_PRODUCTS });
  dispatch({ type: SORTING_PRODUCTS });
};


export { UserSortingProduct, UpdateFilterProducts };
