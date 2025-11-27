import { body, param, validationResult } from "express-validator";
import {AppError} from "../utils/AppError.js"

// function to check validation results
export const validate = (req, res, next) => {
    const errorValidation = validationResult(req);
    if (errorValidation.isEmpty()){
        return next();
    }
    const firstError = errorValidation.array()[0].msg;
    throw new AppError(firstError, 400);
};

// rules to check validation errors for login
export const validateLogin = [
    // check email
    body("mail")
    .trim() // cat bo dau cach
    .notEmpty()
    .withMessage("Email and password are required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(), // chuan hoa ky tu trong email
    // check password
    body("password")
    .trim()
    .notEmpty()
    .withMessage("Email and password are required"),
];

// rules to check validation errors for change password
export const validateChangePassword = [
    // check currentPassword
    body("currentPassword")
    .trim()
    .notEmpty()
    .withMessage("Current password and new password are required"),
    // check newPassword
    body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("Current password and new password are required")
    .isLength({ min: 6 })
]