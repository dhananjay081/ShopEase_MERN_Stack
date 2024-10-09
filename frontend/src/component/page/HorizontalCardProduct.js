import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryWiseProducts } from "../../actions/productAction";
import { addItemsToCart } from "../../actions/cartAction";
import { CATEGORYWISE_PRODUCT_RESET } from "../../constants/productConstants";
import Loader from '../layout/Loader/loader.js';
import { useAlert } from "react-alert";
import { MdOutlineStarPurple500 } from "react-icons/md";


const HorizontalCardProduct = ({ category, heading }) => {
  const dispatch = useDispatch();
  const scrollElement = useRef();
  const alert = useAlert()

  const { products, loading } = useSelector(
    (state) => state.categoryWiseProducts
  );

  const [localLoading, setLocalLoading] = useState(true);

  // Fetch category-wise products when component mounts
  useEffect(() => {
    setLocalLoading(true); // Set loading to true when fetching
    dispatch(getCategoryWiseProducts(category));

    const handleLoadComplete = () => {
      if (!loading) {
        setLocalLoading(false); // Set loading to false when products are loaded
      }
    };

    handleLoadComplete(); // Check immediately

    return () => {
      dispatch({ type: CATEGORYWISE_PRODUCT_RESET }); // Reset action
    };
  }, [dispatch, category]);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  const handleAddToCart = (e , id) => {
    e.preventDefault();
    dispatch(addItemsToCart(id, 1));
    alert.success("Item Added to cart");
  };

  const filteredProducts = products
    ? products.filter((product) => product.category === category)
    : [];

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex  items-center gap-4 mx-4 md:gap-6 overflow-x-scroll overflow-y-hidden scrollbar-none transition-all thin-scrollbar"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 mr-2 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {localLoading ? (
          <Loader /> // Show Loader when loading
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const sellingPrice = product.price * 0.8; 
            return (
              <Link
                to={"/product/"+product?._id}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
                key={product._id}
              >
                <div className="h-full mx-1   min-w-[120px] md:min-w-[145px]">
                  <img
                    src={product.images[0].url}
                    className="object-scale-down h-full hover:scale-105 transition-all"
                    alt={product.name}
                  />
                </div>
                <div className="p-4 flex flex-col  h-full">
                    <div>
                    <h3 className="font-normal text-sm md:text-base text-ellipsis line-clamp-2 text-black">
                      {product.name}
                    </h3>
                    </div>
                   
                    <p className="capitalize text-slate-500 text-sm">
                      {product.category}
                    </p>
                    <div className="flex items-center px-1 w-11  bg-green-700 text-white  rounded-sm h-4 ">
                        <span className="text-xs ml-1 font-semibold">{product.ratings}</span> {/* Number display */}
                        <MdOutlineStarPurple500 className="text-white text-xs ml-1" /> {/* Star icon */}
                        </div>
                    <div className="flex gap-3 mt-auto text-sm py-2">
                      <p className="text-red-600 font-medium">
                        ₹{sellingPrice.toFixed(2)}
                      </p>{" "}
                      <p className="text-slate-500 line-through">
                        ₹{product.price}
                      </p>{" "}
                  </div>


                  <button
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                    onClick={(e) => handleAddToCart(e , product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            );
          })
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
