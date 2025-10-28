import React, { useState } from 'react';
import './../css/Listings.css';
import Listing from './../components/Listing';
import SideSearch from './../components/SideSearch';

const Listings = () => 
{
  const allListings = [
    { id: 1, price: 350000, beds: 3, baths: 2, sqft: 1800, status: 'Available', address: '123 Oak Street, Springfield, IL 62701', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=300&fit=crop' },
    { id: 2, price: 275000, beds: 2, baths: 2, sqft: 1400, status: 'Available', address: '456 Pine Avenue, Madison, WI 53703', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&h=300&fit=crop' },
    { id: 3, price: 525000, beds: 4, baths: 3, sqft: 2500, status: 'Available', address: '789 Maple Drive, Columbus, OH 43215', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=300&fit=crop' },
    { id: 4, price: 425000, beds: 3, baths: 2.5, sqft: 2100, status: 'Available', address: '321 Elm Street, Nashville, TN 37201', image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=500&h=300&fit=crop' },
    { id: 5, price: 185000, beds: 2, baths: 1, sqft: 1200, status: 'Available', address: '654 Cedar Lane, Richmond, VA 23220', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop' },
    { id: 6, price: 680000, beds: 5, baths: 4, sqft: 3200, status: 'Available', address: '987 Birch Court, Atlanta, GA 30309', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=300&fit=crop' },
    { id: 7, price: 310000, beds: 3, baths: 2, sqft: 1750, status: 'Available', address: '234 Willow Way, Portland, OR 97201', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=300&fit=crop' },
    { id: 8, price: 450000, beds: 4, baths: 3, sqft: 2200, status: 'Available', address: '567 Sunset Blvd, Austin, TX 78701', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&h=300&fit=crop' }
  ];

  const [filteredListings, setFilteredListings] = useState(allListings);

  const handleApplyFilters = () => 
  {
    const location = document.getElementById('location-filter').value.toLowerCase();
    const priceRange = document.getElementById('price-filter').value;
    const beds = document.getElementById('beds-filter').value;
    const baths = document.getElementById('baths-filter').value;

    let filtered = allListings.filter(listing => 
    {
      if (location && !listing.address.toLowerCase().includes(location)) 
      {
        return false;
      }

      if (priceRange) 
      {
        const [min, max] = priceRange.split('-').map(Number);
        if (listing.price < min || listing.price > max) 
        {
          return false;
        }
      }

      if (beds && listing.beds < parseInt(beds)) 
      {
        return false;
      }

      if (baths && listing.baths < parseInt(baths)) 
      {
        return false;
      }

      return true;
    });

    setFilteredListings(filtered);
  };

  return (
    <div className="listings-page">
      <div className="listings-content">
        <h1 className="page-title">All Listings</h1>
        
        <SideSearch onApplyFilters={handleApplyFilters} />
        
        <p className="results-count">Showing {filteredListings.length} results</p>
        
        <div className="listings-grid">
          {filteredListings.map((listing) => (
            <Listing key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listings;