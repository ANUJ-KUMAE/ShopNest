import { RESET_DELETED_PRODUCT } from "../Constants/AdminConstants";
import {
  GET_USER_ORDER_DETAIL_FAIL,
  GET_USER_ORDER_DETAIL_SUCCESS,
  GET_USER_ORDER_DETAIL_REQUEST,
  ORDER_CLEAR_ERROR,
  GET_SINGLE_ORDER_DETAIL_REQUEST,
  GET_SINGLE_ORDER_DETAIL_FAIL,
  GET_SINGLE_ORDER_DETAIL_SUCCESS,
  USER_ORDER_CREATE_REQUEST,
  USER_ORDER_CREATE_SUCCESS,
  USER_ORDER_CREATE_FAIL,
  RESET_USER_PRODUCT_ORDER,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_FAIL,
  RESET_ORDER_UPDATE,
} from "../Constants/OrderConstant";

const OrderInitialState = {
  orderLoading: false,
  AllOrders: [],
  error: null,
};

const SingleOrderInitialState = {
  SingleOrderLoading: false,
  singleOrderStatus: {},
  error: null,
  deleteOrderSuccess:false
};

const UpdateOrderState = {
  updateLoading:false,
  updateStatus:null,
  error:null,
  OrderUpdateSuccess:false
}

const UserOrderState = {
  createOrderLoading: false,
  order: {},
  orderSuccess: false,
};

const UsersOrder = (state = OrderInitialState, action) => {
  switch (action.type) {
    case GET_USER_ORDER_DETAIL_REQUEST:
      return {
        ...state,
        orderLoading: true,
        AllOrders: [],
      };

    case GET_USER_ORDER_DETAIL_SUCCESS:
      return {
        orderLoading: false,
        AllOrders: action.payload.allOrders,
        error: null,
      };

    case GET_USER_ORDER_DETAIL_FAIL:
      return {
        orderLoading: false,
        error: action.payload,
      };

    case ORDER_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const UserCreatedOrder = (state = OrderInitialState, action) => {
  switch (action.type) {
    case GET_USER_ORDER_DETAIL_REQUEST:
      return {
        ...state,
        orderLoading: true,
        AllOrders: [],
      };

    case GET_USER_ORDER_DETAIL_SUCCESS:
      return {
        orderLoading: false,
        AllOrders: action.payload.MyOrderedItem,
        error: null,
      };

    case GET_USER_ORDER_DETAIL_FAIL:
      return {
        orderLoading: false,
        error: action.payload,
      };

    case ORDER_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const SingleOrders = (state = SingleOrderInitialState, action) => {
  switch (action.type) {
    case GET_SINGLE_ORDER_DETAIL_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        SingleOrderLoading: true,
        //orderLoading:true
      };

    case GET_SINGLE_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        SingleOrderLoading: false,
        //orderLoading:false,
        singleOrderStatus: action.payload,
        error: null,
      };

    case GET_SINGLE_ORDER_DETAIL_FAIL:
      return {
        ...state,
        SingleOrderLoading: false,
        //orderLoading:false,
        error: action.payload,
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        SingleOrderLoading:false,
        deleteOrderSuccess:true
      }

    case DELETE_ORDER_FAIL:
      return {
        ...state,
        SingleOrderLoading:false,
        error:action.payload
      }

    case RESET_DELETED_PRODUCT:
      return {
        SingleOrderLoading:false,
        deleteOrderSuccess:false,
        error:null
      }

    case ORDER_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const CreateOrder = (state = UserOrderState, action) => {
  switch (action.type) {
    case USER_ORDER_CREATE_REQUEST:
      return {
        createOrderLoading: true,
        order: {},
      };

    case USER_ORDER_CREATE_SUCCESS:
      return {
        createOrderLoading: false,
        order: action.payload,
        orderSuccess: true,
        error: null,
      };

    case USER_ORDER_CREATE_FAIL:
      return {
        createOrderLoading: false,
        order: {},
        orderSuccess: false,
        error: action.payload,
      };

    case RESET_USER_PRODUCT_ORDER:
      return {
        createOrderLoading: false,
        order: {},
        orderSuccess: false,
        error: null,
      };

    default:
      return state;
  }
};

const UpdateOrderStatus = (state = UpdateOrderState, action) => {
  switch(action.type)
  {
    case ORDER_UPDATE_REQUEST:
      return{
        ...state,
        updateLoading:true
      }

    case ORDER_UPDATE_SUCCESS:
      return {
        ...state,
        updateLoading:false,
        updateStatus:action.payload,
        error:null,
        OrderUpdateSuccess:true
      }

    case ORDER_UPDATE_FAIL:
      return {
        ...state,
        updateLoading:false,
        updateStatus:null,
        error:action.payload
      }

    case RESET_ORDER_UPDATE:
      return {
        updateLoading:false,
        updateStatus:null,
        error:null,
        OrderUpdateSuccess:false
      }

    default:
      return state
  }
}

export { UsersOrder, SingleOrders, CreateOrder, UserCreatedOrder, UpdateOrderStatus};
