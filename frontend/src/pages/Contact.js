import React from 'react'
import './Contact.css';
function Contact() {
  return (
    <div>
      <section id="contact" className="contact-section">
      <h2>Contact Us</h2>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit" className="btn">Send Message</button>
      </form>
    </section>
    </div>
  )
}

export default Contact
