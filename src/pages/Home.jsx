import React, { useState, useEffect } from 'react';
import SlideShow from './../components/SlideShow';
import SearchBox from './../components/SearchBox'; // Add this import
import Listing from './../components/Listing';
import HouseMod from './../components/HouseMod';

const Home = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_URL = 'https://mbf-server-zt5i.onrender.com';

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_URL}/api/houses`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Validate listings
        const validListings = Array.isArray(data) 
          ? data.filter(listing => {
              const isValid = listing && 
                            typeof listing === 'object' && 
                            listing._id &&
                            listing.name !== undefined;
              return isValid;
            })
          : [];
        
        setFeaturedListings(validListings);
        
      } catch (error) {
        console.error('Error fetching listings:', error);
        setError(`Failed to load listings: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchListings();
  }, []);

  const handleHouseClick = (house) => {
    if (house && house._id) {
      setSelectedHouse(house);
    }
  };

  const closeMod = () => {
    setSelectedHouse(null);
  };

  return (
    <>
      <SlideShow />
      
      {/* Add SearchBox below the slideshow */}
      <SearchBox />
      
      <section className="featured-section">
        <h2 className="section-title">Featured Listings</h2>
        
        {error && (
          <p style={{textAlign: 'center', color: '#ff6b6b'}}>{error}</p>
        )}
        
        {loading ? (
          <p style={{textAlign: 'center', color: '#f0a500'}}>Loading...</p>
        ) : (
          <div className="listings-grid">
            {featuredListings.length > 0 ? (
              featuredListings.map((listing) => (
                <Listing 
                  key={listing._id}
                  listing={listing} 
                  onClick={handleHouseClick}
                />
              ))
            ) : (
              !error && <p style={{textAlign: 'center', color: '#666'}}>No listings available.</p>
            )}
          </div>
        )}
      </section>

      {selectedHouse && (
        <HouseMod house={selectedHouse} onClose={closeMod} />
      )}
    </>
  );
};

export default Home;