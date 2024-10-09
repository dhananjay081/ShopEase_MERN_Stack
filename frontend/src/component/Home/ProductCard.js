import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

function Product({ product, handleAddToCart }) {
  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    size: window.innerWidth < 600 ? 18 : 22, // Adjusted size for smaller stars
    value: product.ratings,
    isHalf: true,
  };

  return (
    <Link
      to={"/product/" + product._id}
      className='bg-white rounded-sm shadow aspect-[3/4] scale-75' // Smaller scale
      onClick={() => window.scrollTo(0, 0)} // scroll to top on click
      key={product._id}
    >
      {/* Product Image */}
      <div className='bg-slate-200 h-44 flex justify-center items-center overflow-hidden'> {/* Fixed height */}
        {product.images.length > 0 ? (
          <img
            src={product.images[0].url}
            alt={product.name}
            className='object-cover h-full w-full transition-all hover:scale-105' // Fixed size for image
          />
        ) : (
          <div className="bg-gray-300 h-full w-full flex items-center justify-center">
            No Image Available
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className='p-2 grid gap-1'>
        {/* Product Name */}
        <h2 className='font-medium text-xs md:text-sm text-ellipsis line-clamp-1 text-black'>
          {product.name}
        </h2>
        
        {/* Category */}
        <p className='capitalize text-slate-500 text-xs'>{product.category}</p>

        {/* Price Details */}
        <div className='flex gap-2'>
          <p className='text-red-600 font-medium text-sm'>
            ₹{Math.floor(product.price * 0.8)}
          </p>
          <p className='text-slate-500 line-through text-xs'>
            ₹{product.price}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          className='text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-0.5 rounded-full'
          onClick={(e) => handleAddToCart(e, product._id)}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}

export default Product;
