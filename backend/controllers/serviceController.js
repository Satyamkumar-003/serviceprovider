import Service from "../models/Service.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getServices = asyncHandler(async (req, res) => {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
});

export const addService = asyncHandler(async (req, res) => {
    const { name, description, image } = req.body;

    if (!name || !description || !image) {
        return res.status(400).json({ message: "Please fill all fields: name, description, image" });
    }

    const newService = await Service.create({ name, description, image });
    res.status(201).json({ message: "Service added successfully", service: newService });
});
