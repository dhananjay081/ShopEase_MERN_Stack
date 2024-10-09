import React, { useState } from 'react';
import Logo from './Logo.js';
import DropdownMenu from './DropdownMenu.js';
import HeaderDropdown from './HeaderDropdown.js';
import { GrSearch } from "react-icons/gr";
import { IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { logout } from '../../../actions/userAction';  
import 'react-toastify/dist/ReactToastify.css';


const Header = () => {

  const navigate = useNavigate();
  const dispatch  = useDispatch();
  const alert = useAlert()
  const {user } = useSelector((state)=>state.user);
  const {cartItems } = useSelector((state)=>state.cart);

 
  // Default context data for testing
  const context = {
    cartProductCount: cartItems.length, 
  };



  function logoutUser(){
    dispatch(logout());
    alert.success("Logout Successfully")
   
}

  const [keyword, setKeyword] = useState('');
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`); // Use navigate for redirection
    } else {
      navigate('/products');
    }
  };

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40 top-0'>
      <div className='h-full container mx-auto flex items-center  justify-between'>
        <Link to={"/"}>
          <Logo w={90} h={50} />
        </Link>

        {/* Search input for larger screens */}
        <form className='hidden lg:flex items-center w-full justify-between max-w-lg border rounded-full focus-within:shadow pl-2' onSubmit={searchSubmitHandler}>
          <input
            type='text'
            placeholder='Search product here...'
            className='w-full outline-none text-sm text-gray-700'
            onChange={(e) => setKeyword(e.target.value)}
      
          />
            <input type='submit' value='Search' className='text-xs min-w-[50px] h-8 flex items-center justify-center rounded-r-full text-white bg-red-600 hover:bg-red-600 ml-2'/>
            {/* <GrSearch className='text-white' />
          </input> */}

        </form>

        {/* Icons and dropdown for all screens */}
        <div className='flex items-center gap-7'>
          <div className='relative flex justify-center'>
            <DropdownMenu />
          </div>

          {user?._id && (
            <Link to={"/cart"} className='text-2xl relative'>
              <span className='hover:text-red'><IoCartOutline /></span>
              <div className='text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3 bg-red-600'>
                <p className='text-sm'>{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button onClick={logoutUser} className='px-3 py-1 rounded-full bg-red-600 text-white text-sm hover:bg-red-700'>Logout</button>
            ) : (
              <Link to={"/login"} className='px-3 py-1 rounded-full bg-red-600 text-white text-sm hover:bg-red-700'>Login</Link>
            )}
          </div>

          <div className='relative flex items-center justify-center'>
            <HeaderDropdown />
          </div>
        </div>

        {/* Search icon for smaller screens */}
        <Link to={`/search`} className='lg:hidden text-lg'>
          <GrSearch />
        </Link>
      </div>
    </header>
    
  );
};

export default Header;
