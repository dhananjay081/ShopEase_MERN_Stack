import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBox, FaInfoCircle, FaPhone, FaChevronUp, FaChevronDown } from 'react-icons/fa';  // React Icons

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)} 
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        className="bg-slate-50 text-gray-700 py-2 px-4 rounded flex items-center justify-between w-full md:w-auto hover:border hover:border-gray-300" 
        onClick={() => setIsOpen(prev => !prev)}  // Toggle on click for mobile
      >
        ShopEase
        {isOpen ? (
          <FaChevronDown className="ml-2 text-gray-500 text-xs transition-transform duration-300" />
        ) : (
          <FaChevronUp className="ml-2 text-gray-500 text-xs transition-transform duration-300" />
        )}
      </button>

      {/* Dropdown content */}
      {isOpen && (
        <div className="absolute right-0 bg-white top-full mt-2 w-36 shadow-lg rounded z-10">
          <nav className="flex flex-col p-2">
            <Link to={"/"} className='whitespace-nowrap hover:bg-slate-100 p-2 flex items-center text-sm md:text-base'>
              <FaHome className="mr-2 text-gray-500" /> Home
            </Link>
            <Link to={"/products"} className='whitespace-nowrap hover:bg-slate-100 p-2 flex items-center text-sm md:text-base'>
              <FaBox className="mr-2 text-gray-500" /> Products
            </Link>
            <Link to={"/about"} className='whitespace-nowrap hover:bg-slate-100 p-2 flex items-center text-sm md:text-base'>
              <FaInfoCircle className="mr-2 text-gray-500" /> About
            </Link>
            <Link to={"/contact"} className='whitespace-nowrap hover:bg-slate-100 p-2 flex items-center text-sm md:text-base'>
              <FaPhone className="mr-2 text-gray-500" /> Contact
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
