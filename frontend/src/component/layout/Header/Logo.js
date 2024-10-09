import React from 'react';

const Logo = ({ w, h }) => {
    return (
        <div className="flex items-center space-x-1">
          {/* Icon */}
          <div className="bg-red-600 pt-1 text-white text-xl font-bold h-10 w-10 flex items-center justify-center rounded" style={{ fontFamily: "'Great Vibes', cursive" }}>
            S
          </div>
          
          {/* Text */}
          <div className="text-gray-800 text-3xl pt-1 hidden md:block" style={{ fontFamily: "'Great Vibes', cursive" }}>
            ShopEase
          </div>
          
          {/* Responsive Text */}
          <div className="text-gray-800 text-xl pt-1 md:hidden" style={{ fontFamily: "'Great Vibes', cursive" }}>
            SE
          </div>
        </div>
    );
};

export default Logo;
