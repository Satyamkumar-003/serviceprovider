import Service from "../models/Service.js";

/**
 * Ensures catalogue rows exist so GET /api/services returns MongoIds and
 * the frontend can POST /api/bookings with a valid serviceId.
 * Names must match frontend `serviceCatalog.js` exactly.
 */
const DEFAULT_SERVICES = [
    {
        name: "Home Cleaning",
        description:
            "Get your home sparkling clean with our trained, background-verified cleaning professionals. Eco-friendly products, complete coverage.",
        image: "/img3.jpg",
    },
    {
        name: "Cooking Service",
        description:
            "Skilled cooks for daily meals, catering and personalised diet plans — North Indian, South Indian, continental and more.",
        image: "/img7.jpg",
    },
    {
        name: "Caretaker Service",
        description:
            "Compassionate, trained caretakers — full-day, half-day or hourly. All staff are background-verified and skill-tested.",
        image: "/img4.jpg",
    },
    {
        name: "Electrician",
        description:
            "Wiring, switchboard repair, fan/light installation, MCB issues and more. Same-day visits, transparent pricing.",
        image: "/img2.jpg",
    },
    {
        name: "Plumbing",
        description:
            "Leak fixing, tap & shower installation, drainage cleaning, bathroom fittings — handled by certified plumbers.",
        image: "/img5.jpg",
    },
];

export async function seedDefaultServices() {
    try {
        let created = 0;
        for (const doc of DEFAULT_SERVICES) {
            const res = await Service.updateOne(
                { name: doc.name },
                { $setOnInsert: { name: doc.name, description: doc.description, image: doc.image } },
                { upsert: true }
            );
            if (res.upsertedCount) created += 1;
        }
        if (created > 0) {
            console.log(`Seeded ${created} default service(s) into MongoDB.`);
        }
    } catch (err) {
        console.error("seedDefaultServices:", err.message);
    }
}
