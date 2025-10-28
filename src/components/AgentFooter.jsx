import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../css/AgentFooter.css';

const AgentFooter = () => 
{
  const navigate = useNavigate();

  return (
    <footer className="agent-footer">
      <div className="footer-content">
        <h2 className="footer-title">Ready to Find Your Dream Home?</h2>
        <p className="footer-subtitle">
          Contact any of our expert agents today to get started
        </p>
        <button className="footer-cta-button" onClick={() => navigate('/contact')}>
          Get Started
        </button>
      </div>
    </footer>
  );
};

export default AgentFooter;