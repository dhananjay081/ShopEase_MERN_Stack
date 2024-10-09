import {ADD_TO_CART , REMOVE_CART_ITEM, SAVE_SHIPPING_INFO} from "../constants/cartContains";


import axios from "axios";

// add to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: (data.product.images && data.product.images.length > 0)
          ? data.product.images[0].url
          : '/Profile.png', // default image
        stock: data.product.Stock ? data.product.Stock : 1,
        quantity,
      },
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    console.error('Error fetching product:', error.response ? error.response.data.message : error.message);
  }
};


// remove from cart

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
       type: REMOVE_CART_ITEM,
       payload:id,
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

//shipping Product
export const saveShippingInfo = (data) => async (dispatch, getState) => {
    dispatch({
       type:SAVE_SHIPPING_INFO,
       payload:data,
    })
    localStorage.setItem('shippingInfo', JSON.stringify(data));
}