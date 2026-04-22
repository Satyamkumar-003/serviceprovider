import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import asyncHandler from "../middleware/asyncHandler.js";

const BCRYPT_ROUNDS = 12;
const TOKEN_TTL = "1h";

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phoneno, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { phoneno }] });
    if (existingUser) {
        return res.status(409).json({ message: "User with this email or phone already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const newUser = await User.create({
        name,
        email,
        phoneno,
        password: hashedPassword,
    });

    return res.status(201).json({
        message: "User registered successfully",
        user: newUser.toSafeJSON(),
    });
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    // Always run bcrypt to keep response timing similar whether or not the user exists.
    const dummyHash = "$2b$12$abcdefghijklmnopqrstuvCrxoZ7e7wYwXqRsCpz5lQ5o/5pOO8K3K";
    const passwordHash = user ? user.password : dummyHash;
    const isMatch = await bcrypt.compare(password, passwordHash);

    if (!user || !isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: TOKEN_TTL }
    );

    return res.json({
        token,
        user: user.toSafeJSON(),
    });
});
