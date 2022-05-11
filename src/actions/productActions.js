import { FETCH_PRODUCTS } from "../types";
import {
  ORDER_PRODUCTS_BY_PRICE,
  ORDER_PRODUCTS_BY_CATEGORY,
  ORDER_PRODUCTS_BY_NAME,
  ADD_REMOVE_FROM_CART,
} from "../types";
import { product } from "./data";







export const fetchProducts = () => async (dispatch, getState) => {
  let data;
  const res = await fetch("https://muigrocery.free.beeceptor.com/groceries");
  if (res.status === 429) {
    data = product;
  } else {
    data = await res.json();
  }

  const cartItems = getState().cart.cartItems.slice();
  data.products = data.products.map((item) => ({
    ...item,
    qty: 0,
  }));
  for (let j = 0; j < data.products.length; j++) {
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].name === data.products[j].name) {
        data.products[j].qty = cartItems[i].qty;
      }
    }
  }

  dispatch({
    type: FETCH_PRODUCTS,
    payload: data.products,
  });
};










export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice();
  if (sort === "latest") {
    sortedProducts.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};

export const sortProductsByCatogary =
  (sortedProducts, sort) => async (dispatch, getState) => {
    let productList = getState().products.items;
    let sortedProducts = [];
    sortedProducts = productList;
    if (sort.category !== "all") {
      sortedProducts = productList.filter(
        (item) => item.type === sort.category
      );
    }

    sortedProducts = sortedProducts.filter((item) => {
      return item.name.toLowerCase().includes(sort.search.toLowerCase().trim());
    });
    const cartItems = getState().cart.cartItems.slice();
    for (let j = 0; j < sortedProducts.length; j++) {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name === sortedProducts[j].name) {
          sortedProducts[j].qty = cartItems[i].qty;
        }
      }
    }

    dispatch({
      type: ORDER_PRODUCTS_BY_CATEGORY,
      payload: {
        sort: sort,
        items: sortedProducts,
      },
    });
  };

export const wildCartSearch = (sort) => async (dispatch, getState) => {
  let productList = getState().products.items;
  let sortedProducts = productList;
  if (
    sort.category !== undefined &&
    sort.category !== "" &&
    sort.category !== "all"
  ) {
    sortedProducts = productList.filter((item) => item.type === sort.category);
  }
  if (sort.search.trim()) {
    sortedProducts = sortedProducts.filter((item) => {
      return item.name.toLowerCase().includes(sort.search.toLowerCase().trim());
    });
  }
  dispatch({
    type: ORDER_PRODUCTS_BY_NAME,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};

export const addRemoveFromCart = (type, i) => async (dispatch, getState) => {
  let productList = getState().products.items;

  if (type === "+") {
    productList[i].qty += 1;
  } else if (productList[i].qty === 0) {
    if (type === "-") {
      return false;
    }
  } else {
    productList[i].qty -= 1;
  }

  let totalCount = 0;
  for (let i = 0; i < productList.length; i++) {
    totalCount += parseInt(productList[i].qty);
  }

  dispatch({
    type: ADD_REMOVE_FROM_CART,
    payload: {
      items: productList,
      totalCount: totalCount,
    },
  });
};
