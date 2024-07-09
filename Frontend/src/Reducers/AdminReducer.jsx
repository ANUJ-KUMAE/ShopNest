import {
  ADMIN_CLEAR_ERROR,
  ALL_USERS_DATA_FAIL,
  ALL_USERS_DATA_REQUEST,
  ALL_USERS_DATA_SUCCESS,
  DELETE_SINGLE_USER_FAIL,
  DELETE_SINGLE_USER_REQUEST,
  DELETE_SINGLE_USER_SUCCESS,
  SINGLE_PRODUCT_DETAIL_FAIL,
  SINGLE_PRODUCT_DETAIL_REQUEST,
  SINGLE_PRODUCT_DETAIL_SUCCESS,
  SINGLE_PRODUCT_UPDATE_FAIL,
  SINGLE_PRODUCT_UPDATE_REQUEST,
  SINGLE_PRODUCT_UPDATE_SUCCESS,
  SINGLE_USER_DETAILS_UPDATE_FAIL,
  SINGLE_USER_DETAILS_UPDATE_REQUEST,
  SINGLE_USER_DETAILS_UPDATE_SUCCESS,
  SINGLE_USER_DETAIL_FAIL,
  SINGLE_USER_DETAIL_REQUEST,
  SINGLE_USER_DETAIL_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  RESET_DELETED_PRODUCT,
  RESET_SINGLE_USER,
  RESET_NEW_PRODUCT,
  RESET_PRODUCT_UPDATE,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
} from "../Constants/AdminConstants";


const AdminInitialState = {
  adminLoading: false,
  AllUserDatas: [],
  error: null,
};

const SingleUSerInitialState = {
  userLoading: false,
  singleUser: null,
  error: null,
  deleteUserSuccess: false,
};

const ProductInitialState = {
  productLoading: false,
  singleAdminProduct: null,
  error: null,
  deleteProductSuccess: false,
  updateProductSuccess: false,
};

const GetAllProductInitialState = {
  adminProductLoading: false,
  AdminProduct: [],
  error: null,
};

const AdminUsers = (state = AdminInitialState, action) => {
  switch (action.type) {
    case ALL_USERS_DATA_REQUEST:
      return {
        adminLoading: true,
        AllUserDatas: [],
      };

    case ALL_USERS_DATA_SUCCESS:
      return {
        adminLoading: false,
        AllUserDatas: action.payload.AllUserDatas,
        CountUsers: action.payload.CountUsers,
      };

    case ALL_USERS_DATA_FAIL:
      return {
        adminLoading: false,
        error: action.payload,
      };

    case ADMIN_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const UsersDetails = (state = SingleUSerInitialState, action) => {
  switch (action.type) {
    case SINGLE_USER_DETAIL_REQUEST:
    case DELETE_SINGLE_USER_REQUEST:
    case SINGLE_USER_DETAILS_UPDATE_REQUEST:
      return {
        userLoading: true,
        singleUser: null,
        error: null,
      };

    case SINGLE_USER_DETAIL_SUCCESS:
    case SINGLE_USER_DETAILS_UPDATE_SUCCESS:
      return {
        ...state,
        userLoading: false,
        singleUser: action.payload,
        error: null,
      };

    case SINGLE_USER_DETAIL_FAIL:
      return {
        ...state,
        userLoading: false,
        singleUser: null,
        error: action.payload,
      };

    case DELETE_SINGLE_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        deleteUserSuccess: true,
      };

    case SINGLE_USER_DETAILS_UPDATE_FAIL:
    case DELETE_SINGLE_USER_FAIL:
      return {
        ...state,
        userLoading: false,
        error: action.payload,
      };

    case RESET_SINGLE_USER:
      return {
        userLoading: false,
        singleUser: null,
        error: null,
        deleteUserSuccess: false,
      };

    case ADMIN_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const AdminProductPart = (state = ProductInitialState, action) => {
  switch (action.type) {
    case SINGLE_PRODUCT_DETAIL_REQUEST:
    case PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        productLoading: true,
        singleAdminProduct: null,
        error: null,
      };

    case SINGLE_PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        productLoading: true,
      };

    case SINGLE_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        productLoading: false,
        singleAdminProduct: action.payload,
        error: null,
      };

    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        productLoading: false,
        deleteProductSuccess: true,
      };

    case PRODUCT_DELETE_FAIL:
      return {
        ...state,
        productLoading: false,
        deleteProductSuccess: false,
        error: action.payload,
      };

    case SINGLE_PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        productLoading: false,
        singleAdminProduct: null,
        error: action.payload,
      };

    case SINGLE_PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        productLoading: false,
        singleAdminProduct: action.payload,
        updateProductSuccess: true,
        error: null,
      };

    case SINGLE_PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        productLoading: false,
        singleAdminProduct: null,
        updateProductSuccess: false,
        error: action.payload,
      };

    case RESET_DELETED_PRODUCT:
      return {
        productLoading: false,
        singleAdminProduct: null,
        deleteProductSuccess: false,
        error: null,
      };

    case RESET_PRODUCT_UPDATE:
      return {
        productLoading: false,
        singleAdminProduct: null,
        updateProductSuccess: false,
        error: null,
      };

    case ADMIN_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const AddNewProduct = (state = { newProduct: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        newProductLoading: true,
      };

    case NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        newProductLoading: false,
        success: action.payload.success,
        newProduct: action.payload.AllProduct,
        error: null,
      };

    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        newProductLoading: false,
        error: action.payload,
      };

    case RESET_NEW_PRODUCT:
      return {
        newProductLoading: false,
        success: false,
        newProduct: {},
        error: null,
      };

    default:
      return state;
  }
};

const AdminGetAllProduct = (state = GetAllProductInitialState, action) => {
  switch (action.type) {
    case ADMIN_PRODUCT_REQUEST:
      return {
        adminProductLoading: true,
        AdminProduct: [],
      };

    case ADMIN_PRODUCT_SUCCESS:
      return {
        adminProductLoading: false,
        AdminProduct: action.payload.getProduct,
        error: null,
      };

    case ADMIN_PRODUCT_FAIL:
      return {
        adminProductLoading: false,
        AdminProduct: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export { AdminUsers, UsersDetails, AdminProductPart, AddNewProduct, AdminGetAllProduct };
