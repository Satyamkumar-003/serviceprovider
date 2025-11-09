import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./components/Login";
import './Global.css';
import BookingPage from "./pages/BookingPage";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Home />
                <About />
                <Services />
                <br />
                <Contact />
              </>
            } />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/login" element={<Login />} />
            
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
