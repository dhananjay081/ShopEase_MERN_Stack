import React , {Fragment} from 'react'
import "./Cart.css"
import CartItemCard from "./CartItemCard.js";
import { useSelector , useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {Typography } from "@material-ui/core"
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { addItemsToCart , removeItemsFromCart} from '../../actions/cartAction.js';

function Cart() {
    const dispatch = useDispatch()
    const nevigate = useNavigate()
    const { cartItems } = useSelector((state)=>state.cart)
    const { isAuthenticated } = useSelector((state) => state.user);
    
    const increseQuantity = (id , quantity , stock ) =>{
        const newQty = quantity + 1;
        if(stock <= quantity){
            return;
        }
        dispatch(addItemsToCart(id, newQty))
    }

    const decreseQuantity = (id , quantity  ) =>{
        const newQty = quantity -  1;
        if(1>= quantity){
            return;
        }
        dispatch(addItemsToCart(id, newQty))
    }
    const deleteCartItems = (id)=>{
        dispatch(removeItemsFromCart(id))
    }
    
    const checkOutHandeler = () => {
        if (isAuthenticated) {
            nevigate("/shipping");
        } else {
            nevigate("/login?rediret=shipping");
        }
    };

   
  return (
    <Fragment>
         {cartItems.length === 0 ? (
            <div className='emptyCart'>
                 <RemoveShoppingCartIcon/>

                 <Typography>No Product in Your Cart</Typography>
                 <Link to="/products">View Products</Link>
            </div>
         ):
        <Fragment>
        <div className='cartPage'>
            <div className='cartHeader'>
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>
           {cartItems && cartItems.map((item)=>(
             <div className='cartContainer' key = {item.product}>
                <CartItemCard item = {item} deleteCartItems = {deleteCartItems}/>
                <div className='cartInput'>
                    <button onClick={()=>
                        decreseQuantity(item.product , item.quantity)}
                        >-</button>
                    <input type='number' value= {item.quantity} readOnly/>
                    <button
                     onClick={()=>
                        increseQuantity(item.product, item.quantity, item.stock)
                     }
                    >+</button>
                </div>
                <p className='cartSubtotal'>{`₹${item.price * item.quantity}`}</p>
             </div>
           ))}

            <div className='cartGrossProfit'>
                <div></div>
                <div className='cartGrossProfitBox'>
                    <p>Gross Total</p>
                    <p>{`₹${cartItems.reduce(
                        (acc ,  item)=> acc + item.quantity*item.price,0
                    )}`}</p>
                </div>
                <div></div>
                <div className='checkOutBtn'>
                    <button onClick={checkOutHandeler}>Check Out</button>
                </div>
            </div>
        </div>
    </Fragment>
       }
    </Fragment>   
  )
}

export default Cart