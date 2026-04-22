import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import { SERVICE_CATALOG } from "../data/serviceCatalog";
import { api } from "../data/api";
import "./Services.css";

const FALLBACK_IMG = `${process.env.PUBLIC_URL}/img1.jpg`;

const handleImgError = (e) => {
    if (e.target.dataset.fallback === "1") return;
    e.target.dataset.fallback = "1";
    e.target.src = FALLBACK_IMG;
};

function mergeWithBackend(catalog, backendItems) {
    if (!Array.isArray(backendItems) || backendItems.length === 0) return catalog;

    const byName = new Map(
        backendItems.map((b) => [String(b.name).toLowerCase().trim(), b])
    );

    return catalog.map((item) => {
        const match = byName.get(item.name.toLowerCase().trim());
        if (!match) return item;
        return {
            ...item,
            backendId: match._id,
            description: match.description || item.description,
            image: match.image && match.image.startsWith("/") ? match.image : item.image,
        };
    });
}

export default function Services() {
    const navigate = useNavigate();
    const [items, setItems] = useState(SERVICE_CATALOG);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ctrl = new AbortController();
        api.get("/api/services", { signal: ctrl.signal })
            .then((data) => {
                setItems(mergeWithBackend(SERVICE_CATALOG, data || []));
            })
            .catch(() => {
                // Backend unreachable / cold start — silently fall back to local catalog.
                setItems(SERVICE_CATALOG);
            })
            .finally(() => setLoading(false));
        return () => ctrl.abort();
    }, []);

    const visible = useMemo(() => items, [items]);

    return (
        <section id="services" className="services section">
            <div className="container text-center">
                <span className="section-eyebrow">Our services</span>
                <h2 className="section-title">Everyday help, professionally handled.</h2>
                <p className="section-lede">
                    From a one-time deep clean to weekly cooking, every booking is backed
                    by trained professionals and a single, transparent price.
                </p>
            </div>

            <div className="container">
                {loading ? (
                    <div className="service-grid" aria-busy="true">
                        {[0, 1, 2, 3].map((i) => (
                            <article key={i} className="service-card service-card--skeleton">
                                <div className="skeleton-img" />
                                <div className="skeleton-line w-70" />
                                <div className="skeleton-line w-90" />
                                <div className="skeleton-line w-50" />
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="service-grid">
                        {visible.map((service) => (
                            <article key={service.slug} className="service-card">
                                <div className="service-img-wrap">
                                    <img
                                        src={`${process.env.PUBLIC_URL}${service.image}`}
                                        alt={service.name}
                                        onError={handleImgError}
                                        loading="lazy"
                                    />
                                    <span className="service-price-badge">
                                        From ₹{service.basePrice}
                                    </span>
                                </div>
                                <div className="service-body">
                                    <h3 className="service-name">{service.name}</h3>
                                    <p className="service-desc">{service.short}</p>
                                    <button
                                        type="button"
                                        className="btn btn-primary service-cta"
                                        onClick={() => navigate(`/booking/${service.slug}`)}
                                    >
                                        Book now <FiArrowRight aria-hidden="true" />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                <p className="services-note">
                    Don't see what you need?{" "}
                    <a href="#contact">Contact us</a> and we'll find the right professional.
                </p>
            </div>
        </section>
    );
}
