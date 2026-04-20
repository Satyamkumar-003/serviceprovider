import User from "../models/User.js";

const adminMiddleware = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const user = await User.findById(req.user.id).select("role");
        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Admin access required" });
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default adminMiddleware;
