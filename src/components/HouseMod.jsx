import React from 'react';
import './../css/HouseMod.css';

const HouseMod = ({ house, onClose }) => {
  if (!house) return null;

  const API_URL = 'https://mbf-server-zt5i.onrender.com'; // Use your actual URL

  // Safe property access with fallbacks
  const imageUrl = house?.main_image && house.main_image !== 'coming-soon.jpg'
    ? `${API_URL}/images/${house.main_image}`
    : 'https://via.placeholder.com/800x500/ddd/666?text=Coming+Soon';

  const name = house?.name || 'Property Name Not Available';
  const size = house?.size ? house.size.toLocaleString() : 'N/A';
  const bedrooms = house?.bedrooms ?? 'N/A';
  const bathrooms = house?.bathrooms ?? 'N/A';
  const features = house?.features || [];

  return (
    <div className="mod-overlay" onClick={onClose}>
      <div className="mod-content" onClick={(e) => e.stopPropagation()}>
        <button className="mod-close" onClick={onClose}>×</button>
        
        <div className="mod-image">
          <img src={imageUrl} alt={name} />
        </div>

        <div className="mod-details">
          <h2 className="mod-title">{name}</h2>
          
          <div className="mod-specs">
            <div className="spec">
              <span className="spec-label">Size</span>
              <span className="spec-value">{size} sqft</span>
            </div>
            <div className="spec">
              <span className="spec-label">Bedrooms</span>
              <span className="spec-value">{bedrooms}</span>
            </div>
            <div className="spec">
              <span className="spec-label">Bathrooms</span>
              <span className="spec-value">{bathrooms}</span>
            </div>
          </div>

          {features.length > 0 && (
            <div className="mod-section">
              <h3>Features</h3>
              <ul className="features-list">
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HouseMod;