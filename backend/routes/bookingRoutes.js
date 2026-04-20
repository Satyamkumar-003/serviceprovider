import express from "express";
import {
    createBooking,
    getMyBookings,
    cancelBooking,
} from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { bookingValidators, handleValidation } from "../middleware/validation.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", bookingValidators, handleValidation, createBooking);
router.get("/me", getMyBookings);
router.patch("/:id/cancel", cancelBooking);

export default router;
