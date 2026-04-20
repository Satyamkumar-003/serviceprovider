import React from "react";
import { Link } from "react-router-dom";
import {
  FiShield,
  FiClock,
  FiDollarSign,
  FiHeadphones,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";
import "./Home.css";

const BG_VIDEO = `${process.env.PUBLIC_URL}/bg-video.mp4`;

const REASONS = [
  {
    icon: <FiShield aria-hidden="true" />,
    title: "Verified Professionals",
    desc: "Every helper is background-checked, trained, and rated by real customers.",
  },
  {
    icon: <FiDollarSign aria-hidden="true" />,
    title: "Transparent Pricing",
    desc: "Upfront prices, no hidden fees. Pay only for what you book.",
  },
  {
    icon: <FiClock aria-hidden="true" />,
    title: "Flexible Booking",
    desc: "Pick a date, slot and add-ons. Reschedule any time before the visit.",
  },
  {
    icon: <FiHeadphones aria-hidden="true" />,
    title: "Real Human Support",
    desc: "Our team is one tap away — chat, call or email, 7 days a week.",
  },
];

const STATS = [
  { value: "10k+", label: "Happy customers" },
  { value: "500+", label: "Verified pros" },
  { value: "4.8★", label: "Average rating" },
  { value: "30 min", label: "Avg. response" },
];

const goToServices = (e) => {
  e.preventDefault();
  const el = document.getElementById("services");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Home() {
  return (
    <section id="home" className="hero">
      <video
        className="hero-video"
        src={BG_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-content container">
        <span className="hero-eyebrow">
          <FiCheck aria-hidden="true" /> Trusted by 10,000+ households
        </span>
        <h1 className="hero-title">
          Home services, <span className="hero-title-accent">handled.</span>
        </h1>
        <p className="hero-lede">
          Book vetted professionals for cleaning, cooking, caretaking, plumbing
          and electrical work — in minutes, with one transparent price.
        </p>

        <div className="hero-actions">
          <a href="#services" className="btn btn-accent btn-lg" onClick={goToServices}>
            Explore services <FiArrowRight aria-hidden="true" />
          </a>
          <Link to="/login" className="btn btn-secondary btn-lg hero-btn-secondary">
            Sign up free
          </Link>
        </div>

        <div className="hero-stats" aria-label="Key statistics">
          {STATS.map((s) => (
            <div className="hero-stat" key={s.label}>
              <div className="hero-stat-value">{s.value}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section id="why" className="why section">
        <div className="container text-center">
          <span className="section-eyebrow">Why HomeHelper</span>
          <h2 className="section-title">Built for trust, designed for ease.</h2>
          <p className="section-lede">
            We combine background-verified professionals with a booking
            experience that respects your time.
          </p>
        </div>

        <div className="container why-grid">
          {REASONS.map((r) => (
            <article className="why-card" key={r.title}>
              <div className="why-icon">{r.icon}</div>
              <h3 className="why-title">{r.title}</h3>
              <p className="why-desc">{r.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
