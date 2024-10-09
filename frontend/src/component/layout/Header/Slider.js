import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { IoIosStar } from 'react-icons/io'; // Assuming you are using this icon

function Slider() {
  // Placeholder data for layout purposes
  const placeholderMovies = [
    {
      id: 1,
      original_title: "Default Product 1",
      release_date: "2023-10-01",
      vote_average: 8.5,
      overview: "This is a placeholder description for Product 1.",
      backdrop_path: "/default-image1.jpg" // Placeholder image
    },
    {
      id: 2,
      original_title: "Default Product 2",
      release_date: "2023-09-01",
      vote_average: 7.8,
      overview: "This is a placeholder description for Product 2.",
      backdrop_path: "/default-image2.jpg" // Placeholder image
    },
    {
      id: 3,
      original_title: "Default Product 3",
      release_date: "2023-08-01",
      vote_average: 9.0,
      overview: "This is a placeholder description for Product 3.",
      backdrop_path: "/default-image3.jpg" // Placeholder image
    }
  ];

  return (
    <>
      <div className="poster h-1/2 mt-5 ">
        <Carousel
         className=''
          autoPlay
          infiniteLoop
          interval={2000} 
          showThumbs={false}
          transitionTime={3}
          showStatus={false}
        >
          {placeholderMovies.map((product) => (
            <Link
              key={product.id}
              className="text-white h-screen"
              to={`/product/${product.id}`}
            >
              <div className="  h-3.2/4 w-2/4 m-auto bg-green-600">
                <img
                  className="m-auto w-full h-full object-cover"
                  // Use placeholder image URL
                  src={`https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                  alt={product.original_title}
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-5">
                  <div className="font-black text-lg sm:text-2xl md:text-4xl mb-2">
                    {product.original_title}
                  </div>
                  <div className="flex items-center text-sm sm:text-lg md:text-xl mb-4">
                    {product.release_date}
                    <span className="bg-red-500 ml-2 sm:ml-4 px-1 sm:px-2 py-0.5 sm:py-1 rounded">
                      {product.vote_average}
                    </span>
                    <span className="ml-1 sm:ml-2">
                      <IoIosStar />
                    </span>
                  </div>
                  <div className="italic text-sm sm:text-lg p-2 sm:p-4 overflow-hidden text-ellipsis">
                    {product.overview}
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
