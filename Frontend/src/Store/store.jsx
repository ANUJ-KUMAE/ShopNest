import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
//import ProductReducer from '../Reducers/productReducer';
import {
  ProductReducer,
  SimilarProductReducer,
  SingleProductReducer,
} from "../Reducers/productReducer";
import { LoginReducer, UpdateProfile } from "../Reducers/LoginSignupReducer";
import { AddTOCart } from "../Reducers/CartReducer";
import {
  AddNewProduct,
  AdminGetAllProduct,
  AdminProductPart,
  AdminUsers,
  UsersDetails,
} from "../Reducers/AdminReducer";
import { CreateOrder, SingleOrders, UpdateOrderStatus, UserCreatedOrder, UsersOrder } from "../Reducers/OrderReducer";
import { FilterReducers } from "../Reducers/FilterReducer";
import { ProductSearch } from "../Reducers/SearchReducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  products: ProductReducer,
  SingleProductDetails: SingleProductReducer,
  Authentication: LoginReducer,
  updateUserProfile: UpdateProfile,
  cart: AddTOCart,
  usersData: AdminUsers,
  SingleUserDetail: UsersDetails,
  ProductDetail: AdminProductPart,
  OrdersData: UsersOrder,
  SingleOrderData: SingleOrders,
  FilterDetails: FilterReducers,
  AddUserProduct:AddNewProduct,
  UserProductSearch:ProductSearch,
  userordercreate:CreateOrder,
  getorder:UserCreatedOrder,
  orderUpdate:UpdateOrderStatus,
  similarProducts:SimilarProductReducer,
  admingetProduct:AdminGetAllProduct
});

let initialstate = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : [],
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialstate,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
