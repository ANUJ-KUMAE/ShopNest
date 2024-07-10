import axios from "axios";
import {
  SEARCH_PRODUCT_FAIL,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SECCESS,
} from "../Constants/SearchConstant";

const SearchAction = (value) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_PRODUCT_REQUEST });

    const { data } = await axios.get(
      `https://shop-nest-api.vercel.app/Api/user/search/${value}`
    );

    dispatch({ type: SEARCH_PRODUCT_SECCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SEARCH_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export { SearchAction };
