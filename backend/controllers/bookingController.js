import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const createBooking = asyncHandler(async (req, res) => {
    const { serviceId, scheduledAt, address, pincode, phone, notes } = req.body;

    const service = await Service.findById(serviceId);
    if (!service) {
        return res.status(404).json({ message: "Service not found" });
    }

    if (new Date(scheduledAt).getTime() < Date.now()) {
        return res.status(400).json({ message: "scheduledAt cannot be in the past" });
    }

    const booking = await Booking.create({
        user: req.user.id,
        service: service._id,
        scheduledAt,
        address,
        pincode,
        phone,
        notes,
    });

    res.status(201).json({
        message: "Booking created successfully",
        booking: await booking.populate("service", "name image description"),
    });
});

export const getMyBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({ user: req.user.id })
        .populate("service", "name image description")
        .sort({ scheduledAt: -1 });
    res.json(bookings);
});

export const cancelBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
    }

    if (String(booking.user) !== String(req.user.id)) {
        return res.status(403).json({ message: "You can only cancel your own bookings" });
    }

    if (booking.status === "cancelled") {
        return res.status(409).json({ message: "Booking is already cancelled" });
    }
    if (booking.status === "completed") {
        return res.status(409).json({ message: "Completed bookings cannot be cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled", booking });
});
