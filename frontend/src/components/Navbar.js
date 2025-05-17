import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  // Function to reload the page
  const handleLogoClick = () => {
    window.location.href = '/'; // reloads and goes to home
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          {/* Logo image that refreshes the page on click */}
          <img 
            src="/logo.png" 
            alt="HomeHelper Logo" 
            className="logo" 
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }} 
          />
          
          <input type="checkbox" id="menu-toggle" className="menu-toggle" />
          <label htmlFor="menu-toggle" className="hamburger">&#9776;</label>
        </div>

        <nav className="navigation">
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <div className="btn-container">
          <Link to="/login" className="btn">Login</Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
