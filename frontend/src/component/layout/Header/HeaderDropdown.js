import React, { useState } from 'react';
import { FaBell, FaHeadset, FaBullhorn, FaDownload } from 'react-icons/fa';
import { HiOutlineEllipsisVertical } from "react-icons/hi2";

const HeaderDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">

      <button 
        className="p-2 md:p-3 rounded-md hover:bg-gray-200" 
        onClick={toggleDropdown}
      >
        <HiOutlineEllipsisVertical className="text-gray-700 text-xl" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 z-10">
          <nav className="flex flex-col p-2">
            <a href="#" className="flex items-center p-2 hover:bg-gray-100 text-sm">
              <FaBell className="mr-2 text-gray-500 text-sm" /> Notification Preferences
            </a>
            <a href="#" className="flex items-center p-2 hover:bg-gray-100 text-sm">
              <FaHeadset className="mr-2 text-gray-500 text-sm" /> 24x7 Customer Care
            </a>
            <a href="#" className="flex items-center p-2 hover:bg-gray-100 text-sm">
              <FaBullhorn className="mr-2 text-gray-500 text-sm" /> Advertise
            </a>
            <a href="#" className="flex items-center p-2 hover:bg-gray-100 text-sm">
              <FaDownload className="mr-2 text-gray-500 text-sm" /> Download App
            </a>
          </nav>
        </div>
      )}
    </div>
  );
};

export default HeaderDropdown;
