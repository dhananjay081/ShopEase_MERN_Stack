import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryWiseProducts } from '../../actions/productAction';
import{CATEGORYWISE_PRODUCT_RESET} from '../../constants/productConstants'

const CategroyWiseProductDisplay = ({ category, heading }) => {
  const dispatch = useDispatch();
  
  // Select products, loading, and error from Redux state
  const { products, loading, error } = useSelector((state) => state.categoryWiseProducts);

  useEffect(() => {
    dispatch({ type: CATEGORYWISE_PRODUCT_RESET });
    // Fetch products for the specific category
    dispatch(getCategoryWiseProducts(category));
  }, [dispatch, category]);

  const handleAddToCart = (e, id) => {
    // Add your add to cart logic here
  };

  return (
    <div className='container mx-auto px-4 my-6 relative'>
      <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
        {loading ? (
          <div>Loading...</div> // Loader if data is loading
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          products.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
              <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                <img
                  src={product.images[0].url} // Extracting the image URL from product.images
                  alt={product.name} // Using product.name for the alt text
                  className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'
                />
              </div>
              <div className='p-4 grid gap-3'>
                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product.name}</h2> {/* Displaying product name */}
                <p className='capitalize text-slate-500'>{product.category}</p> {/* Displaying product category */}
                <div className='flex gap-3'>
                  <p className='text-red-600 font-medium'>₹{product.price}</p> {/* Displaying product price */}
                </div>
                <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e) => handleAddToCart(e, product._id)}>Add to Cart</button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategroyWiseProductDisplay;
