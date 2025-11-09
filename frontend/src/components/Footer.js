import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-section brand">
          <h2>HomeHelper</h2>
          <p>Your trusted partner for home services anytime, anywhere.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li><Link to="/services/cleaning">Home Cleaning</Link></li>
            <li><Link to="/services/plumbing">Plumbing</Link></li>
            <li><Link to="/services/electrician">Electrician</Link></li>
            <li><Link to="/services/cooking">Cooking</Link></li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div className="footer-section contact">
          <h3>Contact</h3>
          <p>📍 Patiala, Punjab, India</p>
          <p>📞 +91 81466 11766</p>
          <p>📩 support@homehelper.com</p>

          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 HomeHelper. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
