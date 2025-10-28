import React, { useState, useEffect } from 'react';
import SearchBox from './../components/SearchBox';
import Listing from './../components/Listing';
import SeeMore from './../components/SeeMore';

const Home = () => 
{
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2075&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2053&q=80'
  ];

  const featuredListings = [
    { id: 1, price: 350000, beds: 3, baths: 2, sqft: 1800, status: 'Available', address: '123 Oak Street, Springfield, IL 62701', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=300&fit=crop' },
    { id: 2, price: 275000, beds: 2, baths: 2, sqft: 1400, status: 'Available', address: '456 Pine Avenue, Madison, WI 53703', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&h=300&fit=crop' },
    { id: 3, price: 525000, beds: 4, baths: 3, sqft: 2500, status: 'Available', address: '789 Maple Drive, Columbus, OH 43215', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=300&fit=crop' },
    { id: 4, price: 425000, beds: 3, baths: 2.5, sqft: 2100, status: 'Available', address: '321 Elm Street, Nashville, TN 37201', image: null },
    { id: 5, price: 185000, beds: 2, baths: 1, sqft: 1200, status: 'Available', address: '654 Cedar Lane, Richmond, VA 23220', image: null },
    { id: 6, price: 680000, beds: 5, baths: 4, sqft: 3200, status: 'Available', address: '987 Birch Court, Atlanta, GA 30309', image: null }
  ];

  useEffect(() => 
  {
    const interval = setInterval(() => 
    {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <section className="top">
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide})` }}
            >
              <div className="slide-overlay"></div>
            </div>
          ))}
        </div>

        <div className="slideshow-nav">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></div>
          ))}
        </div>

        <div className="top-content">
          <SearchBox />
        </div>
      </section>

      <section className="featured-section">
        <h2 className="section-title">Featured Listings</h2>
        <div className="listings-grid">
          {featuredListings.map((listing) => (
            <Listing key={listing.id} listing={listing} />
          ))}
        </div>
        <SeeMore />
      </section>
    </>
  );
};

export default Home;