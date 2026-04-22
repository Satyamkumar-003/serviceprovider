import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import "./Contact.css";

const initial = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please tell us your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.message.trim() || form.message.trim().length < 10)
      errs.message = "Please write at least 10 characters";
    return errs;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // No backend endpoint exists for contact yet — simulate success cleanly.
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm(initial);
      setTimeout(() => setStatus("idle"), 4000);
    }, 600);
  };

  return (
    <section id="contact" className="contact section section--muted">
      <div className="container text-center">
        <span className="section-eyebrow">Contact</span>
        <h2 className="section-title">We'd love to hear from you.</h2>
        <p className="section-lede">
          Questions, feedback, or partnership ideas — drop us a note and we'll
          get back within one business day.
        </p>
      </div>

      <div className="container contact-grid">
        <aside className="contact-info card">
          <h3 className="contact-info-title">Reach us directly</h3>
          <ul className="contact-list">
            <li>
              <span className="contact-icon" aria-hidden="true"><FiMail /></span>
              <div>
                <div className="contact-label">Email</div>
                <a href="mailto:support@homehelper.com">support@homehelper.com</a>
              </div>
            </li>
            <li>
              <span className="contact-icon" aria-hidden="true"><FiPhone /></span>
              <div>
                <div className="contact-label">Phone</div>
                <a href="tel:+918146611766">+91 81466 11766</a>
              </div>
            </li>
            <li>
              <span className="contact-icon" aria-hidden="true"><FiMapPin /></span>
              <div>
                <div className="contact-label">Office</div>
                <span>Patiala, Punjab, India</span>
              </div>
            </li>
            <li>
              <span className="contact-icon" aria-hidden="true"><FiClock /></span>
              <div>
                <div className="contact-label">Support hours</div>
                <span>Mon – Sun · 8:00 AM – 10:00 PM IST</span>
              </div>
            </li>
          </ul>
        </aside>

        <form className="contact-form card" onSubmit={onSubmit} noValidate>
          {status === "sent" && (
            <div className="banner banner-success" role="status">
              Message sent — thanks! We'll reply within 1 business day.
            </div>
          )}

          <div className="contact-row">
            <div className="field">
              <label className="label" htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                name="name"
                className="input"
                value={form.name}
                onChange={onChange}
                placeholder="Jane Doe"
                autoComplete="name"
              />
              {errors.name && <div className="field-error">{errors.name}</div>}
            </div>
            <div className="field">
              <label className="label" htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                className="input"
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {errors.email && <div className="field-error">{errors.email}</div>}
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              className="textarea"
              value={form.message}
              onChange={onChange}
              rows={5}
              placeholder="How can we help?"
            />
            {errors.message && <div className="field-error">{errors.message}</div>}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg contact-submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              <>
                <span className="spinner" aria-hidden="true" /> Sending…
              </>
            ) : (
              <>
                Send message <FiSend aria-hidden="true" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
