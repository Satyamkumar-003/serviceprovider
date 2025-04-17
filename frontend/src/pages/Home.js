import React from "react";
import "./Home.css"; // Linking CSS file
import bgvideo from "./assets/bgvideo.mp4"; // Importing the video correctly

const Home = () => {
  return (
    <section id="home" className="home-section">
      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src={bgvideo} type="video/mp4" />
      </video>

      {/* Overlay Text */}
      <div className="overlay">
        <h1>Your Trusted Home Service Partner</h1>
        <p>
          Find reliable professionals for cooking, caretaking, cleaning, and more.
          Quality service, verified experts, and hassle-free bookings at your fingertips.
        </p>
        <a href="/services" className="btn">Explore Services</a>
      </div>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose HomeHelper?</h2>
        <div className="reasons-grid">
          <div className="reason">
            <h3>Verified Professionals</h3>
            <p>All service providers are background-checked and trained for quality service.</p>
          </div>
          <div className="reason">
            <h3>Affordable Pricing</h3>
            <p>Transparent pricing with no hidden costs.</p>
          </div>
          <div className="reason">
            <h3>Easy Booking</h3>
            <p>Simple and quick service booking with flexible scheduling.</p>
          </div>
          <div className="reason">
            <h3>Reliable Support</h3>
            <p>24/7 customer support to assist with your queries.</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
