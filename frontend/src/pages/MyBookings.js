import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FiArrowRight,
    FiCalendar,
    FiClock,
    FiMapPin,
    FiPhone,
    FiX,
    FiInbox,
} from "react-icons/fi";

import { api, isAuthed } from "../data/api";
import "./MyBookings.css";

const STATUS_PILL = {
    pending: "pill pill-pending",
    confirmed: "pill pill-confirmed",
    completed: "pill pill-completed",
    cancelled: "pill pill-cancelled",
};

function formatDateTime(iso) {
    if (!iso) return "—";
    try {
        const d = new Date(iso);
        return d.toLocaleString(undefined, {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return iso;
    }
}

export default function MyBookings() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cancellingId, setCancellingId] = useState(null);

    const loadBookings = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await api.get("/api/bookings/me", { auth: true });
            setBookings(Array.isArray(data) ? data : []);
        } catch (err) {
            if (err.status === 401) {
                navigate("/login", { state: { from: "/my-bookings" } });
                return;
            }
            setError(err.message || "Couldn't load your bookings.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isAuthed()) {
            navigate("/login", { state: { from: "/my-bookings" } });
            return;
        }
        loadBookings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCancel = async (id) => {
        if (!window.confirm("Cancel this booking? This cannot be undone.")) return;
        setCancellingId(id);
        try {
            await api.patch(`/api/bookings/${id}/cancel`, undefined, { auth: true });
            setBookings((prev) =>
                prev.map((b) => (b._id === id ? { ...b, status: "cancelled" } : b))
            );
        } catch (err) {
            alert(err.message || "Couldn't cancel the booking.");
        } finally {
            setCancellingId(null);
        }
    };

    return (
        <section className="bookings-page">
            <div className="container">
                <header className="bookings-header">
                    <div>
                        <span className="section-eyebrow">Account</span>
                        <h1 className="bookings-title">My bookings</h1>
                        <p className="bookings-sub">
                            All your past and upcoming HomeHelper visits.
                        </p>
                    </div>
                    <Link to="/#services" className="btn btn-primary">
                        Book a service <FiArrowRight aria-hidden="true" />
                    </Link>
                </header>

                {error && (
                    <div className="banner banner-error" role="alert">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="bookings-grid" aria-busy="true">
                        {[0, 1, 2].map((i) => (
                            <article key={i} className="booking-row card">
                                <div className="skeleton-line w-50" />
                                <div className="skeleton-line w-90" />
                                <div className="skeleton-line w-70" />
                            </article>
                        ))}
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="card bookings-empty">
                        <span className="bookings-empty-icon" aria-hidden="true">
                            <FiInbox />
                        </span>
                        <h2>No bookings yet</h2>
                        <p>Once you book a service, it'll show up here.</p>
                        <Link to="/#services" className="btn btn-primary">
                            Explore services <FiArrowRight aria-hidden="true" />
                        </Link>
                    </div>
                ) : (
                    <div className="bookings-grid">
                        {bookings.map((b) => {
                            const serviceName =
                                (b.service && b.service.name) || "Service";
                            const status = b.status || "pending";
                            const canCancel =
                                status === "pending" || status === "confirmed";

                            return (
                                <article key={b._id} className="booking-row card">
                                    <div className="booking-row-head">
                                        <div>
                                            <h3 className="booking-row-title">{serviceName}</h3>
                                            <div className="booking-row-id">
                                                ID · {String(b._id).slice(-8).toUpperCase()}
                                            </div>
                                        </div>
                                        <span className={STATUS_PILL[status] || "pill"}>
                                            {status}
                                        </span>
                                    </div>

                                    <ul className="booking-row-meta">
                                        <li>
                                            <FiCalendar aria-hidden="true" />
                                            <span>{formatDateTime(b.scheduledAt)}</span>
                                        </li>
                                        {b.address && (
                                            <li>
                                                <FiMapPin aria-hidden="true" />
                                                <span>{b.address}</span>
                                            </li>
                                        )}
                                        {b.phone && (
                                            <li>
                                                <FiPhone aria-hidden="true" />
                                                <span>{b.phone}</span>
                                            </li>
                                        )}
                                        {b.createdAt && (
                                            <li>
                                                <FiClock aria-hidden="true" />
                                                <span>Booked on {formatDateTime(b.createdAt)}</span>
                                            </li>
                                        )}
                                    </ul>

                                    {b.notes && (
                                        <p className="booking-row-notes">"{b.notes}"</p>
                                    )}

                                    {canCancel && (
                                        <div className="booking-row-actions">
                                            <button
                                                type="button"
                                                className="btn btn-secondary btn-sm"
                                                onClick={() => handleCancel(b._id)}
                                                disabled={cancellingId === b._id}
                                            >
                                                {cancellingId === b._id ? (
                                                    <>
                                                        <span className="spinner" aria-hidden="true" />
                                                        Cancelling…
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiX aria-hidden="true" /> Cancel
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
