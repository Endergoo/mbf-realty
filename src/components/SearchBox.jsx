import React from 'react';

const SearchBox = () => 
{
  return (
    <div className="search-container">
      <div className="search-box">
        <input type="text" placeholder="Location" className="location-input" />
        <button className="search-btn">🔍</button>
      </div>
      <div className="filter-container">
        <select className="filter-select">
          <option>Price</option>
          <option>$0 - $100,000</option>
          <option>$100,000 - $200,000</option>
          <option>$200,000+</option>
        </select>
        <select className="filter-select">
          <option>Beds</option>
          <option>1 Bed</option>
          <option>2 Beds</option>
          <option>3+ Beds</option>
        </select>
        <select className="filter-select">
          <option>Baths</option>
          <option>1 Bath</option>
          <option>2 Baths</option>
          <option>3+ Baths</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBox;