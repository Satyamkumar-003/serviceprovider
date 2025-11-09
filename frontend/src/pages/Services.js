import React from "react";
import "./Services.css";
import { useNavigate } from "react-router-dom";

import {Link} from 'react-router-dom';


const Services = () => {
    const navigate = useNavigate();

    const services = [
        {
            _id: 1,
            name: "Cooking Services",
            description: "Hire professional chefs for daily meals, event catering, and personalized diet plans.",
            image: "/img7.jpg" // Changed path
        },
        {
            _id: 2,
            name: "Caretaker Services",
            description: "Trained caretakers for elderly care, child care, and special needs assistance.",
            image: "/img4.jpg" // Changed path
        },
        {
            _id: 3,
            name: "Home Cleaning",
            description: "Get your home sparkling clean with our expert cleaning professionals.",
            image: "/img3.jpg" // Changed path
        },
        {
            _id: 4,
            name: "Electrician Services",
            description: "Certified electricians available for wiring, repairs, and maintenance.",
            image: "/img2.jpg" // Changed path
        },
        {
            _id: 5,
            name: "Plumbing Services",
            description: "Quick and reliable plumbing solutions for all your household needs.",
            image: "/img5.jpg" // Changed path
        }
    ];

    return (
        <section id="services" className="services-section">
            <div className="service-container">
                <h1>Explore Our Services</h1>
                <p>We offer a wide range of professional services to meet your home needs.</p>
                <div className="service-list">
                    {services.map((service) => (
                        <div key={service._id} className="service-card">
                            <img 
                                src={process.env.PUBLIC_URL + service.image} 
                                alt={service.name} 
                                className="service-image" 
                                onError={(e) => {
                                    e.target.onerror = null; 
                                    e.target.src = process.env.PUBLIC_URL + "/placeholder.jpg";
                                }}
                            />
                            <div className="service-info">
                                <h3>{service.name}</h3>
                                <p>{service.description}</p>
                                <button className="btn" onClick={() => navigate(`/booking/${service._id}`)}>Book Now</button>

                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;