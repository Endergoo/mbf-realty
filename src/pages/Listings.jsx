import React, { useState, useEffect } from 'react';
import Listing from './../components/Listing';
import HouseMod from './../components/HouseMod';
import SideSearch from './../components/SideSearch';
import './../css/Listings.css';

const Listings = () => 
{ 
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    location: '',
    price: '',
    beds: '',
    baths: ''
  });
  
  const API_URL = 'https://mbf-server-zt5i.onrender.com';

  // Fetch all listings
  useEffect(() => 
  {
    const fetchListings = async () => 
      {
      try 
      {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_URL}/api/houses`);
        
        if (!response.ok) 
        {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Validate listings
        const validListings = Array.isArray(data) 
          ? data.filter(listing => listing && listing._id)
          : [];
        
        setListings(validListings);
        setFilteredListings(validListings);
        
      } 
      catch (error) 
      {
        console.error('Error fetching listings:', error);
        setError('Failed to load listings. Please try again later.');
      } 
      finally 
      {
        setLoading(false);
      }
    };
    
    fetchListings();
  }, []);

  // Handle filter application
  const handleApplyFilters = () => 
  {
    let filtered = listings;

    // Filter by location (address or name)
    if (filters.location) 
    {
      filtered = filtered.filter(listing => 
        listing.name?.toLowerCase().includes(filters.location.toLowerCase()) ||
        listing.address?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by price range
    if (filters.price) 
    {
      filtered = filtered.filter(listing => 
      {
        const listingPrice = listing.price || 0;
        switch (filters.price) 
        {
          case '0-200000':
            return listingPrice <= 200000;
          case '200000-400000':
            return listingPrice > 200000 && listingPrice <= 400000;
          case '400000-999999999':
            return listingPrice > 400000;
          default:
            return true;
        }
      });
    }

    // Filter by beds (minimum)
    if (filters.beds) 
    {
      const minBeds = parseInt(filters.beds);
      filtered = filtered.filter(listing => listing.bedrooms >= minBeds);
    }

    // Filter by baths (minimum)
    if (filters.baths) 
    {
      const minBaths = parseInt(filters.baths);
      filtered = filtered.filter(listing => listing.bathrooms >= minBaths);
    }

    setFilteredListings(filtered);
  };

  // Update filters when inputs change
  const handleFilterChange = () => 
  {
    const location = document.getElementById('location-filter')?.value || '';
    const price = document.getElementById('price-filter')?.value || '';
    const beds = document.getElementById('beds-filter')?.value || '';
    const baths = document.getElementById('baths-filter')?.value || '';
    
    setFilters({ location, price, beds, baths });
  };

  const handleHouseClick = (house) => 
  {
    if (house && house._id) 
    {
      setSelectedHouse(house);
    }
  };

  const closeModal = () => 
  {
    setSelectedHouse(null);
  };

  const clearFilters = () => 
  {
    // Reset all filter inputs
    const locationInput = document.getElementById('location-filter');
    const priceSelect = document.getElementById('price-filter');
    const bedsSelect = document.getElementById('beds-filter');
    const bathsSelect = document.getElementById('baths-filter');
    
    if (locationInput) locationInput.value = '';
    if (priceSelect) priceSelect.value = '';
    if (bedsSelect) bedsSelect.value = '';
    if (bathsSelect) bathsSelect.value = '';
    
    setFilters({ location: '', price: '', beds: '', baths: '' });
    setFilteredListings(listings);
  };

  // Add event listeners to filter inputs
  useEffect(() => 
  {
    const locationInput = document.getElementById('location-filter');
    const priceSelect = document.getElementById('price-filter');
    const bedsSelect = document.getElementById('beds-filter');
    const bathsSelect = document.getElementById('baths-filter');
    
    if (locationInput) 
    {
      locationInput.addEventListener('input', handleFilterChange);
    }
    if (priceSelect) 
    {
      priceSelect.addEventListener('change', handleFilterChange);
    }
    if (bedsSelect) 
    {
      bedsSelect.addEventListener('change', handleFilterChange);
    }
    if (bathsSelect) 
    {
      bathsSelect.addEventListener('change', handleFilterChange);
    }
    
    return () => 
    {
      if (locationInput) 
      {
        locationInput.removeEventListener('input', handleFilterChange);
      }
      if (priceSelect) 
      {
        priceSelect.removeEventListener('change', handleFilterChange);
      }
      if (bedsSelect) 
      {
        bedsSelect.removeEventListener('change', handleFilterChange);
      }
      if (bathsSelect) 
      {
        bathsSelect.removeEventListener('change', handleFilterChange);
      }
    };
  }, []);

  if (loading) 
  {
    return (
      <div className="listings-page">
        <h1>All Properties</h1>
        <div className="loading">Loading listings...</div>
      </div>
    );
  }

  if (error) 
  {
    return (
      <div className="listings-page">
        <h1>All Properties</h1>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="listings-page">
      <h1>All Properties</h1>
      
      <SideSearch onApplyFilters={handleApplyFilters} />
      
      {(filters.location || filters.price || filters.beds || filters.baths) && (
        <button onClick={clearFilters} className="clear-filters-btn">
          Clear All Filters
        </button>
      )}
      
      <div className="results-count">
        Showing {filteredListings.length} of {listings.length} properties
      </div>
      
      {filteredListings.length === 0 ? (
        <div className="no-listings">
          No properties match your search criteria. 
          <button onClick={clearFilters} className="clear-search-btn">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="listings-grid">
          {filteredListings.map((listing) => (
            <Listing 
              key={listing._id}
              listing={listing} 
              onClick={handleHouseClick}
            />
          ))}
        </div>
      )}

      {selectedHouse && (
        <HouseMod house={selectedHouse} onClose={closeModal} />
      )}
    </div>
  );
};

export default Listings;