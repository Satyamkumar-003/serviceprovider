import { body, validationResult } from "express-validator";

export const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failed",
            errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
        });
    }
    next();
};

export const registerValidators = [
    body("name").trim().isLength({ min: 2, max: 60 }).withMessage("Name must be 2-60 characters"),
    body("email").trim().isEmail().withMessage("Valid email required").normalizeEmail(),
    body("phoneno")
        .trim()
        .matches(/^[6-9]\d{9}$/)
        .withMessage("Enter a valid 10-digit Indian phone number"),
    body("password")
        .isLength({ min: 8, max: 128 })
        .withMessage("Password must be at least 8 characters")
        .matches(/[A-Za-z]/)
        .withMessage("Password must contain at least one letter")
        .matches(/\d/)
        .withMessage("Password must contain at least one number"),
];

export const loginValidators = [
    body("email").trim().isEmail().withMessage("Valid email required").normalizeEmail(),
    body("password").isString().notEmpty().withMessage("Password is required"),
];

export const bookingValidators = [
    body("serviceId").isMongoId().withMessage("Valid serviceId required"),
    body("scheduledAt").isISO8601().withMessage("scheduledAt must be a valid ISO date"),
    body("address").trim().isLength({ min: 5, max: 300 }).withMessage("Address is required"),
    body("pincode")
        .optional()
        .trim()
        .matches(/^\d{6}$/)
        .withMessage("Pincode must be 6 digits"),
    body("phone")
        .optional()
        .trim()
        .matches(/^[6-9]\d{9}$/)
        .withMessage("Enter a valid 10-digit Indian phone number"),
    body("notes").optional().isString().isLength({ max: 500 }),
];
