import React from "react";
import "./Footer.css";
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
            <li>Home</li>
            <li>services</li>
            <li>About us</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li><a href="/services/cleaning">Home Cleaning</a></li>
            <li><a href="/services/plumbing">Plumbing</a></li>
            <li><a href="/services/electrician">Electrician</a></li>
            <li><a href="/services/cooking">Cooking</a></li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div className="footer-section contact">
          <h3>Contact</h3>
          <p>📍 Patiala,Punjab, India</p>
          <p>📞 +91 81466 11766</p>
          <p>📩 support@homehelper.com</p>

          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
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
