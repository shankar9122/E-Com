import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

let cartData = JSON.parse(localStorage.getItem("cartItems") || "[]");
let totalCount = 0;
for (let i = 0; i < cartData.length; i++) {
  totalCount += parseInt(cartData[i].qty);
}
export const cartReducer = (
  state = {
    cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
    cartTotal: totalCount,
  },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        cartItems: action.payload.cartItems,
        cartTotal: action.payload.totalCount,
      };
    case REMOVE_FROM_CART:
      return {
        cartItems: action.payload.cartItems,
        cartTotal: action.payload.totalCount,
      };
    default:
      return state;
  }
};
