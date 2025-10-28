import React from 'react';
import './../css/Listing.css';

const Listing = ({ listing }) => 
{
  return (
    <div className="listing-card">
      <div className="listing-image">
        <div className="house-img">
          {listing.image ? (
            <a href="#listing">
              <img className="house-picture" src={listing.image} alt={listing.address} />
            </a>
          ) : (
            <span>Coming Soon - New Listings</span>
          )}
        </div>
      </div>
      <div className="listing-info">
        <div className="price">${listing.price.toLocaleString()}</div>
        <div className="details">
          {listing.beds} Bed | {listing.baths} Bath | {listing.sqft} sqft | {listing.status}
        </div>
        <div className="address">{listing.address}</div>
      </div>
    </div>
  );
};

export default Listing;