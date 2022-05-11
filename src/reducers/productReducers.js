import {
  FETCH_PRODUCTS,
  ORDER_PRODUCTS_BY_PRICE,
  ORDER_PRODUCTS_BY_CATEGORY,
  ORDER_PRODUCTS_BY_NAME,
  ADD_REMOVE_FROM_CART,
} from "../types";

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PRODUCTS_BY_PRICE:
      return {
        ...state,
        sort: action.payload.sort,
        filteredItems: action.payload.items,
      };
    case ORDER_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        sort: action.payload.sort,
        filteredItems: action.payload.items,
      };
    case ORDER_PRODUCTS_BY_NAME:
      return {
        ...state,
        sort: action.payload.sort,
        filteredItems: action.payload.items,
      };
    case ADD_REMOVE_FROM_CART:
      return {
        ...state,
        filteredItems: action.payload.items,
        cartCount: action.payload.cartCount,
      };

    case FETCH_PRODUCTS:
      return { items: action.payload, filteredItems: action.payload };
    default:
      return state;
  }
};
