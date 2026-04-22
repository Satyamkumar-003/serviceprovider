import React from "react";
import {
  FiTarget,
  FiUsers,
  FiAward,
  FiHeart,
  FiCheckCircle,
} from "react-icons/fi";
import "./About.css";

const VALUES = [
  {
    icon: <FiTarget aria-hidden="true" />,
    title: "Customer-first",
    desc: "Every decision starts with: does this make life easier for the household?",
  },
  {
    icon: <FiUsers aria-hidden="true" />,
    title: "Fair to professionals",
    desc: "Helpers are paid fairly and treated as partners — not gig statistics.",
  },
  {
    icon: <FiAward aria-hidden="true" />,
    title: "Quality, not quotas",
    desc: "We measure ratings and re-bookings, not just GMV. Reputation compounds.",
  },
  {
    icon: <FiHeart aria-hidden="true" />,
    title: "Local at heart",
    desc: "Built in India for Indian homes — realistic prices, realistic timing.",
  },
];

const PROMISES = [
  "Background-verified professionals",
  "Upfront, transparent pricing",
  "Reschedule or cancel anytime before the visit",
  "Re-do guarantee on every standard service",
];

export default function About() {
  return (
    <section id="about" className="about section section--muted">
      <div className="container text-center">
        <span className="section-eyebrow">About us</span>
        <h2 className="section-title">A trusted partner for everyday home care.</h2>
        <p className="section-lede">
          HomeHelper connects busy households with skilled, verified
          professionals — from cooking and caretaking to cleaning and
          maintenance. One booking. One quality bar. No surprises.
        </p>
      </div>

      <div className="container about-grid">
        <article className="about-mission card card-elevated">
          <span className="section-eyebrow">Our mission</span>
          <h3 className="about-card-title">
            Make great home help feel as easy as ordering a meal.
          </h3>
          <p className="about-card-text">
            We are building the most reliable layer between households and
            local professionals — fairer for both sides, and faster for
            everyone. Every booking is backed by training, ratings and
            real human support.
          </p>

          <ul className="about-promises">
            {PROMISES.map((p) => (
              <li key={p}>
                <FiCheckCircle aria-hidden="true" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </article>

        <div className="about-values">
          {VALUES.map((v) => (
            <article className="value-card" key={v.title}>
              <div className="value-icon">{v.icon}</div>
              <h4 className="value-title">{v.title}</h4>
              <p className="value-desc">{v.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
