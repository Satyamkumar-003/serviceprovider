import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { loginLimiter, registerLimiter } from "../middleware/rateLimiter.js";
import {
    handleValidation,
    loginValidators,
    registerValidators,
} from "../middleware/validation.js";

const router = express.Router();

router.post("/register", registerLimiter, registerValidators, handleValidation, registerUser);
router.post("/login", loginLimiter, loginValidators, handleValidation, loginUser);

export default router;
