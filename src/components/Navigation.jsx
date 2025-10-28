import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './../css/Navigation.css';
import logo from './../images/MBF.png';


//toggle navi ncluded
const Navigation = () => 
{
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => 
  {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => 
  {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => 
    {
      if (window.innerWidth > 768) 
      {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Desktop Navigation */}
        <NavLink to="/" className="nav-link" end>
          Home
        </NavLink>
        <NavLink to="/listings" className="nav-link">
          Listings
        </NavLink>
        <NavLink to="/agents" className="nav-link">
          Agents
        </NavLink>
        <div className="logo">
          <img src={logo} alt="MBF Logo" className="logo-img" />
        </div>
        <NavLink to="/about" className="nav-link">
          About Us
        </NavLink>
        <NavLink to="/contact" className="nav-link">
          Contact
        </NavLink>
        <NavLink to="/signin" className="nav-link">
          Sign In
        </NavLink>

        {/* Mobile Navigation Header */}
        <div className="nav-header">
          <div className="logo">
            <img src={logo} alt="MBF Logo" className="logo-img" />
          </div>
          <div 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
        <NavLink to="/" className="nav-link" onClick={closeMenu} end>
          Home
        </NavLink>
        <NavLink to="/listings" className="nav-link" onClick={closeMenu}>
          Listings
        </NavLink>
        <NavLink to="/agents" className="nav-link" onClick={closeMenu}>
          Agents
        </NavLink>
        <NavLink to="/about" className="nav-link" onClick={closeMenu}>
          About Us
        </NavLink>
        <NavLink to="/contact" className="nav-link" onClick={closeMenu}>
          Contact
        </NavLink>
        <NavLink to="/signin" className="nav-link" onClick={closeMenu}>
          Sign In
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;