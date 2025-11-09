// src/pages/BookingPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BookingPage.css";

/**
 * Temporary local services data.
 * In production you can fetch this from your backend (e.g. /api/services/:id).
 */
const SERVICES = [
  { id: "1", key: 1, name: "Cooking Service", short: "Hire professional chefs for daily meals and events.", basePrice: 499, durationMins: 60, image: "/img7.jpg" },
  { id: "2", key: 2, name: "Caretaker Service", short: "Trained caretakers for elderly/child/special needs.", basePrice: 699, durationMins: 60, image: "/img4.jpg" },
  { id: "3", key: 3, name: "Home Cleaning", short: "Expert cleaning for all rooms, bathrooms & kitchens.", basePrice: 499, durationMins: 60, image: "/img3.jpg" },
  { id: "4", key: 4, name: "Electrician", short: "Certified electricians for wiring, repairs & maintenance.", basePrice: 399, durationMins: 60, image: "/img2.jpg" },
  { id: "5", key: 5, name: "Plumbing", short: "Quick and reliable plumbing solutions for home needs.", basePrice: 399, durationMins: 60, image: "/img5.jpg" },
];

const todayDateISO = () => {
  const d = new Date();
  // default min date is today
  return d.toISOString().split("T")[0];
};

export default function BookingPage() {
  const { id } = useParams(); // expects /book/:id
  const navigate = useNavigate();

  // Try to find service from local list (or fetch from backend)
  const [service, setService] = useState(() => SERVICES.find(s => String(s.id) === String(id)) || null);

  // Form state
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    pincode: "",
    date: todayDateISO(),
    timeSlot: "",
    packageType: "standard",
    addons: {}, // { addonKey: true }
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // If service not found locally, you would fetch from backend:
    // fetch(`/api/services/${id}`).then(...)
    if (!service) {
      const found = SERVICES.find(s => String(s.id) === String(id));
      setService(found || null);
    }
  }, [id, service]);

  if (!service) {
    return (
      <div className="booking-page">
        <div className="container">
          <h2>Service not found</h2>
          <p>The requested service doesn't exist. Please go back and choose a service.</p>
          <button className="btn" onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    );
  }

  const timeSlots = [
    "09:00 - 11:00",
    "11:00 - 13:00",
    "13:00 - 15:00",
    "15:00 - 17:00",
    "17:00 - 19:00"
  ];

  const addonsList = [
    { key: "deepClean", label: "Deep Cleaning", price: 299 },
    { key: "sofaShampoo", label: "Sofa Shampoo", price: 199 },
    { key: "kitchenDegrease", label: "Kitchen Degrease", price: 249 }
  ];

  const onChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onToggleAddon = (key) => {
    setForm(prev => {
      const newAddons = { ...prev.addons };
      newAddons[key] = !newAddons[key];
      return { ...prev, addons: newAddons };
    });
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!/^[6-9]\d{9}$/.test(form.phone)) errs.phone = "Enter a valid 10-digit Indian phone number";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!/^\d{6}$/.test(form.pincode)) errs.pincode = "Enter 6 digit PIN code";
    if (!form.date) errs.date = "Please select a date";
    // ensure date is not in the past
    if (form.date && new Date(form.date) < new Date(todayDateISO())) errs.date = "Date cannot be in the past";
    if (!form.timeSlot) errs.timeSlot = "Please choose a time slot";
    return errs;
  };

  const calcTotal = () => {
    let total = Number(service.basePrice || 0);
    for (const addon of addonsList) {
      if (form.addons[addon.key]) total += addon.price;
    }
    return total;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Simulate booking submit (replace with API call)
    setSubmitting(true);
    const bookingPayload = {
      serviceId: service.id,
      serviceName: service.name,
      customer: {
        name: form.fullName,
        phone: form.phone,
        address: form.address,
        pincode: form.pincode
      },
      date: form.date,
      timeSlot: form.timeSlot,
      addons: Object.keys(form.addons).filter(k => form.addons[k]),
      notes: form.notes,
      total: calcTotal()
    };

    // In production call API: POST /api/bookings
    // fetch('/api/bookings', { method:'POST', body: JSON.stringify(bookingPayload)... })
    console.log("Booking payload", bookingPayload);

    // simulate success
    setTimeout(() => {
      setSubmitting(false);
      setSuccess({
        id: `BK-${Math.floor(Math.random() * 900000 + 100000)}`,
        ...bookingPayload
      });

      // optionally redirect to /bookings or confirmation page:
      // navigate(`/booking-success/${bookingId}`);
    }, 700);
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        {/* Left card: Service info */}
        <aside className="card service-card">
          <img
            src={process.env.PUBLIC_URL + service.image}
            alt={service.name}
            onError={(e) => { e.target.onerror = null; e.target.src = process.env.PUBLIC_URL + "/placeholder.jpg"; }}
            className="service-hero"
          />
          <div className="service-meta">
            <h1>{service.name}</h1>
            <p className="short">{service.short}</p>
            <div className="price-row">
              <span className="price">Starting at ₹{service.basePrice}</span>
              <span className="duration">/{service.durationMins} mins</span>
            </div>

            <div className="badges">
              <span className="badge">Verified Pros</span>
              <span className="badge">Instant Booking</span>
            </div>

            <hr />
            <h4>What's included</h4>
            <ul className="points">
              <li>Experienced & background-checked professionals</li>
              <li>Flexible timings</li>
              <li>Quality guarantee</li>
            </ul>
          </div>
        </aside>

        {/* Right card: Booking form */}
        <main className="card form-card">
          {!success ? (
            <>
              <h2>Book {service.name}</h2>
              <form onSubmit={onSubmit} noValidate>
                {/* Package selection */}
                <label className="label">Choose Package</label>
                <div className="package-row">
                  <label className={`package ${form.packageType === "standard" ? "selected" : ""}`}>
                    <input type="radio" name="packageType" value="standard" checked={form.packageType === "standard"} onChange={onChange} />
                    <div>
                      <strong>Standard</strong>
                      <div className="muted">Basic service — ₹{service.basePrice}</div>
                    </div>
                  </label>

                  <label className={`package ${form.packageType === "premium" ? "selected" : ""}`}>
                    <input type="radio" name="packageType" value="premium" checked={form.packageType === "premium"} onChange={onChange} />
                    <div>
                      <strong>Premium</strong>
                      <div className="muted">Includes add-ons & priority — +₹299</div>
                    </div>
                  </label>
                </div>

                {/* Date & Time */}
                <div className="row">
                  <div className="field">
                    <label className="label">Select Date</label>
                    <input type="date" name="date" value={form.date} min={todayDateISO()} onChange={onChange} />
                    {errors.date && <div className="error">{errors.date}</div>}
                  </div>

                  <div className="field">
                    <label className="label">Time Slot</label>
                    <select name="timeSlot" value={form.timeSlot} onChange={onChange}>
                      <option value="">Choose slot</option>
                      {timeSlots.map(ts => <option key={ts} value={ts}>{ts}</option>)}
                    </select>
                    {errors.timeSlot && <div className="error">{errors.timeSlot}</div>}
                  </div>
                </div>

                {/* Contact & Address */}
                <div className="field">
                  <label className="label">Full Name</label>
                  <input name="fullName" value={form.fullName} onChange={onChange} placeholder="Your full name" />
                  {errors.fullName && <div className="error">{errors.fullName}</div>}
                </div>

                <div className="row">
                  <div className="field">
                    <label className="label">Phone</label>
                    <input name="phone" value={form.phone} onChange={onChange} placeholder="10 digit mobile number" />
                    {errors.phone && <div className="error">{errors.phone}</div>}
                  </div>

                  <div className="field">
                    <label className="label">PIN Code</label>
                    <input name="pincode" value={form.pincode} onChange={onChange} placeholder="110001" />
                    {errors.pincode && <div className="error">{errors.pincode}</div>}
                  </div>
                </div>

                <div className="field">
                  <label className="label">Address</label>
                  <textarea name="address" value={form.address} onChange={onChange} rows="2" placeholder="Flat / House no, Street, Landmark"></textarea>
                  {errors.address && <div className="error">{errors.address}</div>}
                </div>

                {/* Add-ons */}
                <div className="addons">
                  <label className="label">Add-ons</label>
                  <div className="addons-row">
                    {addonsList.map(a => (
                      <label key={a.key} className="addon">
                        <input type="checkbox" checked={!!form.addons[a.key]} onChange={() => onToggleAddon(a.key)} />
                        <div>
                          <strong>{a.label}</strong>
                          <div className="muted">+ ₹{a.price}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="field">
                  <label className="label">Notes (optional)</label>
                  <input name="notes" value={form.notes} onChange={onChange} placeholder="Any special instructions" />
                </div>

                {/* Price summary + CTA */}
                <div className="summary">
                  <div>
                    <div>Service: <strong>{service.name}</strong></div>
                    <div>Add-ons: <strong>{Object.keys(form.addons).filter(k => form.addons[k]).length}</strong></div>
                  </div>
                  <div className="total">Total: <strong>₹{calcTotal()}</strong></div>
                </div>

                <div className="actions">
                  <button className="btn primary" type="submit" disabled={submitting}>{submitting ? "Booking..." : "Confirm Booking"}</button>
                  <button type="button" className="btn" onClick={() => navigate(-1)}>Back</button>
                </div>
              </form>
            </>
          ) : (
            // Success state
            <div className="success">
              <h3>Booking Confirmed</h3>
              <p>Thank you, <strong>{success.customer.name}</strong>! Your booking ID is <strong>{success.id}</strong>.</p>
              <p>
                Service: <strong>{success.serviceName}</strong><br />
                Date: <strong>{success.date}</strong> | Slot: <strong>{success.timeSlot}</strong><br />
                Total Paid: <strong>₹{success.total}</strong>
              </p>
              <div className="actions">
                <button className="btn primary" onClick={() => navigate("/")}>Back to Home</button>
                <button className="btn" onClick={() => {
                  // could navigate to "my bookings"
                  navigate("/my-bookings");
                }}>View My Bookings</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
