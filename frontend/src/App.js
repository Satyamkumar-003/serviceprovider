import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./components/Login";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";

import "./App.css";
import "./Global.css";

function HomePage() {
    return (
        <>
            <Home />
            <About />
            <Services />
            <Contact />
        </>
    );
}

export default function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="app-container">
                <Navbar />

                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/booking/:id" element={<BookingPage />} />
                        <Route path="/my-bookings" element={<MyBookings />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<HomePage />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
}
