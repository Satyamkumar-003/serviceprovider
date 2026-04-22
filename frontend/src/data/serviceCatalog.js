// Single source of truth for the Services & Booking pages.
// Each catalog item has a stable `slug` used in URLs (`/booking/:slug`).
// Backend `/api/services` documents may extend / override these by name match.

export const SERVICE_CATALOG = [
    {
        slug: "home-cleaning",
        name: "Home Cleaning",
        short: "Deep cleaning for kitchens, bathrooms and living spaces.",
        description:
            "Get your home sparkling clean with our trained, background-verified cleaning professionals. Eco-friendly products, complete coverage.",
        image: "/img3.jpg",
        basePrice: 499,
        durationMins: 90,
    },
    {
        slug: "cooking",
        name: "Cooking Service",
        short: "Hire professional chefs for daily meals or events.",
        description:
            "Skilled cooks for daily meals, catering and personalised diet plans — North Indian, South Indian, continental and more.",
        image: "/img7.jpg",
        basePrice: 599,
        durationMins: 120,
    },
    {
        slug: "caretaker",
        name: "Caretaker Service",
        short: "Trained caretakers for elderly, child and special-needs care.",
        description:
            "Compassionate, trained caretakers — full-day, half-day or hourly. All staff are background-verified and skill-tested.",
        image: "/img4.jpg",
        basePrice: 699,
        durationMins: 240,
    },
    {
        slug: "electrician",
        name: "Electrician",
        short: "Certified electricians for wiring, repairs and installations.",
        description:
            "Wiring, switchboard repair, fan/light installation, MCB issues and more. Same-day visits, transparent pricing.",
        image: "/img2.jpg",
        basePrice: 399,
        durationMins: 60,
    },
    {
        slug: "plumbing",
        name: "Plumbing",
        short: "Quick, reliable plumbing repair for kitchens and bathrooms.",
        description:
            "Leak fixing, tap & shower installation, drainage cleaning, bathroom fittings — handled by certified plumbers.",
        image: "/img5.jpg",
        basePrice: 399,
        durationMins: 60,
    },
];

export const findServiceBySlug = (slug) =>
    SERVICE_CATALOG.find((s) => s.slug === slug) || null;
