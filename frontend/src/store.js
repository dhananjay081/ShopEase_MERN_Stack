import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk"; 
import { composeWithDevTools } from "redux-devtools-extension";
import { NewProductReducer,
          newReviewReducer,
          productDetailsReducer,
          productReducer,
          productReviewsReducer,
          productsReducer,
          categoryProductReducer, 
          reviewReducer,
          categoryWiseProductReducer} from "./reducers/productReducer"; 
import { allUsersReducer, ForgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import {cartReducer} from "./reducers/cartReducer"
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({ 
    products: productsReducer,
    productDetails: productDetailsReducer, 
    user: userReducer,
    profile: profileReducer,
    forgotPassword:ForgotPasswordReducer,
    cart : cartReducer,
    newOrder : newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct : NewProductReducer,
    product: productReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    allUsers: allUsersReducer,
    userDetails:userDetailsReducer,
    productReviews : productReviewsReducer,
    review: reviewReducer,
    categoryProducts: categoryProductReducer,
    categoryWiseProducts:categoryWiseProductReducer
});

let initialState = {
  cart:{
    cartItems: localStorage.getItem("cartItems")?
    JSON.parse(localStorage.getItem("cartItems")) :[],
    ShippingInfo:localStorage.getItem("shippingInfo")?
    JSON.parse(localStorage.getItem("shippingInfo")): {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
