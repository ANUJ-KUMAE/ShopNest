import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_ALL_ITEM_FROM_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFORMATION,
} from "../Constants/Cart-Constant";

const CartProduct = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `http://localhost:8050/Api/user/userSingleProduct/${id}`
  );

  dispatch({
    type: ADD_TO_CART,
    payload: {
      id: data.SingleProduct._id,
      name: data.SingleProduct.name,
      price: data.SingleProduct.price,
      image: data.SingleProduct.images[0].URL,
      stock: data.SingleProduct.stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const RemoveItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const SaveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFORMATION,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

const ClearCart = () => async(dispatch) => {
   dispatch({
    type:REMOVE_ALL_ITEM_FROM_CART
   })
   localStorage.removeItem("cartItems");
   localStorage.removeItem("shippingInfo");
}

export { CartProduct, RemoveItemFromCart, SaveShippingInfo, ClearCart };
