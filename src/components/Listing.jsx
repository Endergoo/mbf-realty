import React from 'react';
import './../css/Listing.css';

const Listing = ({ listing, onClick }) => 
{
  const price = listing?.price ? `$${listing.price.toLocaleString()}` : 
                listing?.listPrice ? `$${listing.listPrice.toLocaleString()}` : 'Price Coming Soon';
  
  const beds = listing?.beds ?? listing?.bedrooms ?? 'N/A';
  const baths = listing?.baths ?? listing?.bathrooms ?? 'N/A';
  const sqft = listing?.sqft ?? listing?.size ?? 'N/A';
  const sqftFormatted = sqft !== 'N/A' && sqft ? sqft.toLocaleString() : 'N/A';
  const status = listing?.status || '';
  const address = listing?.address ?? listing?.name ?? 'Address Not Available';
  const image = listing?.image ?? listing?.main_image;

  return (
    <div 
      className="listing-card" 
      onClick={() => onClick && onClick(listing)}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="listing-image">
        <div className="house-img">
          {image ? (
            <img className="house-picture" src={image} alt={address} />
          ) : (
            <span>Coming Soon - New Listings</span>
          )}
        </div>
      </div>
      <div className="listing-info">
        <div className="price">{price}</div>
        <div className="details">
          {beds} Bed | {baths} Bath | {sqftFormatted} sqft {status && `| ${status}`}
        </div>
        <div className="address">{address}</div>
      </div>
    </div>
  );
};

export default Listing;