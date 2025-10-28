import React from 'react';

const SideSearch = ({ onApplyFilters }) => 
{
  return (
    <div className="filter-section">
      <div className="filter-row">
        <input 
          type="text" 
          className="filter-input" 
          placeholder="Location" 
          id="location-filter" 
        />
        <select className="filter-select" id="price-filter">
          <option value="">Price</option>
          <option value="0-200000">$0 - $200,000</option>
          <option value="200000-400000">$200,000 - $400,000</option>
          <option value="400000-999999999">$400,000+</option>
        </select>
        <select className="filter-select" id="beds-filter">
          <option value="">Beds</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
        <select className="filter-select" id="baths-filter">
          <option value="">Baths</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
        </select>
        <button className="apply-btn" onClick={onApplyFilters}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default SideSearch;