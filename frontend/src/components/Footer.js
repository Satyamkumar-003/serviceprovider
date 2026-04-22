import React from "react";
import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
} from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import "./Footer.css";

const SERVICE_LINKS = [
    { label: "Home Cleaning", slug: "home-cleaning" },
    { label: "Cooking", slug: "cooking" },
    { label: "Caretaker", slug: "caretaker" },
    { label: "Electrician", slug: "electrician" },
    { label: "Plumbing", slug: "plumbing" },
];

const QUICK_LINKS = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
];

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-section footer-brand">
                    <Link to="/" className="footer-brand-row" aria-label="HomeHelper home">
                        <span className="footer-brand-mark">HH</span>
                        <span className="footer-brand-name">HomeHelper</span>
                    </Link>
                    <p className="footer-tag">
                        Trusted home services on demand — verified pros, transparent pricing,
                        zero stress.
                    </p>

                    <div className="footer-socials">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h3 className="footer-heading">Quick links</h3>
                    <ul className="footer-list">
                        {QUICK_LINKS.map((l) => (
                            <li key={l.href}>
                                <a href={`/${l.href}`}>{l.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="footer-heading">Services</h3>
                    <ul className="footer-list">
                        {SERVICE_LINKS.map((s) => (
                            <li key={s.slug}>
                                <Link to={`/booking/${s.slug}`}>{s.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="footer-heading">Reach us</h3>
                    <ul className="footer-list footer-contact">
                        <li>
                            <FiMapPin aria-hidden="true" />
                            <span>Patiala, Punjab, India</span>
                        </li>
                        <li>
                            <FiPhone aria-hidden="true" />
                            <a href="tel:+918146611766">+91 81466 11766</a>
                        </li>
                        <li>
                            <FiMail aria-hidden="true" />
                            <a href="mailto:support@homehelper.com">support@homehelper.com</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container footer-bottom-row">
                    <span>© {new Date().getFullYear()} HomeHelper. All rights reserved.</span>
                    <span className="footer-bottom-meta">Built with care · Made in India</span>
                </div>
            </div>
        </footer>
    );
}
