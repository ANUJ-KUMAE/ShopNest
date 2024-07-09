import {
  ADD_TO_CART,
  REMOVE_ALL_ITEM_FROM_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFORMATION,
} from "../Constants/Cart-Constant";

const initialStates = {
  cartItems: [],
  totalItem: 0,
  totalAmount: 0,
  shippingInfo: null,
};

const AddTOCart = (state = initialStates, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find((i) => i.id === item.id);

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.id === isItemExist.id ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_FROM_CART:
      const updateCart = state.cartItems.filter(
        (curItem) => curItem.id !== action.payload
      );

      return {
        ...state,
        cartItems: updateCart,
      };

    case REMOVE_ALL_ITEM_FROM_CART:
      return {
        cartItems:[],
        shippingInfo:{}
      };

    case SAVE_SHIPPING_INFORMATION:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};

export { AddTOCart };
