import React from 'react';
import logo from './../images/MBF.png';


const Header = () => 
{
  return (
    <header id="main-header">
        <div className="logo">
          <img src={logo} alt="MBF Logo" className="logo-img" />
        </div>
      <h1 style={{color: '#f0a500'}}>MBF Realty</h1>
    </header>
  );
};

export default Header;