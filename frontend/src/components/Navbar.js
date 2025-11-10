import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login
    window.location.reload(); // Refresh navbar update instantly ✅
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="logo-container">
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

       
        

        {/* Navigation */}
        <nav className="navigation">
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <div>
          <h2 className="welcome-text">
            Welcome {user ? user.name : "Guest"} 👋
          </h2>
        </div>

        {/* ✅ Login / Logout */}
        <div className="btn-container">
          {!user ? (
            <Link to="/login" className="btn">
              Login
            </Link>
          ) : (
            <button className="btn logout-btn bg-danger" id="logoutbtn" onClick={handleLogout}>
              Logout
            </button>
          )}  
        </div>

      </div>
    </header>
  );
}

export default Navbar;
