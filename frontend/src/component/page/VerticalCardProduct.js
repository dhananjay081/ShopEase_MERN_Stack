import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productAction'; // For fetching products
import { addItemsToCart } from '../../actions/cartAction'; // For adding items to cart
import scrollTop from '../helpers/scrollTop.js';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader/loader.js';
import { useAlert } from "react-alert";
import { MdOutlineStarPurple500 } from "react-icons/md";

const VerticalCard = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, products } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);

  // Fetch products when component mounts
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const handleAddToCart = (e, id) => {
    e.preventDefault();
    dispatch(addItemsToCart(id, 1)); // Add one item to the cart
    alert.success("Item Added to cart");
  };
 
  return (
    <div className='container mx-auto px-4 my-8'>
      {/* Heading */}
      <h2 className='text-2xl font-semibold  '>
        Recommended Products
      </h2>
      
      {/* Products Grid */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {loading ? (
          <Loader />
        ) : (
          (
            products && products.length > 0 ? (
              products?.map((product) => (
                <Link
                  to={"/product/" + product._id}
                  className='bg-white rounded-sm shadow aspect-[3/4] scale-90'
                  onClick={scrollTop}
                  key={product._id}
                >
                  <div className='bg-slate-200 h-44 p-2 flex justify-center items-center'>
                    <img
                      src={product.images[0]?.url}
                      className='object-scale-down h-full hover:scale-105 transition-all mix-blend-multiply'
                      alt={product.name}
                    />
                  </div>
                  <div className='p-3 grid gap-2'>
                    <h2 className='font-medium text-sm md:text-base text-ellipsis line-clamp-1 text-black'>
                      {product.name}
                    </h2>
                    <p className='capitalize text-slate-500'>{product.category}</p>
                    <div className="flex items-center px-1 w-11  bg-green-700 text-white  rounded-sm h-4 ">
                      <span className="text-xs ml-1 font-semibold">5</span>
                      <MdOutlineStarPurple500 className="text-white text-xs ml-1" />
                    </div>
                    <div className='flex gap-2'>
                      <p className='text-red-600 font-medium'>
                        ₹{Math.floor(product.price * 0.8)}
                      </p>
                      <p className='text-slate-500 line-through'>
                        ₹{product.price}
                      </p>
                    </div>
                    <button
                      className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'
                      onClick={(e) => handleAddToCart(e, product._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))
            ) : (
              <p>No products available.</p>
            )
          )
        )

}
      </div>
    </div>
  );
  
};

export default VerticalCard;
