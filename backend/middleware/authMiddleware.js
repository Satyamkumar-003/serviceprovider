import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const raw = req.header("Authorization") || req.header("authorization") || "";
    const token = raw.startsWith("Bearer ") ? raw.slice(7).trim() : raw.trim();

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        const isExpired = error && error.name === "TokenExpiredError";
        return res.status(401).json({
            message: isExpired ? "Token has expired" : "Token is not valid",
        });
    }
};

export default authMiddleware;
