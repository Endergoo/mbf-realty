import React from 'react';
import { useNavigate } from 'react-router-dom';

const SeeMore = () => 
{
  const navigate = useNavigate();

  return (
    <div className="see-more-container">
      <button 
        className="see-more-btn" 
        onClick={() => navigate('/listings')}
      >
        See More →
      </button>
    </div>
  );
};

export default SeeMore;