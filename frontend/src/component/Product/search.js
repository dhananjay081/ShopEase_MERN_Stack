import React, { useState, Fragment } from 'react';
import './Search.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Search() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate(); // Use navigate instead of history

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`); // Use navigate for redirection
    } else {
      navigate('/products');
    }
  };

  return (
    <Fragment>
      <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input
          type='text'
          placeholder='Search a Product ...'
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type='submit' value='Search' />
      </form>
    </Fragment>
  );
}

export default Search;
