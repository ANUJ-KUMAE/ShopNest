import {
  RESET_SEARCH_PRODUCT,
  SEARCH_PRODUCT_FAIL,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SECCESS,
} from "../Constants/SearchConstant";

const SearchInitial = {
  SearchLoading: false,
  SearchProduct: [],
  error: null,
  SearchSuccess: false,
};

const ProductSearch = (state = SearchInitial, action) => {
  switch (action.type) {
    case SEARCH_PRODUCT_REQUEST:
      return {
        SearchLoading: true,
        SearchProduct:[]
      };

    case SEARCH_PRODUCT_SECCESS:
      return {
        ...state,
        SearchLoading: false,
        SearchProduct: action.payload.userSearchData,
        error: null,
        SearchSuccess: true,
      };
    case SEARCH_PRODUCT_FAIL:
      return {
        ...state,
        SearchLoading: false,
        SearchProduct: [],
        error: action.payload,
        SearchSuccess: false,
      };

    case RESET_SEARCH_PRODUCT:
      return {
        SearchLoading: false,
        SearchProduct: [],
        error: null,
        SearchSuccess: false,
      };

      default:
        return state
    
  }
};

export { ProductSearch };
