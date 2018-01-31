// Default imports
import React from 'react';

function SearchBar() {
  return (
    <form className="searchbar">
      <input type="text" name="search" className="input" />
      <button className="button">find your hero</button>
    </form>
  );
}

export default SearchBar;
