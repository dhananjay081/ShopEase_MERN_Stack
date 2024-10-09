import React from 'react'
import "./CartItemCard.css";
import {Link} from "react-router-dom"

function CartItemCard({item , deleteCartItems}) {
  return (
     <div className='cartItemCard'>
        <img src={item.image} alt='ssa'/>
        <div>
            <Link className='my-1' to= {`/product/${item.product}`}>{item.name}</Link>
            <span className='my-1'>{`Price: ₹${item.price}`}</span>
            <p className='my-1' onClick={
               ()=> deleteCartItems(item.product)
            }>Remove</p>
        </div>
     </div>
  )
}

export default CartItemCard 