import express from "express";
import { getServices, addService } from "../controllers/serviceController.js";

const router = express.Router();

router.get("/", getServices);
router.post("/", addService);

export default router;














// import express from "express";
// import Service from "../models/serviceModel.js";

// const router = express.Router();

// // Get all services
// router.get("/", async (req, res) => {
//     try {
//         const services = await Service.find();
//         res.json(services);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching services" });
//     }
// });

// export default router;
