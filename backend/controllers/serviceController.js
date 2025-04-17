import Service from "../models/Service.js";  // ✅ Correct import
  // Import Service model

// ✅ Fetch all services
export const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: "Error fetching services" });
    }
};

// ✅ Add a new service
export const addService = async (req, res) => {
    try {
        const { name, description, image } = req.body;

        if (!name || !description || !image) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const newService = new Service({ name, description, image });
        await newService.save();

        res.status(201).json({ message: "Service added successfully", newService });
    } catch (error) {
        res.status(500).json({ message: "Error adding service" });
    }
};
