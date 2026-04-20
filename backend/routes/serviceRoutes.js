import express from "express";
import { getServices, addService } from "../controllers/serviceController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getServices);
router.post("/", authMiddleware, adminMiddleware, addService);

export default router;
