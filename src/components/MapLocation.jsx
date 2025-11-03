import React from 'react';
import './../css/MapLocation.css';

const MapLocation = () => 
{
  return (
    <div className="map-section">
      <h2>Our Location</h2>
      <p className="location-text">
        Visit us in Columbia, South Carolina
      </p>
      <div className="map-container">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106115.31331326848!2d-81.12548638271022!3d34.00071460568349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f8a5697931d1e3%3A0x66b7f8cc9a84496d!2sColumbia%2C%20SC!5e0!3m2!1sen!2sus!4v1697480000000!5m2!1sen!2sus" 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Columbia, SC Location"
        ></iframe>
      </div>
    </div>
  );
};

export default MapLocation;