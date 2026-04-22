export const notFound = (req, res, next) => {
    res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

export const errorHandler = (err, req, res, next) => {
    const status =
        err.status || err.statusCode || (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);

    if (process.env.NODE_ENV !== "test") {
        console.error(`[${req.method} ${req.originalUrl}]`, err);
    }

    res.status(status).json({
        message: err.publicMessage || err.message || "Server error",
    });
};
