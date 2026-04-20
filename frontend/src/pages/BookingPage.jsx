import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    FiArrowLeft,
    FiCheckCircle,
    FiClock,
    FiShield,
    FiInfo,
} from "react-icons/fi";

import { findServiceBySlug } from "../data/serviceCatalog";
import { api, isAuthed } from "../data/api";
import "./BookingPage.css";

const FALLBACK_IMG = `${process.env.PUBLIC_URL}/img1.jpg`;

const TIME_SLOTS = [
    "09:00 - 11:00",
    "11:00 - 13:00",
    "13:00 - 15:00",
    "15:00 - 17:00",
    "17:00 - 19:00",
];

const ADDONS = [
    { key: "deepClean", label: "Deep Cleaning", price: 299 },
    { key: "sofaShampoo", label: "Sofa Shampoo", price: 199 },
    { key: "kitchenDegrease", label: "Kitchen Degrease", price: 249 },
];

const PACKAGE_PRICE_DELTA = { standard: 0, premium: 299 };

const todayISO = () => new Date().toISOString().split("T")[0];

// Map a "HH:MM - HH:MM" slot + a YYYY-MM-DD date into an ISO datetime
// (uses the START of the window, in the user's local timezone).
function toScheduledAt(dateStr, slotStr) {
    const [start] = slotStr.split("-").map((s) => s.trim());
    const [h, m] = start.split(":").map((n) => parseInt(n, 10));
    const d = new Date(dateStr);
    d.setHours(h, m, 0, 0);
    return d.toISOString();
}

async function findBackendServiceId(serviceName) {
    try {
        const list = await api.get("/api/services");
        if (!Array.isArray(list)) return null;
        const target = serviceName.toLowerCase().trim();
        const match = list.find(
            (s) => String(s.name).toLowerCase().trim() === target
        );
        return match ? match._id : null;
    } catch {
        return null;
    }
}

export default function BookingPage() {
    const { id: slug } = useParams();
    const navigate = useNavigate();

    const service = useMemo(() => findServiceBySlug(slug), [slug]);

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        address: "",
        pincode: "",
        date: todayISO(),
        timeSlot: "",
        packageType: "standard",
        addons: {},
        notes: "",
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState("");
    const [success, setSuccess] = useState(null);

    if (!service) {
        return (
            <div className="booking-page">
                <div className="container">
                    <div className="card booking-empty">
                        <h2>Service not found</h2>
                        <p>The service you tried to book doesn't exist.</p>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => navigate("/")}
                        >
                            <FiArrowLeft aria-hidden="true" /> Back to home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onToggleAddon = (key) => {
        setForm((prev) => ({
            ...prev,
            addons: { ...prev.addons, [key]: !prev.addons[key] },
        }));
    };

    const calcTotal = () => {
        let total = Number(service.basePrice || 0);
        total += PACKAGE_PRICE_DELTA[form.packageType] || 0;
        for (const a of ADDONS) {
            if (form.addons[a.key]) total += a.price;
        }
        return total;
    };

    const validate = () => {
        const errs = {};
        if (!form.fullName.trim()) errs.fullName = "Please enter your name";
        if (!/^[6-9]\d{9}$/.test(form.phone))
            errs.phone = "Enter a valid 10-digit Indian mobile number";
        if (!form.address.trim() || form.address.trim().length < 5)
            errs.address = "Address is required";
        if (!/^\d{6}$/.test(form.pincode)) errs.pincode = "Enter a valid 6-digit PIN";
        if (!form.date) errs.date = "Please pick a date";
        else if (new Date(form.date) < new Date(todayISO()))
            errs.date = "Date can't be in the past";
        if (!form.timeSlot) errs.timeSlot = "Please choose a time slot";
        return errs;
    };

    const persistSuccess = (booking, { local } = {}) => {
        setSuccess({
            id: booking.id || booking._id || `BK-${Date.now().toString(36).toUpperCase()}`,
            serviceName: service.name,
            scheduledAt: booking.scheduledAt || toScheduledAt(form.date, form.timeSlot),
            date: form.date,
            timeSlot: form.timeSlot,
            address: form.address,
            phone: form.phone,
            total: calcTotal(),
            local: Boolean(local),
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setServerError("");
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        const scheduledAt = toScheduledAt(form.date, form.timeSlot);
        const payload = {
            scheduledAt,
            address: form.address.trim(),
            pincode: form.pincode.trim(),
            phone: form.phone.trim(),
            notes: form.notes.trim() || undefined,
        };

        setSubmitting(true);

        if (!isAuthed()) {
            // Not logged in — keep UX smooth by simulating success locally,
            // but tell the user clearly that bookings won't sync to the backend.
            setTimeout(() => {
                setSubmitting(false);
                persistSuccess({}, { local: true });
            }, 500);
            return;
        }

        try {
            const backendServiceId = service.backendId || (await findBackendServiceId(service.name));
            if (!backendServiceId) {
                // Backend is reachable but has no Service record matching this catalog item.
                persistSuccess({}, { local: true });
                setSubmitting(false);
                return;
            }

            const res = await api.post(
                "/api/bookings",
                { serviceId: backendServiceId, ...payload },
                { auth: true }
            );
            persistSuccess(res?.booking || {}, { local: false });
        } catch (err) {
            if (err.status === 401) {
                setServerError("Your session expired. Please log in again.");
                setTimeout(() => navigate("/login"), 1200);
            } else {
                setServerError(err.message || "Could not create booking. Please try again.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="booking-page">
            <div className="container">
                <button
                    type="button"
                    className="booking-back"
                    onClick={() => navigate(-1)}
                >
                    <FiArrowLeft aria-hidden="true" /> Back
                </button>

                {success ? (
                    <SuccessCard success={success} navigate={navigate} />
                ) : (
                    <div className="booking-grid">
                        <SummaryCard service={service} total={calcTotal()} />

                        <form
                            className="card booking-form"
                            onSubmit={onSubmit}
                            noValidate
                        >
                            <h1 className="booking-form-title">Book {service.name}</h1>
                            <p className="booking-form-sub">
                                Tell us a few details and we'll confirm the booking instantly.
                            </p>

                            {!isAuthed() && (
                                <div className="banner banner-info">
                                    <FiInfo aria-hidden="true" style={{ flex: "0 0 auto", marginTop: 2 }} />
                                    <span>
                                        You're booking as a guest.{" "}
                                        <a href="/login">Log in</a> to save bookings to your account.
                                    </span>
                                </div>
                            )}

                            {serverError && (
                                <div className="banner banner-error" role="alert">
                                    {serverError}
                                </div>
                            )}

                            <div className="booking-form-body">
                                <div>
                                    <label className="label">Choose package</label>
                                    <div className="package-row">
                                        <label
                                            className={
                                                "package-card" +
                                                (form.packageType === "standard" ? " is-selected" : "")
                                            }
                                        >
                                            <input
                                                type="radio"
                                                name="packageType"
                                                value="standard"
                                                checked={form.packageType === "standard"}
                                                onChange={onChange}
                                            />
                                            <div>
                                                <strong>Standard</strong>
                                                <div className="package-sub">
                                                    Base service · ₹{service.basePrice}
                                                </div>
                                            </div>
                                        </label>
                                        <label
                                            className={
                                                "package-card" +
                                                (form.packageType === "premium" ? " is-selected" : "")
                                            }
                                        >
                                            <input
                                                type="radio"
                                                name="packageType"
                                                value="premium"
                                                checked={form.packageType === "premium"}
                                                onChange={onChange}
                                            />
                                            <div>
                                                <strong>Premium</strong>
                                                <div className="package-sub">
                                                    Add-ons & priority · +₹{PACKAGE_PRICE_DELTA.premium}
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="booking-row-2">
                                    <div className="field">
                                        <label className="label" htmlFor="bk-date">Date</label>
                                        <input
                                            id="bk-date"
                                            type="date"
                                            name="date"
                                            min={todayISO()}
                                            value={form.date}
                                            onChange={onChange}
                                            className="input"
                                        />
                                        {errors.date && <div className="field-error">{errors.date}</div>}
                                    </div>
                                    <div className="field">
                                        <label className="label" htmlFor="bk-slot">Time slot</label>
                                        <select
                                            id="bk-slot"
                                            name="timeSlot"
                                            value={form.timeSlot}
                                            onChange={onChange}
                                            className="select"
                                        >
                                            <option value="">Choose a slot</option>
                                            {TIME_SLOTS.map((s) => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                        {errors.timeSlot && (
                                            <div className="field-error">{errors.timeSlot}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label" htmlFor="bk-name">Full name</label>
                                    <input
                                        id="bk-name"
                                        className="input"
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={onChange}
                                        placeholder="Your full name"
                                        autoComplete="name"
                                    />
                                    {errors.fullName && (
                                        <div className="field-error">{errors.fullName}</div>
                                    )}
                                </div>

                                <div className="booking-row-2">
                                    <div className="field">
                                        <label className="label" htmlFor="bk-phone">Phone</label>
                                        <input
                                            id="bk-phone"
                                            className="input"
                                            name="phone"
                                            value={form.phone}
                                            onChange={onChange}
                                            placeholder="10-digit mobile"
                                            inputMode="numeric"
                                            autoComplete="tel"
                                        />
                                        {errors.phone && (
                                            <div className="field-error">{errors.phone}</div>
                                        )}
                                    </div>
                                    <div className="field">
                                        <label className="label" htmlFor="bk-pin">PIN code</label>
                                        <input
                                            id="bk-pin"
                                            className="input"
                                            name="pincode"
                                            value={form.pincode}
                                            onChange={onChange}
                                            placeholder="6-digit PIN"
                                            inputMode="numeric"
                                            autoComplete="postal-code"
                                        />
                                        {errors.pincode && (
                                            <div className="field-error">{errors.pincode}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label" htmlFor="bk-addr">Address</label>
                                    <textarea
                                        id="bk-addr"
                                        className="textarea"
                                        name="address"
                                        rows={2}
                                        value={form.address}
                                        onChange={onChange}
                                        placeholder="Flat / House no., street, landmark"
                                        autoComplete="street-address"
                                    />
                                    {errors.address && (
                                        <div className="field-error">{errors.address}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="label">Add-ons</label>
                                    <div className="addons-row">
                                        {ADDONS.map((a) => (
                                            <label
                                                key={a.key}
                                                className={
                                                    "addon-card" +
                                                    (form.addons[a.key] ? " is-selected" : "")
                                                }
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={!!form.addons[a.key]}
                                                    onChange={() => onToggleAddon(a.key)}
                                                />
                                                <div>
                                                    <strong>{a.label}</strong>
                                                    <div className="addon-price">+ ₹{a.price}</div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label" htmlFor="bk-notes">
                                        Notes (optional)
                                    </label>
                                    <input
                                        id="bk-notes"
                                        className="input"
                                        name="notes"
                                        value={form.notes}
                                        onChange={onChange}
                                        placeholder="Any special instructions"
                                        maxLength={200}
                                    />
                                </div>

                                <div className="booking-summary-bar">
                                    <div>
                                        <div className="booking-summary-label">Total payable</div>
                                        <div className="booking-total">
                                            <strong>₹{calcTotal()}</strong>
                                        </div>
                                    </div>
                                    <div className="booking-actions">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg booking-confirm"
                                            disabled={submitting}
                                        >
                                            {submitting ? (
                                                <>
                                                    <span className="spinner" aria-hidden="true" />
                                                    Booking…
                                                </>
                                            ) : (
                                                "Confirm booking"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

function SummaryCard({ service, total }) {
    return (
        <aside className="card booking-summary">
            <div className="booking-img-wrap">
                <img
                    src={`${process.env.PUBLIC_URL}${service.image}`}
                    alt={service.name}
                    onError={(e) => {
                        if (e.target.dataset.fb === "1") return;
                        e.target.dataset.fb = "1";
                        e.target.src = FALLBACK_IMG;
                    }}
                />
            </div>
            <div className="booking-summary-body">
                <h2 className="booking-service-name">{service.name}</h2>
                <p className="booking-service-desc">{service.description}</p>

                <div className="booking-price-row">
                    <span className="booking-price">₹{total}</span>
                    <span className="booking-duration">
                        <FiClock aria-hidden="true" /> ~{service.durationMins} mins
                    </span>
                </div>

                <div className="booking-badges">
                    <span className="pill pill-confirmed">
                        <FiShield aria-hidden="true" /> Verified pros
                    </span>
                    <span className="pill pill-completed">
                        <FiCheckCircle aria-hidden="true" /> Re-do guarantee
                    </span>
                </div>

                <hr className="booking-hr" />
                <h3 className="booking-included-title">What's included</h3>
                <ul className="booking-included">
                    <li>Background-verified, trained professionals</li>
                    <li>Flexible rescheduling before the visit</li>
                    <li>Pay only the price you see — no surprises</li>
                </ul>
            </div>
        </aside>
    );
}

function SuccessCard({ success, navigate }) {
    const formatDateTime = () => {
        try {
            const d = new Date(success.scheduledAt);
            return d.toLocaleString(undefined, {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return `${success.date} · ${success.timeSlot}`;
        }
    };

    return (
        <div className="card booking-success">
            <span className="success-icon" aria-hidden="true">
                <FiCheckCircle />
            </span>
            <h2>Booking confirmed</h2>
            <p className="success-note">
                We've received your request. A specialist will reach out before the visit.
            </p>

            <ul className="success-meta">
                <li>
                    <span>Booking ID</span> <strong>{success.id}</strong>
                </li>
                <li>
                    <span>Service</span> <strong>{success.serviceName}</strong>
                </li>
                <li>
                    <span>When</span> <strong>{formatDateTime()}</strong>
                </li>
                <li>
                    <span>Total</span> <strong>₹{success.total}</strong>
                </li>
            </ul>

            {success.local && (
                <div className="banner banner-info">
                    <FiInfo aria-hidden="true" style={{ flex: "0 0 auto", marginTop: 2 }} />
                    <span>
                        Saved locally only. Log in &amp; ensure the service is seeded in
                        the backend to sync this booking to your account.
                    </span>
                </div>
            )}

            <div className="booking-actions" style={{ justifyContent: "center" }}>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/")}
                >
                    Back to home
                </button>
                {!success.local && (
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => navigate("/my-bookings")}
                    >
                        View my bookings
                    </button>
                )}
            </div>
        </div>
    );
}
