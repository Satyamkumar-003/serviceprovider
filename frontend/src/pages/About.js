import React from 'react';
import './About.css';

function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="start">
        <h1>About HomeHelper</h1>
        <p>
          HomeHelper is your trusted partner in finding reliable home service professionals.
          From cooking and caretaking to cleaning and home maintenance, we connect you with
          skilled experts to make your life easier.
        </p>
      </div>
      </div>
      
      {/* Our Mission Section */}
      <div className="mission">
        <h2>Our Mission</h2>
        <p>
          We aim to provide seamless and affordable home services by bridging the gap between
          skilled professionals and households in need. Quality, trust, and convenience are
          at the core of everything we do.
        </p>
      </div>
      
      {/* Why Choose Us Section */}
      <div className="why-choose-us">
        <h2>Why Choose HomeHelper?</h2>
        <ul>
          <li><strong>Verified Professionals:</strong> We ensure background-checked and skilled service providers.</li>
          <li><strong>Affordable Pricing:</strong> Transparent and budget-friendly services with no hidden charges.</li>
          <li><strong>Easy Booking:</strong> Book services effortlessly through our platform.</li>
          <li><strong>Reliable Customer Support:</strong> 24/7 assistance to resolve any concerns.</li>
        </ul>
      </div>
    </section>
  );
}

export default About;
