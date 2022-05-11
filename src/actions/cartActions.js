import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";
export const addToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems;
  let alreadyExists = false;
  if (product.qty > 0) {
    cartItems.forEach((x) => {
      if (x.id === product.id) {
        alreadyExists = true;
        x.qty = product.qty;
      }
    });
    if (!alreadyExists) {
      cartItems.push({
        ...product,
        qty: product.qty,
        total: product.price * product.qty,
      });
    }

    let totalCount = 0;
    for (let i = 0; i < cartItems.length; i++) {
      totalCount += parseInt(cartItems[i].qty);
    }
    dispatch({
      type: ADD_TO_CART,
      payload: { cartItems, totalCount },
    });
  }
  if (product.qty <= 0) {
    const cartItems = getState()
      .cart.cartItems.slice()
      .filter((x) => x.id !== product.id);
    let totalCount = 0;
    for (let i = 0; i < cartItems.length; i++) {
      totalCount += parseInt(cartItems[i].qty);
    }
    dispatch({ type: REMOVE_FROM_CART, payload: { cartItems, totalCount } });
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (type, i, product) => (dispatch, getState) => {
  let cartItems = getState().cart.cartItems;
  if (type === "+") {
    cartItems[i].qty += 1;
  } else if (cartItems[i].qty === 0) {
    cartItems = cartItems.slice().filter((x) => x.id !== product.id);
    if (type === "-") {
    }
  } 
  
  else {
    cartItems[i].qty -= 1;
    if (cartItems[i].qty === 0) {
    cartItems = cartItems.slice().filter((x) => x.id !== product.id);
    }
  }
  let totalCount = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalCount += parseInt(cartItems[i].qty);
  }
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems, totalCount },
  });
  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems, totalCount } });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
