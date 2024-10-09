import { ADD_TO_CART, SAVE_SHIPPING_INFO } from "../constants/cartContains";
import {REMOVE_CART_ITEM } from "../constants/cartContains";



export const cartReducer = (state = { cartItems: [] , shippingInfo:{} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            // Defensive check to ensure cartItems is always an array
            const isItemExist = (state.cartItems || []).find(
                (i) => i.product === item.product
            );

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) => 
                        i.product === isItemExist.product ? item : i
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
           case  REMOVE_CART_ITEM :
            return {
                ...state,
                cartItems: state.cartItems.filter((i) =>  i.product !== action.payload),
            } 
            case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            }
        default:
            return state;
    }
};
