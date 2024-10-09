import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { IoIosStar } from 'react-icons/io';

function Slider({ products }) {
  return (
    <>
      <div className="poster h-1/2 mt-5">
        <Carousel
          autoPlay
          infiniteLoop
          interval={2000}
          showThumbs={false}
          transitionTime={3}
          showStatus={false}
        >
          {products.map((product) => (
            <Link
              key={product._id}
              className="text-white"
              to={`/product/${product._id}`}
            >
              <div className=" h-3.2/4 w-2/4 m-auto bg-green-600">
                {/* Check if product.images exists and has at least one image */}
                <img
                  className="m-auto w-full h-full object-cover"
                  src={product.images && product.images.length > 0 ? product.images[0].url : 'https://via.placeholder.com/400'}
                  alt={product.name}
                />
                <div className=" bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-5">
                  <div className="font-black text-lg sm:text-2xl md:text-4xl mb-2">
                    {product.name}
                  </div>
                  <div className="flex items-center text-sm sm:text-lg md:text-xl mb-4">
                    {new Date(product.createdAt).toLocaleDateString()}
                    <span className="bg-red-500 ml-2 sm:ml-4 px-1 sm:px-2 py-0.5 sm:py-1 rounded">
                      {product.ratings}
                    </span>
                    <span className="ml-1 sm:ml-2">
                      <IoIosStar />
                    </span>
                  </div>
                  <div className="italic text-sm sm:text-lg p-2 sm:p-4 overflow-hidden text-ellipsis">
                    {product.description}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default Slider;
